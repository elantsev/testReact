import React from "react";
import css from "./Render.module.css";
import RenderSite from "./RenderSite";

const Render = props => {
  const getValTargetCyrrencies = (data, targetCyrrencies) => {
    let result = {};
    targetCyrrencies.forEach(cyrrency => {
      for (const key in data) {
        if (
          (key === cyrrency || key === "USD" + cyrrency) &&
          data.hasOwnProperty(key)
        ) {
          result[cyrrency] = data[key];
          break;
        } else {
            result[cyrrency] = "нет данных по валюте"; 
        }
      }
    });
    return result;
    };
    
  const {targetCyrrencies, apilayer, openexchangerates,  floatrates} = props.state;

  const apilayerCyrrencies = getValTargetCyrrencies(apilayer, targetCyrrencies);
  const openexchangeratesCyrrencies = getValTargetCyrrencies(openexchangerates, targetCyrrencies );
  const floatratesCyrrencies = getValTargetCyrrencies(floatrates,targetCyrrencies );

  const currencyNames = targetCyrrencies.map(currency => (
     <p className={css.sell} key={currency}>{currency} </p>));
    
  return (
    <div className={css.container}>
      <h3 className={css.sell}>Валюта</h3>
      <h3 className={css.sell}>apilayer.net</h3>
      <h3 className={css.sell}>openexchangerates.org</h3>
      <h3 className={css.sell}>floatrates.com</h3>
          
      <div> {currencyNames}</div>

      <RenderSite cyrrencies={apilayerCyrrencies} />
      <RenderSite cyrrencies={openexchangeratesCyrrencies} />
      <RenderSite cyrrencies={floatratesCyrrencies} />
    </div>
  );
};

export default Render;
