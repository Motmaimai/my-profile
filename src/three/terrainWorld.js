// "Code the world" scene: a topographic terrain, an amber route winding through
// it and checkpoint nodes that double as a small network graph.
//
// Plain Three.js (no React) so it can be code-split and loaded on demand.
// The same world is used in two modes:
//   - "hero":    overview of the map, gentle pointer parallax
//   - "journey": camera rides along the route, driven by scroll progress

import * as THREE from "three";

const COLORS = {
  ink: 0x07090c,
  low: 0x0a0f14,
  high: 0x1a2530,
  signal: 0x5ad1e6,
  ember: 0xf4a259
};

const QUALITY = {
  high: {segments: 180, dpr: 1.75, antialias: true, packets: 36},
  low: {segments: 96, dpr: 1.25, antialias: false, packets: 18}
};

const TERRAIN_SIZE = 220;
const ROUTE_POINTS = [
  [-6, 96],
  [18, 70],
  [-14, 42],
  [22, 14],
  [-18, -14],
  [16, -44],
  [-10, -72],
  [6, -100]
];
const CHECKPOINT_T = [0.06, 0.24, 0.42, 0.6, 0.78, 0.95];

// ---------------------------------------------------------------- noise ---

function hash(x, z) {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

function valueNoise(x, z) {
  const xi = Math.floor(x);
  const zi = Math.floor(z);
  const xf = x - xi;
  const zf = z - zi;
  const u = xf * xf * (3 - 2 * xf);
  const v = zf * zf * (3 - 2 * zf);
  const a = hash(xi, zi);
  const b = hash(xi + 1, zi);
  const c = hash(xi, zi + 1);
  const d = hash(xi + 1, zi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function fbm(x, z) {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < 5; i++) {
    sum += amp * valueNoise(x * freq, z * freq);
    freq *= 2.03;
    amp *= 0.5;
  }
  return sum;
}

// --------------------------------------------------------------- shaders ---

const terrainVertex = /* glsl */ `
  attribute float aRoute;
  varying float vHeight;
  varying float vRoute;
  varying float vDepth;
  varying vec2 vXZ;
  void main() {
    vHeight = position.y;
    vRoute = aRoute;
    vXZ = position.xz;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const terrainFragment = /* glsl */ `
  uniform vec3 uLow;
  uniform vec3 uHigh;
  uniform vec3 uSignal;
  uniform vec3 uEmber;
  uniform vec3 uBg;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform float uMaxHeight;
  varying float vHeight;
  varying float vRoute;
  varying float vDepth;
  varying vec2 vXZ;

  float lineMask(float value) {
    float w = fwidth(value);
    float d = abs(fract(value - 0.5) - 0.5);
    return 1.0 - smoothstep(0.0, w * 1.2, d);
  }

  void main() {
    float h = clamp(vHeight / uMaxHeight, 0.0, 1.0);
    vec3 col = mix(uLow, uHigh, smoothstep(0.0, 1.0, h));

    // Topographic contour lines, every 5th one is stronger.
    float minor = lineMask(vHeight * 0.6);
    float major = lineMask(vHeight * 0.12);
    col += uSignal * (minor * 0.16 + major * 0.32) * (0.3 + h * 1.2);

    // Faint map graticule.
    float grid = max(lineMask(vXZ.x / 20.0), lineMask(vXZ.y / 20.0));
    col += vec3(0.9) * grid * 0.025;

    // Warm light spilling from the road.
    float roadGlow = 1.0 - smoothstep(0.0, 9.0, vRoute);
    col += uEmber * roadGlow * 0.08;

    float fog = smoothstep(uFogNear, uFogFar, vDepth);
    gl_FragColor = vec4(mix(col, uBg, fog), 1.0);
    #include <colorspace_fragment>
  }
`;

const routeVertex = /* glsl */ `
  varying float vAlong;
  varying float vDepth;
  void main() {
    vAlong = uv.x;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const routeFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uReveal;
  uniform float uOpacity;
  uniform float uFogFar;
  varying float vAlong;
  varying float vDepth;
  void main() {
    // Pulses travelling forward along the route.
    float p = fract(vAlong * 4.0 - uTime * 0.06);
    float pulse = smoothstep(0.0, 0.015, p) * (1.0 - smoothstep(0.015, 0.16, p));
    float travelled = 1.0 - smoothstep(uReveal - 0.01, uReveal + 0.01, vAlong);
    float intensity = 0.32 + travelled * 0.55 + pulse * 0.9;
    float fog = 1.0 - smoothstep(uFogFar * 0.45, uFogFar, vDepth);
    gl_FragColor = vec4(uColor * intensity, uOpacity * fog);
    #include <colorspace_fragment>
  }
`;

// ----------------------------------------------------------------- world ---

export function createWorld(canvas, options = {}) {
  const mode = options.mode === "journey" ? "journey" : "hero";
  const q = QUALITY[options.quality] || QUALITY.high;
  const reducedMotion = Boolean(options.reducedMotion);
  const getProgress = options.getProgress || (() => 0);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: q.antialias,
    alpha: false,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, q.dpr));
  renderer.setClearColor(COLORS.ink, 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(COLORS.ink, 60, 200);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.5, 400);

  // Route curve on the XZ plane (heights are filled in after the terrain).
  const flatRoute = new THREE.CatmullRomCurve3(
    ROUTE_POINTS.map(([x, z]) => new THREE.Vector3(x, 0, z)),
    false,
    "catmullrom",
    0.5
  );
  const routeSamples = flatRoute.getSpacedPoints(240);

  function distanceToRoute(x, z) {
    let min = Infinity;
    for (let i = 0; i < routeSamples.length; i++) {
      const dx = routeSamples[i].x - x;
      const dz = routeSamples[i].z - z;
      const d = dx * dx + dz * dz;
      if (d < min) min = d;
    }
    return Math.sqrt(min);
  }

  const MAX_HEIGHT = 34;
  function heightAt(x, z, routeDist) {
    const n = fbm(x * 0.016 + 3.1, z * 0.016 - 1.7);
    // Ridged profile reads as mountains rather than rolling hills.
    const ridge = 1 - Math.abs(n * 2 - 1);
    const h = Math.pow(n, 1.4) * 0.65 + Math.pow(ridge, 3) * 0.55;
    // Carve a valley so the road follows the low ground.
    const valley = THREE.MathUtils.smoothstep(routeDist, 4, 30);
    return h * MAX_HEIGHT * (0.12 + 0.88 * valley);
  }

  // Terrain mesh.
  const seg = q.segments;
  const terrainGeo = new THREE.PlaneGeometry(
    TERRAIN_SIZE,
    TERRAIN_SIZE,
    seg,
    seg
  );
  terrainGeo.rotateX(-Math.PI / 2);
  const pos = terrainGeo.attributes.position;
  const routeAttr = new Float32Array(pos.count);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const d = distanceToRoute(x, z);
    routeAttr[i] = d;
    pos.setY(i, heightAt(x, z, d));
  }
  terrainGeo.setAttribute("aRoute", new THREE.BufferAttribute(routeAttr, 1));
  terrainGeo.computeVertexNormals();

  const terrainMat = new THREE.ShaderMaterial({
    vertexShader: terrainVertex,
    fragmentShader: terrainFragment,
    uniforms: {
      uLow: {value: new THREE.Color(COLORS.low)},
      uHigh: {value: new THREE.Color(COLORS.high)},
      uSignal: {value: new THREE.Color(COLORS.signal)},
      uEmber: {value: new THREE.Color(COLORS.ember)},
      uBg: {value: new THREE.Color(COLORS.ink)},
      uFogNear: {value: 50},
      uFogFar: {value: 190},
      uMaxHeight: {value: MAX_HEIGHT}
    }
  });
  scene.add(new THREE.Mesh(terrainGeo, terrainMat));

  // Route lifted onto the terrain.
  const ROAD_LIFT = 0.6;
  const route = new THREE.CatmullRomCurve3(
    flatRoute.getSpacedPoints(160).map(p => {
      return new THREE.Vector3(p.x, heightAt(p.x, p.z, 0) + ROAD_LIFT, p.z);
    })
  );

  const routeUniforms = {
    uColor: {value: new THREE.Color(COLORS.ember)},
    uTime: {value: 0},
    uReveal: {value: mode === "hero" ? 1 : 0},
    uOpacity: {value: 1},
    uFogFar: {value: 200}
  };
  const routeMat = new THREE.ShaderMaterial({
    vertexShader: routeVertex,
    fragmentShader: routeFragment,
    uniforms: routeUniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const routeGeo = new THREE.TubeGeometry(route, 600, 0.26, 6, false);
  scene.add(new THREE.Mesh(routeGeo, routeMat));

  const haloUniforms = {...routeUniforms, uOpacity: {value: 0.1}};
  const haloMat = routeMat.clone();
  haloMat.uniforms = haloUniforms;
  const haloGeo = new THREE.TubeGeometry(route, 300, 0.9, 6, false);
  scene.add(new THREE.Mesh(haloGeo, haloMat));

  // Checkpoints: pin + node + ground ring. Linked like a network graph.
  const signal = new THREE.Color(COLORS.signal);
  const nodeGeo = new THREE.OctahedronGeometry(0.9, 0);
  const nodeMat = new THREE.MeshBasicMaterial({color: signal, wireframe: true});
  const ringGeo = new THREE.RingGeometry(1.4, 1.6, 40);
  ringGeo.rotateX(-Math.PI / 2);
  const ringMat = new THREE.MeshBasicMaterial({
    color: signal,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const pinMat = new THREE.LineBasicMaterial({
    color: signal,
    transparent: true,
    opacity: 0.45
  });
  const edgeMat = new THREE.LineBasicMaterial({
    color: signal,
    transparent: true,
    opacity: 0.16
  });

  const NODE_HEIGHT = 7;
  const nodes = [];
  const rings = [];
  const nodeTops = [];
  const pinPoints = [];
  CHECKPOINT_T.forEach(t => {
    const base = route.getPointAt(t);
    const top = base.clone().add(new THREE.Vector3(0, NODE_HEIGHT, 0));
    const node = new THREE.Mesh(nodeGeo, nodeMat);
    node.position.copy(top);
    scene.add(node);
    nodes.push(node);
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(base).add(new THREE.Vector3(0, 0.1, 0));
    scene.add(ring);
    rings.push(ring);
    nodeTops.push(top);
    pinPoints.push(base, top);
  });

  // A few satellite nodes on the ridges, wired to their nearest checkpoint.
  const satellites = [];
  const edgePoints = [];
  for (let i = 0; i < nodeTops.length - 1; i++) {
    edgePoints.push(nodeTops[i], nodeTops[i + 1]);
  }
  for (let i = 0; i < 9; i++) {
    const x = (hash(i, 7.3) - 0.5) * 150;
    const z = 80 - i * 20 + (hash(i, 2.1) - 0.5) * 10;
    const d = distanceToRoute(x, z);
    if (d < 20) continue;
    const p = new THREE.Vector3(x, heightAt(x, z, d) + 4, z);
    satellites.push(p);
    let nearest = nodeTops[0];
    nodeTops.forEach(n => {
      if (n.distanceToSquared(p) < nearest.distanceToSquared(p)) nearest = n;
    });
    edgePoints.push(nearest, p);
  }
  const pinGeo = new THREE.BufferGeometry().setFromPoints(pinPoints);
  scene.add(new THREE.LineSegments(pinGeo, pinMat));
  const edgeGeo = new THREE.BufferGeometry().setFromPoints(edgePoints);
  scene.add(new THREE.LineSegments(edgeGeo, edgeMat));

  // Soft round sprite so points are dots, not squares.
  const dotCanvas = document.createElement("canvas");
  dotCanvas.width = dotCanvas.height = 32;
  const dctx = dotCanvas.getContext("2d");
  const grad = dctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.4, "rgba(255,255,255,0.8)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  dctx.fillStyle = grad;
  dctx.fillRect(0, 0, 32, 32);
  const dotTexture = new THREE.CanvasTexture(dotCanvas);

  const satGeo = new THREE.BufferGeometry().setFromPoints(satellites);
  const satMat = new THREE.PointsMaterial({
    map: dotTexture,
    color: signal,
    size: 1.6,
    transparent: true,
    opacity: 0.9,
    depthWrite: false
  });
  scene.add(new THREE.Points(satGeo, satMat));

  // Data packets flowing along the route.
  const routeLUT = route.getSpacedPoints(800);
  const packetCount = q.packets;
  const packetPos = new Float32Array(packetCount * 3);
  const packetGeo = new THREE.BufferGeometry();
  packetGeo.setAttribute("position", new THREE.BufferAttribute(packetPos, 3));
  const packetMat = new THREE.PointsMaterial({
    map: dotTexture,
    color: 0xffd7a8,
    size: 1.1,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  scene.add(new THREE.Points(packetGeo, packetMat));

  function updatePackets(time) {
    for (let i = 0; i < packetCount; i++) {
      const t = (i / packetCount + time * 0.012) % 1;
      const p = routeLUT[Math.floor(t * (routeLUT.length - 1))];
      packetPos[i * 3] = p.x;
      packetPos[i * 3 + 1] = p.y + 0.5;
      packetPos[i * 3 + 2] = p.z;
    }
    packetGeo.attributes.position.needsUpdate = true;
  }

  // ------------------------------------------------------------- camera ---

  const pointer = {x: 0, y: 0, tx: 0, ty: 0};
  let progress = 0;
  const lookTarget = new THREE.Vector3();
  const tmp = new THREE.Vector3();

  function placeCamera(time) {
    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;

    if (mode === "hero") {
      const drift = reducedMotion ? 0 : Math.sin(time * 0.05) * 4;
      camera.position.set(-34 + pointer.x * 7 + drift, 58 - pointer.y * 4, 118);
      lookTarget.set(-26 + pointer.x * 3, 0, -6);
    } else {
      const target = THREE.MathUtils.clamp(getProgress(), 0, 1);
      progress += (target - progress) * (reducedMotion ? 1 : 0.06);
      const t = 0.02 + progress * 0.86;
      const here = route.getPointAt(t);
      const ahead = route.getPointAt(Math.min(t + 0.1, 1));
      // Chase cam: behind, above and slightly to the side of the road.
      tmp.subVectors(here, ahead).setY(0).normalize();
      camera.position.copy(here).addScaledVector(tmp, 18);
      camera.position.x += tmp.z * 8 + pointer.x * 3;
      camera.position.z -= tmp.x * 8;
      camera.position.y += 30 - pointer.y * 2;
      lookTarget.copy(ahead);
      routeUniforms.uReveal.value = t;
    }
    camera.lookAt(lookTarget);
  }

  // ------------------------------------------------------------- render ---

  let frame = 0;
  let running = false;
  let elapsed = 0;
  let last = performance.now();

  function draw() {
    const now = performance.now();
    elapsed += Math.min((now - last) / 1000, 0.05);
    last = now;
    const time = reducedMotion ? 0 : elapsed;
    // The halo shares uTime/uReveal objects with the route.
    routeUniforms.uTime.value = time;
    nodes.forEach((n, i) => {
      n.rotation.y = time * 0.4 + i;
    });
    rings.forEach((r, i) => {
      const s = 1 + ((time * 0.35 + i * 0.17) % 1) * 0.8;
      r.scale.setScalar(reducedMotion ? 1.2 : s);
    });
    ringMat.opacity = reducedMotion ? 0.5 : 0.25 + 0.25 * Math.sin(time);
    updatePackets(time);
    placeCamera(time);
    renderer.render(scene, camera);
  }

  function loop() {
    if (!running) return;
    draw();
    frame = requestAnimationFrame(loop);
  }

  function start() {
    if (running) return;
    last = performance.now();
    if (reducedMotion) {
      draw();
      return;
    }
    running = true;
    frame = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(frame);
  }

  function resize(width, height) {
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Keep the map framed on portrait screens.
    camera.fov = camera.aspect < 0.8 ? 58 : 42;
    camera.updateProjectionMatrix();
    if (!running) draw();
  }

  function setPointer(x, y) {
    if (reducedMotion) return;
    pointer.tx = x;
    pointer.ty = y;
  }

  // In reduced-motion mode there is no loop, so redraw on demand.
  function refresh() {
    if (!running) draw();
  }

  function dispose() {
    stop();
    dotTexture.dispose();
    scene.traverse(obj => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
    });
    renderer.dispose();
    renderer.forceContextLoss();
  }

  return {start, stop, resize, setPointer, refresh, dispose};
}
