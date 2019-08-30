import React from "react";
import ReactDOM from "react-dom";
import MapLeaflet from "./MapLeaflet";
import Login from "./Login";
import Register from "./Register";
import Claim from "./Claim";
import Edit from "./Edit";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LeafProvider } from './contexts/LeafContext';
import "./styles.css";
import "./index.css";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <Router >
      <LeafProvider>
        <div>
          <Navbar />
          <Route path="/" exact component={MapLeaflet} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/claim/:id" exact component={Claim} />
          <Route path="/edit/:id" exact component={Edit} />
        </div>
      </LeafProvider>
    </Router>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);