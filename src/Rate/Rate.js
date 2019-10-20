import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Rate.css';


export default class Finish extends  Component {
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
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.get("https://earthmarta.herokuapp.com/penumpang/"+this.state.token+"/"+this.state.value)
        .then( (response) => {
            console.log(response);
            if(Number(response.statusCode) == 200) {
                this.setState({
                    getReq: "none",
                    loading: "none",
                    lanjuut: "tampil",
                    error: "none"
                })
            }
        })
        .catch( (error) => {
            console.log(error);
            this.setState({ 
                error: "tampil", 
                getReq: "none",
                lanjuut: "tampil", 
                loading: "none"
            })
        })
    }

    componentWillMount () {
        axios.get("https://earthmarta.herokuapp.com/penumpang/"+this.state.token+"/turun")
        .then( (response) => {
            console.log(response);
            if(Number(response.statusCode) == 200) {
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
                        <div class="control">
                                <input class="button is-primary" type="submit" value="Submit" />
                        </div>
                    </div>
                </form>
                <div className="field">
                    <div class="control">
                        <Link to="/" className={this.state.lanjuut}>
                            <button class="button is-primary">Kembali ke Beranda</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}