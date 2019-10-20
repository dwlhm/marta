import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './JemputSaya.css';


export default class Home extends  Component {
    constructor(props) {
        super(props);
        const { match: { params }} = this.props;
        this.state = {
            getReq: "none",
            loading: "tampil",
            latitude: params.latitude,
            longitude: params.longitude,
            token: params.token,
            angkotId: "null",
            harga: "null",
            supir: "null",
            nomor: "null",
            content: "null",
            naik: "tampil",
            turun: "none"
        }
    }

    componentWillMount () {
        axios.post("https://earthmarta.herokuapp.com/penumpang/", {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            token: this.state.token
        })
        .then( (response) => {
            console.log(response);
            if(Number(response.statusCode) == 200) {
                this.setState({
                    angkotId: String(response.angkotId),
                    harga: String(response.harga),
                    supir: String(response.supir),
                    nomor: String(response.nomor),
                    content: String(response.content),
                    getReq: "tampil",
                    loading: "none"
                })
            }
        })
        .catch( (error) => {
            console.log(error);
        })
    }

    _naikMang (tokenMang) {
        axios.get("https://earthmarta.herokuapp.com/penumpang/"+tokenMang+"/naik")
        .then( (response) => {
            console.log(response);
            if(Number(response.statusCode) == 200) {
                this.setState({
                    naik: "none",
                    turun: "tampil"
                })
            }
        })
        .catch( (error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="jemputsaya">
                <h3 className={this.state.loading}>Loading...</h3>
                <div className={this.state.getReq}>
                    <div className="card">
                        <div classname="card-image">
                            <figure className="image is-4by3">
                                <div id="hmm">
                                    <div className="card-content">
                                        <div className="media">
                                            <div className="media-left">
                                                <figure className="image is-48x48">
                                                    <img src="https://bulma.io/images/placeholders/96x96.png" />
                                                </figure>
                                            </div>
                                            <div className="media-content">
                                                <p className="title is-4">{this.state.supir}</p>
                                                <p className="subtitle is-6">@{this.state.nomor} - {this.state.angkotId} - Rp. {this.state.harga},00</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <p>
                                            {this.state.content}
                                        </p>
                                        <div className="field">
                                            <div className="control">
                                                <Link to={ "/rate/" + this.state.token } className={this.state.turun}>
                                                    <button class="button is-primary">Perjalanan Selesai</button>
                                                </Link>
                                                <a className={this.state.naik} onClick={this._naikMang(this.state.token)}>
                                                    <button class="button is-primary">Berada dalam Angkot</button>
                                                </a>
                                                <span>    </span>
                                                <Link to="/lapor/">
                                                    <button class="button is-danger" id="hmmm">S.O.S</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Profil Background" />
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}