import React, {useEffect} from "react";
import "../styles/global.scss";
import profile from "../data/profile";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Systems from "../components/Systems";
import Projects from "../components/Projects";
import Timeline from "../components/Timeline";
import Journey from "../components/Journey";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import PrintResume from "../components/PrintResume";

const Main = () => {
  // Opt in to scroll-reveal styles only once JS is running, so content is
  // never hidden when scripts fail.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const root = document.documentElement;
    root.classList.add("can-reveal");
    return () => root.classList.remove("can-reveal");
  }, []);

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Bỏ qua tới nội dung
      </a>
      <Nav monogram={profile.monogram} />
      <main id="main">
        <Hero profile={profile} />
        <Systems profile={profile} />
        <Projects profile={profile} />
        <Timeline profile={profile} />
        <Journey journey={profile.journey} />
        <About profile={profile} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
      <PrintResume profile={profile} />
    </div>
  );
};

export default Main;
