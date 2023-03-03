import React from "react";
import "./index.css";

/**
 * 
 * @param name,
 * @param flagURL,
 * @param subregion,
 * @param capital,
 * @param population,
 * @param language, 
 * 
 * The name of the country.
An image of the country's flag.
The country's subregion.
The country's capital.
The total population of the country.
Number of languages the country has.
 */

interface NationCardProp {
  name: string;
  flagURL: string;
  subregion: string;
  capital: string;
  population: number;
  language: {
    [key: string]: string;
  };
}
const NationCard: React.FC<NationCardProp> = ({
  name,
  flagURL,
  subregion,
  capital,
  population,
  language,
}: NationCardProp) => {
  return (
    <div className="card__content">
      <div className="card__name">{name}</div>
      <img className="card__flag" src={flagURL}></img>
      <div className="card__nature__section">
        <div className="card__subregion">{subregion}</div>
        <div className="card__language">
          {/* <select className="card__language__select" id="subRegion">
            {Object.values(language).map((lang: any, index: number) => (
              <option key={index} value={lang}>
                {lang}
              </option>
            ))}
          </select> */}
          <ul className="card__language__list">
            {Object.values(language).map((lang, index: number) => (
              <li key={index} className="card__language__list__item">
                {lang}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card__nature__section">
        <div className="card__capital">{capital}</div>
        <div className="card__population">{population}</div>
      </div>
    </div>
  );
};

export default NationCard;
