import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './JemputSaya.css';


export default class JemputSaya extends  Component {
    constructor(props) {
        super(props);
        const { match: { params }} = this.props;
        this.state = {
            getReq: "none",
            loading: "tampil",
            nonea: "none",
            turunDisp: "none",
            terimakasih: "none",
            rating: "none",
            bintang: "0 bintang",
            latitude: params.latitude,
            longitude: params.longitude,
            token: params.token,
            counter: 0,
            angkot: {
                penumpang: 0,
                jemputan: 0,
                jarak: 0,
                harga: "loading",
                supir: "loading",
                nomor: "loading",
                content: "loading",
                id: "null",
                penumpang: "loading"
            }
        }
    }

    componentWillMount () {
        axios.get("https://earthmarta.herokuapp.com/penumpang/" + this.state.token + "/" + this.state.latitude + "/" + this.state.longitude)
        .then((response) => {
            console.log(response);
            if(Number(response.status) === 200 && String(response.data) !== "WEH ANGKOT ANYING DIDEKET MANEH MAHG, MINDAH MAKANA!") {
                this.setState({
                    getReq: "tampil",
                    loading: "none",
                    nonea: "none",
                    turunDisp: "none",
                    naik: "none",
                    rating: "none",
                    terimakasih: "none",
                    angkot: {
                        penumpang: 0,
                        jemputan: 0,
                        turun: 0,
                        jarak: response.data.angkot1.jarak,
                        id: response.data.angkot1.id,
                        harga: "loading",
                        supir: "loading",
                        nomor: "loading",
                        content: "loading"
                    }
                });
                axios.get("https://earthmarta.herokuapp.com/angkot/" + this.state.angkot.id + "/profil")
                .then( (response) => {
                    if (Number(response.status) == 200 && String(response.data) !== "EWEH ANYING SIETA MAH NTEU NGADAFTAR DEUH!") {
                        this.setState({
                            angkot: {
                                id: String(this.state.angkot.id),
                                jarak: Number(this.state.angkot.jarak),
                                supir: String(response.data.supir),
                                content: String(response.data.content),
                                nomor: String(response.data.nomor),
                                penumpang: String(response.data.penumpang),
                                harga: String(response.data.harga),
                                jemputan: Number(response.data.jemputan)
                            }
                        });
                        console.log(response);
                    } else {}
                })
                .catch( (error) => {
                    console.log(error);
                })
            } else if(String(response.data) === "WEH ANGKOT ANYING DIDEKET MANEH MAHG, MINDAH MAKANA!") {
                this.setState({
                    getReq: "none",
                    loading: "none",
                    nonea: "tampil",
                    naik: "none",
                    rating: "none",
                    turunDisp: "none",
                    terimakasih: "none"
                });
            } else {
                this.setState({
                    getReq: "none",
                    loading: "tampil",
                    nonea: "none",
                    naik: "none",
                    rating: "none",
                    turunDisp: "none",
                    terimakasih: "none"
                })
            }
        })
        .catch( (error) => {
            console.log(error);
        })
            
    }

    componentDidMount () {
        this.interval = setInterval( () => {
            if (String(this.state.nonea) === "tampil") {
                axios.get("https://earthmarta.herokuapp.com/penumpang/" + this.state.token + "/" + this.state.latitude + "/" + this.state.longitude)
                .then((response) => {
                    console.log(response);
                    if(Number(response.status) === 200 && String(response.data) !== "WEH ANGKOT ANYING DIDEKET MANEH MAHG, MINDAH MAKANA!") {
                        this.setState({
                            getReq: "tampil",
                            loading: "none",
                            nonea: "none",
                            turunDisp: "none",
                            naik: "tampil",
                            rating: "none",
                            terimakasih: "none",
                            angkot: {
                                penumpang: 0,
                                jemputan: 0,
                                turun: 0,
                                jarak: response.data.angkot1.jarak,
                                id: response.data.angkot1.id,
                                harga: "loading",
                                supir: "loading",
                                nomor: "loading",
                                content: "loading"
                            }
                        });
                        axios.get("https://earthmarta.herokuapp.com/angkot/" + this.state.token + "/" + this.state.angkot.id+  "/" + this.state.latitude + "/" + this.state.longitude + "/profil")
                        .then( (response) => {
                            if (Number(response.status) == 200 && String(response.data) !== "EWEH ANYING SIETA MAH NTEU NGADAFTAR DEUH!") {
                                this.setState({
                                    angkot: {
                                        jemputan: Number(response.data.jemputan),
                                        id: String(this.state.angkot.id),
                                        jarak: Number(this.state.angkot.jarak),
                                        supir: String(response.data.supir),
                                        content: String(response.data.content),
                                        nomor: String(response.data.nomor),
                                        penumpang: Number(response.data.penumpang),
                                        harga: String(response.data.harga),
                                    }
                                });
                                console.log(response);
                            } else {}
                        })
                    }
                })
                .catch( (error) => {
                    console.log(error);
                })
            } else {

                clearInterval(this.interval);
            }
        }, 1000);
    }  

    naikMang = () => {
        axios.get("https://earthmarta.herokuapp.com/penumpang/" + String(this.state.token) + "/" + String(this.state.angkot.id) + "/" + String(this.state.angkot.penumpang) + "/" + String(this.state.angkot.jemputan) + "/naik")
        .then( (response) => {
            console.log(response);
            if(String(response.data) === "berhasil") {
                this.setState({
                    getReq: "tampil",
                    loading: "none",
                    nonea: "none",
                    naik: "none",
                    rating: "none",
                    turunDisp: "tampil",
                    terimakasih: "none"
                })
            }
        })
        .catch( (error) => {
            console.log(error);
        })
    }

