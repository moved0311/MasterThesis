import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Footerpage from './Footerpage';
import Imgpage from './Imgpage';
import JsavPage from './JSAV/JsavPage';
import DataPage from './datapage/DataPage';
import MapPage from './mappage/MapPage';
import './printcode.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div id="container">
            <div className="sidenav">
              <Link to="/footerpage">Footer</Link>
              <Link to="/imgpage">Img</Link>
              <Link to="/datapage">JSON Table</Link>
              <Link to="/jsavpage">JSAV</Link>
              <Link to="/mappage">Map</Link>
            </div>
            <div className="main">
              <Route exact path="/footerpage" component={Footerpage} />
              <Route path="/imgpage" component={Imgpage} />
              <Route path="/datapage" component={DataPage} />
              <Route path="/jsavpage" component={JsavPage} />
              <Route path="/mappage" component={MapPage} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
