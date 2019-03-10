import React from "react";
import css from "./Render.module.css";

const RenderSite = props => {
  const { cyrrencies } = props;

  const getValues = cyrrencies => {
    let result = [];
    for (const key in cyrrencies) {
      if (cyrrencies.hasOwnProperty(key)) {
        result.push(cyrrencies[key]);
      }
    }
    return result;
  };

  const data = getValues(cyrrencies).map((value, i) => (
    <p className={css.sell} key={i}>
      {(value / cyrrencies["EUR"]).toFixed(3)}
    </p>
  ));
  return <div>{data}</div>;
};

export default RenderSite;
