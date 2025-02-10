import React, { useState } from "react";
import { useSelector } from "react-redux";

const DisplayAnnonce = () => {
  const annonces = useSelector((state) => state.annonces.annonces);
  const regions = useSelector((state) => state.annonces.regions);
  const [data, setData] = useState("");

  // Filter annonces based on selected region
  const filteredAnnonces = data ? annonces.filter((a) => a.regid == data) : annonces;

  return (
    <div className="container">
      <h1>Annonces</h1>

      {/* Dropdown to select region */}
      <select value={data} onChange={(e) => setData(e.target.value)}>
        <option value="">Tous les régions</option>
        {regions.map((r) => (
          <option key={r.id} value={r.regid}>
            {r.regnom}
          </option>
        ))}
      </select>

      {/* Display filtered annonces */}
      {filteredAnnonces.map((e) => (
        <div key={e.id} className="col-9 my-4 bg-dark-subtle">
          <div className="bg-dark p-4 text-white">
            {e.ville} ({e.codepostal}) - Region ID: {e.regid}
          </div>
          <div className="text-dark">{e.texte}</div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAnnonce;
