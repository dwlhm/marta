import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Lapor.css';


export default class Lapor extends  Component {
    constructor(props) {
        super(props);
        const { match: { params }} = this.props;
        this.state = {
            latitude: params.latitude,
            longitude: params.longitude,
            isi: "null",
            jenis: "null"
        }
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    submitMang = () => {
        axios.post("https://earthmarta.herokuapp.com/lapor/", {
            jenis: String(this.state.jenis),
            isi: String(this.state.isi),
            latitude: Number(this.state.latitude),
            longitude: Number(this.state.longitude)
        })
        .then( (response) => {
            console.log(response);
            if(String(response.data) === "berhasil") {
                this.setState({
                    isian: "none",
                    submited: "tampil"
                })
            }
        })
        .catch( (error) => {
            console.log(error);
        })
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
                                        <Link className="button" to="/profil/">
                                            <span className="icon">
                                                <i className="far fa-id-badge"></i>
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
                <form id="form-lapora">
                    <div className="field">
                        <div className="select is-rounded">
                            <select name="jenis" onChange={this.myChangeHandler}>
                                <option value="bahaya">Saya dalam Bahaya</option>
                                <option value="bermasalah">Angkot Bermasalah</option>
                                <option value="burger">Bug Aplikasi</option>
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <textarea className="textarea" placeholder="e.g. Hello world" name="isi" onChange={this.myChangeHandler}></textarea>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-primary" onClick={this.submitMang}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}