import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Map from './Map/Map';
import Profil from './Profil/Profil';
import Lapor from './Lapor/Lapor';
import JemputSaya from './JemputSaya/JemputSaya';
import Rate from './Rate/Rate';
import Finish from './Finish/Finish';

function App() {
  return (
    <Router>
    <div className="App" id="first">
          <Route exact path="/" component={Map} />
            <Route path="/profil/" component={Profil} />
            <Route path="/lapor/" component={Lapor} />
            <Route path="/rate/:token" component={Rate} />
            <Route path="/finish/:token" component={Finish} />
            <Route path="/jemputsaya/:latitude/:longitude/:token" component={JemputSaya} />
        
      </div>
      </Router>
  );
}

export default App;
