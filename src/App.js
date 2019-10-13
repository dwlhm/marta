import React from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map/Map';

function App() {
  return (
    <div className="App" id="first">
        <nav className="navbar is-transparent" id="second">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <h1 className="title">Marta</h1>
            </a>
            <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div id="navbarExampleTransparentExample" className="navbar-menu">

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="field is-grouped">
                  <p className="control">
                    <a className="bd-tw-button button" href="#">
                      <span className="icon">
                      <i class="far fa-id-badge"></i>
                      </span>
                      <span>
                        Profil Saya
                      </span>
                    </a>
                  </p>
                  <p className="control">
                    <a className="button is-primary">
                      <span className="icon">
                        <i class="fas fa-bug"></i>
                      </span>
                      <span>Laporkan</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="section" id="third">
          <Map />
        </div>
      </div>
  );
}

export default App;
