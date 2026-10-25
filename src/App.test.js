import React from "react";
import ReactDOM from "react-dom";
import {act} from "react-dom/test-utils";
import App from "./App";
import profile from "./data/profile";

// Plain functions: CRA's jest config resets jest.fn mocks between tests.
const noop = () => {};
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: noop, // Deprecated
    removeListener: noop, // Deprecated
    addEventListener: noop,
    removeEventListener: noop,
    dispatchEvent: noop
  })
});

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  act(() => {
    ReactDOM.render(<App />, container);
  });
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
});

it("renders without crashing", () => {
  expect(container.querySelector("h1").textContent).toBe(profile.name);
});

it("shows every experience, case file and product", () => {
  const text = container.textContent;
  profile.experience.forEach(e => expect(text).toContain(e.company));
  profile.caseFiles.forEach(c => expect(text).toContain(c.name));
  profile.products.forEach(p => expect(text).toContain(p.name));
});

it("opens external links safely", () => {
  const external = container.querySelectorAll('a[target="_blank"]');
  expect(external.length).toBeGreaterThan(0);
  external.forEach(a => {
    expect(a.getAttribute("rel")).toContain("noopener");
    expect(a.getAttribute("rel")).toContain("noreferrer");
  });
  profile.products.forEach(p => {
    expect(container.querySelector(`a[href="${p.link}"]`)).not.toBeNull();
  });
});

it("falls back to a static scene without WebGL", () => {
  // jsdom has no WebGL: every scene must render its SVG fallback.
  const scenes = container.querySelectorAll(".scene");
  expect(scenes.length).toBe(2);
  scenes.forEach(s => {
    expect(s.querySelector("svg.scene__fallback")).not.toBeNull();
    expect(s.querySelector("canvas")).toBeNull();
  });
});

it("exposes contact details", () => {
  expect(
    container.querySelector(`a[href="mailto:${profile.contact.email}"]`)
  ).not.toBeNull();
  expect(
    container.querySelector(`a[href="tel:${profile.contact.phoneIntl}"]`)
  ).not.toBeNull();
});

it("uses a single h1 and labelled sections", () => {
  expect(container.querySelectorAll("h1").length).toBe(1);
  container.querySelectorAll("main section[aria-labelledby]").forEach(s => {
    const id = s.getAttribute("aria-labelledby");
    expect(container.querySelector(`#${id}`)).not.toBeNull();
  });
});
