import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Lapor.css';


export default class Home extends  Component {
    constructor(props) {
        super(props);
        const { match: { params }} = this.props;
        this.state = {
            latitude: params.latitude,
            longitude: params.longitude
        }
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
                                                <i class="fas fa-home"></i>
                                            </span>
                                            <span>
                                                Beranda
                                            </span>
                                        </Link>
                                    </p>
                                    <p className="control">
                                        <Link className="button" to="/profil/">
                                            <span className="icon">
                                                <i class="far fa-id-badge"></i>
                                            </span>
                                            <span>Profil Saya</span>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <h3 className="title is-1" id="lapora">LAPOR</h3>
                    <div id="form-lapora">
                    <div className="field">
                        <div className="select is-rounded">
                            <select>
                                <option>Saya dalam Bahaya</option>
                                <option>Angkot Bermasalah</option>
                                <option>Bug Aplikasi</option>
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <textarea className="textarea" placeholder="e.g. Hello world"></textarea>
                    </div>
                    <div className="field">
                        <div class="control">
                            <button class="button is-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}