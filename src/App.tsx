import { useState, useEffect, useMemo } from "react";

import { NationCard } from "./components";
import { INation } from "./types";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [nations, setNations] = useState<INation[]>([]);
  const [currentSubRegion, setCurrentSubRegion] = useState("");
  const [order, setOrder] = useState("asc");

  const regionOptions = useMemo(
    () => ["All", ...Array.from(new Set(nations.map((nation) => nation.subregion)))],
    [nations]
  );

  const filteredNations = useMemo(() => {
    let result = nations;

    if (!currentSubRegion || currentSubRegion !== "All")
      result = nations.filter(
        (nation) => nation.subregion === currentSubRegion
      );

    result.sort(
      (a, b) =>
        a.name.common.toLowerCase().localeCompare(b.name.common.toLowerCase()) *
        (order === "asc" ? 1 : -1)
    );
  }, [nations, order, currentSubRegion]);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const data = await fetch(process.env.REACT_APP_REGION_URL || "");
      const res = await data.json();
      setNations(res);
    };

    fetchData();
    setLoading(false);
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div className="loader__container">
          <div className="loading_spinner"></div>
        </div>
      ) : (
        <>
          <div className="settings">
            <label htmlFor="sortOrder" className="label">
              Sort:{" "}
            </label>
            <select
              className="setting__select"
              id="sortOrder"
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="dec">Descending Order</option>
              <option value="asc">Ascending Order</option>
            </select>
            <label htmlFor="subRegion" className="label">
              Subregion:{" "}
            </label>
            <select
              className="setting__select"
              id="subRegion"
              onChange={(e) => setCurrentSubRegion(e.target.value)}
            >
              {regionOptions.map((region: string | any, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <div className="card__container">
            {nations.map(
              (
                {
                  name: { common },
                  flags: { png },
                  subregion,
                  capital,
                  population,
                  languages,
                },
                index
              ) => (
                <NationCard
                  key={index}
                  name={common}
                  flagURL={png}
                  subregion={subregion}
                  capital={capital.join("")}
                  population={population}
                  language={languages}
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
