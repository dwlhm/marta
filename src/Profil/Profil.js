import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Home extends  Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <nav className="navbar is-transparent" id="second">
            <div className="navbar-brand">
              <Link className="navbar-item" to="/">
                <h1 className="title">Marta</h1>
              </Link>
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
                      <Link className="bd-tw-button button" to="/">
                        <span className="icon">
                        <i className="fas fa-home"></i>
                        </span>
                        <span>
                          Beranda
                        </span>
                      </Link>
                    </p>
                    <p className="control">
                      <Link className="button is-primary" to="/lapor/">
                        <span className="icon">
                          <i className="fas fa-bug"></i>
                        </span>
                        <span>Laporkan</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </nav>
            <div className="card">
                <div classname="card-image">
                    <figure className="image is-4by3">
                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Profil Background" />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img src="https://bulma.io/images/placeholders/96x96.png" />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4">Jhon Smith</p>
                            <p className="subtitle is-6">@087736412221</p>
                        </div>
                    </div>

                    <div className="content">
                        Jalani hidup dengan biasa aja deh yah teman teman sekalian senusa bangsa serta setanah air yang berbahagia semuanya.
                    </div>
                </div>
            </div>
            </div>
        )
    }
}