    turunMang = () => {
        axios.get("https://earthmarta.herokuapp.com/penumpang/" + String(this.state.token) + "/" + String(this.state.angkot.id) + "/" + String(this.state.angkot.penumpang) + "/" + String(this.state.angkot.jemputan) + "/turun")
        .then( (response) => {
            console.log(response);
            if(String(response.data) === "berhasil") {
                this.setState({
                    getReq: "tampil",
                    loading: "none",
                    nonea: "none",
                    naik: "none",
                    turunDisp: "none",
                    rating: "tampil",
                    terimakasih: "none"
                })
            }
        })
        .catch( (error) => {
            console.log(error);
        })
    }   

    ratingMang1 = () => {
        axios.get("https://earthmarta.herokuapp.com/penumpang/" + String(this.state.token) + "/" + String(this.state.angkot.id) + "/" + String("1 bintang") + "/rating")
        .then( (response) => {
            console.log(response);
            if(String(response.data) === "berhasil") {
                this.setState({
                    getReq: "tampil",
                    loading: "none",
                    nonea: "none",
                    naik: "none",
                    turunDisp: "none",
                    rating: "none",
                    terimakasih: "tampil"
                })
            }
        })
        .catch( (error) => {
            console.log(error);
        })
    }

    ratingMang2 = () => {
        axios.get("https://earthmarta.herokuapp.com/penumpang/" + String(this.state.token) + "/" + String(this.state.angkot.id) + "/" + String("2 bintang") + "/rating")
        .then( (response) => {
            console.log(response);
            if(String(response.data) === "berhasil") {
                this.setState({
                    getReq: "tampil",
                    loading: "none",
                    nonea: "none",
                    naik: "none",
                    turunDisp: "none",
                    rating: "none",
                    terimakasih: "tampil"
                })
            }
        })
        .catch( (error) => {
            console.log(error);
        })
    }

    ratingMang3 = () => {
        axios.get("https://earthmarta.herokuapp.com/penumpang/" + String(this.state.token) + "/" + String(this.state.angkot.id) + "/" + String("3 bintang") + "/rating")
        .then( (response) => {
            console.log(response);
            if(String(response.data) === "berhasil") {
                this.setState({
                    getReq: "tampil",
                    loading: "none",
                    nonea: "none",
                    naik: "none",
                    turunDisp: "none",
                    rating: "none",
                    terimakasih: "tampil"
                })
            }
        })
        .catch( (error) => {
            console.log(error);
        })
    }

    ratingMang4 = () => {
        axios.get("https://earthmarta.herokuapp.com/penumpang/" + String(this.state.token) + "/" + String(this.state.angkot.id) + "/" + String("4 bintang") + "/rating")
        .then( (response) => {
            console.log(response);
            if(String(response.data) === "berhasil") {
                this.setState({
                    getReq: "tampil",
                    loading: "none",
                    nonea: "none",
                    naik: "none",
                    turunDisp: "none",
                    rating: "none",
                    terimakasih: "tampil"
                })
            }
        })
        .catch( (error) => {
            console.log(error);
        })
    }

    ratingMang5 = () => {
        axios.get("https://earthmarta.herokuapp.com/penumpang/" + String(this.state.token) + "/" + String(this.state.angkot.id) + "/" + String("5 bintang") + "/rating")
        .then( (response) => {
            console.log(response);
            if(String(response.data) === "berhasil") {
                this.setState({
                    getReq: "tampil",
                    loading: "none",
                    nonea: "none",
                    naik: "none",
                    turunDisp: "none",
                    rating: "none",
                    terimakasih: "tampil"
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

                <h3 className={this.state.nonea}>Tidak ada angkot beroperasi.  
                    <Link to="/">Kembali</Link>
                </h3>

                <div className={this.state.getReq}>
                    <div className="card">
                        <div className="card-image">
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
                                                <p className="title is-4">{this.state.angkot.supir} ({this.state.angkot.penumpang} penumpang)</p>
                                                <p className="subtitle is-6">@{this.state.angkot.nomor} - {this.state.angkot.id} - Rp. {String(this.state.angkot.harga)},00 - {this.state.angkot.jarak} meter</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <p>
                                            {this.state.angkot.content}
                                        </p>
                                        <div className="field">
                                            <div className="control">

                                                <a className={this.state.naik}>
                                                    <button className="button is-primary" onClick={this.naikMang}>Berada dalam Angkot</button>
                                                </a>

                                                <a className={this.state.turunDisp}>
                                                    <button className="button is-primary" onClick={this.turunMang}>Sampai ke Tujuan</button>
                                                </a>

                                                <div className={this.state.rating} >
                                                    <div id="bintg">
                                                        <div className="dilngt">
                                                            <button onClick={ this.ratingMang1 }>1 bintang</button>
                                                        </div>
                                                        <div className="dilngt">
                                                            <button onClick={ this.ratingMang2 }>2 bintang</button>
                                                        </div>
                                                        <div className="dilngt">
                                                            <button onClick={ this.ratingMang3 }>3 bintang</button>
                                                        </div>
                                                        <div className="dilngt">
                                                            <button onClick={ this.ratingMang4 }>4 bintang</button>
                                                        </div>
                                                        <div className="dilngt">
                                                            <button onClick={ this.ratingMang5 }>5 bintang</button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Link to="/" className={this.state.terimakasih}>
                                                    <button className="button is-primary">Kembali ke Beranda</button>
                                                </Link>
                                                
                                                <span>    </span>
                                                <Link to="/lapor/">
                                                    <button className="button is-danger" id="hmmm">S.O.S</button>
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