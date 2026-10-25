import React from "react";
import {useReveal} from "../hooks/motion";

const SectionHead = ({index, label, id, title, lead}) => {
  const ref = useReveal();
  return (
    <header className="section-head reveal" ref={ref}>
      <p className="section-head__index">
        {index} — {label}
      </p>
      <h2 className="section-head__title" id={id}>
        {title}
      </h2>
      {lead && <p className="section-head__lead">{lead}</p>}
    </header>
  );
};

export default SectionHead;
