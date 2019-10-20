import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Finish.css';


export default class Finish extends  Component {
    constructor(props) {
        super(props);
        const { match: { params }} = this.props;
        this.state = {
            token: params.token,
            rating: params.rating,
            getReq: "none",
            loading: "tampil",
            error: "none"
        }
    }

    componentWillMount () {
        axios.get("https://earthmarta.herokuapp.com/penumpang/"+this.state.token+"/"+this.state.rating)
        .then( (response) => {
            console.log(response);
            if(Number(response.statusCode) == 200) {
                this.setState({
                    getReq: "tampil",
                    loading: "none",
                    error: "none"
                })
            }
        })
        .catch( (error) => {
            console.log(error);
            this.setState({ 
                error: "tampil", 
                getreq: "none", 
                loading: "none"
            })
        })
    }

    render() {
        return (
            <div id="finish">
                <div className="field">
                    <div class="control">
                        <h3 className={this.state.loading}>Loading...</h3>
                        <h3 className={this.state.error}>ERROR...</h3>
                        <Link to="/" className={this.state.getReq}>
                            <button class="button is-primary">Kembali ke Beranda</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}