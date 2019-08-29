import React from "react";
import ReactDOM from "react-dom";
import MapLeaflet from "./MapLeaflet";
import Login from "./Login";
import Register from "./Register";
import Claim from "./Claim";
import Edit from "./Edit";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./styles.css";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <Router >
      <div>
        <nav className="flex items-center justify-between flex-wrap bg-blue-300 p-6">
          <div className="flex items-center flex-no-shrink text-white mr-6">
            <span className="font-semibold text-xl tracking-tight">Find a Frameshop</span>
          </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm flex-grow">
             
            </div>
            <div>
              <Link to='/login'><a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue hover:bg-white mt-4 mr-2 lg:mt-0">Login</a></Link>
              <Link to='/register'><a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue hover:bg-white mt-4 lg:mt-0">Register</a></Link>
            </div>
          </div> 
        </nav>  
        <Route path="/" exact component={MapLeaflet} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/claim/:id" exact component={Claim} />
        <Route path="/edit/:id" exact component={Edit} />
      </div>
    </Router>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);