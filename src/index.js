import React from "react";
import ReactDOM from "react-dom";
import MapLeaflet from "./MapLeaflet";
import "./styles.css";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <section >
      <main className="main">
        <MapLeaflet />
      </main>
    </section>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);