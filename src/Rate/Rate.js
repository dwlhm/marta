import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Rate.css';


export default class Rate extends  Component {
    constructor(props) {
        super(props);
        const { match: { params }} = this.props;
        this.state = {
            token: params.token,
            value: '1 bintang',
            loading: "tampil",
            getReq: "none",
            error: "none",
            lanjuut: "none"
        }
    }
/*
    componentWillMount () {
        axios.get("https://earthmarta.herokuapp.com/penumpang/"+this.state.token+"/turun")
        .then( (response) => {
            console.log(response);
            if(Number(response.statusCode) === 200) {
                this.setState({
                    getReq: "tampil",
                    loading: "none",
                    lanjuut: "none",
                    error: "none"
                })
            }
        })
        .catch( (error) => {
            console.log(error);
            this.setState({ 
                error: "tampil", 
                getreq: "none",
                lanjuut: "none", 
                loading: "none"
            })
        })
    }
    */

    render() {
        return (
            <div id="ratebang">
                
                <h3 className={this.state.loading}>Loading...</h3>
                <h3 className={this.state.error}>ERROR...</h3>
                <form onSubmit={this.handleSubmit} className={this.state.getReq}>
                    <div className="field">
                        <div className="select is-rounded">
                            <select value={this.state.value} onChange={this.handleChange}>
                                <option>1 bintang</option>
                                <option>2 bintang</option>
                                <option>3 bintang</option>
                                <option>4 bintang</option>
                                <option>5 bintang</option>
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                                <input className="button is-primary" type="submit" value="Submit" />
                        </div>
                    </div>
                </form>
                <div className="field">
                    <div className="control">
                        <Link to="/" className={this.state.lanjuut}>
                            <button className="button is-primary">Kembali ke Beranda</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}