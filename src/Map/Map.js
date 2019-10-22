import React, {Component} from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Link } from "react-router-dom";
import randToken from 'rand-token';
import axios from 'axios';
import './Map.css';

export default class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            viewport: {
                width: '100%',
                height:'100%',
                latitude: 37.7577,
                longitude: -122.4376,
                zoom: 16
            },
            counter: 1,
            angkot1: {
                id: "null",
                latitude: 0,
                longitude: 0
            },
            angkot2: {
                id: "null",
                latitude: 0,
                longitude: 0
            },
            angkot3: {
                id: "null",
                latitude: 0,
                longitude: 0
            },
            angkot4: {
                id: "null",
                latitude: 0,
                longitude: 0
            },
            angkot5: {
                id: "null",
                latitude: 0,
                longitude: 0
            }
        }
    }

    componentDidMount () {
        this.interval = setInterval ( () => {
            console.log(this.state.counter);
            this.setState({ counter: this.state.counter + 1 });
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log(position);
                    this.setState(({viewport}) => ({viewport: {
                        ...viewport,
                        latitude: position.coords.latitude,
                      }})
                    );
                    this.setState(({viewport}) => ({viewport: {
                        ...viewport,
                        longitude: position.coords.longitude,
                      }})
                    );
                    axios.get("https://earthmarta.herokuapp.com/penumpang/30/" + position.coords.latitude + "/" + position.coords.longitude)
                    .then( (response) => {
                        console.log(response);
                        if(String(response) !== "WEH ANGKOT ANYING DIDEKET MANEH MAHG, MINDAH MAKANA!") {
                            this.setState({
                                angkot1: {
                                    id:response.data.angkot1.id,
                                    latitude:response.data.angkot1.latitude,
                                    longitude:response.data.angkot1.longitude
                                },
                                angkot2: {
                                    id:response.data.angkot2.id,
                                    latitude:response.data.angkot2.latitude,
                                    longitude:response.data.angkot2.longitude
                                },
                                angkot3: {
                                    id:response.data.angkot3.id,
                                    latitude:response.data.angkot3.latitude,
                                    longitude:response.data.angkot3.longitude
                                },
                                angkot4: {
                                    id:response.data.angkot4.id,
                                    latitude:response.data.angkot4.latitude,
                                    longitude:response.data.angkot4.longitude
                                },
                                angkot5: {
                                    id:response.data.angkot5.id,
                                    latitude:response.data.angkot5.latitude,
                                    longitude:response.data.angkot5.longitude
                                }
                            })
                        }
                    })
                    .catch( (error) => {
                        console.log(error);
                    })
                });
            } else {
                console.log("ERROR GEOLOCATION");
            }
        }, 30000)
    }

    componentWillMount () {
        clearInterval(this.interval);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                this.setState(({viewport}) => ({viewport: {
                    ...viewport,
                    latitude: position.coords.latitude,
                  }})
                );
                this.setState(({viewport}) => ({viewport: {
                    ...viewport,
                    longitude: position.coords.longitude,
                  }})
                );
            });
        } else {
            console.log("ERROR GEOLOCATION");
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
                      <Link className="bd-tw-button button" to="/profil/">
                        <span className="icon">
                        <i className="far fa-id-badge"></i>
                        </span>
                        <span>
                          Profil Saya
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
        <div id="div">
            <ReactMapGL 
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({viewport})}
                mapStyle="mapbox://styles/mapbox/streets-v10"
                mapboxApiAccessToken={"pk.eyJ1IjoibWF1bGFuYTAyNiIsImEiOiJjazFvODM2cXowZHNhM2hvaWttNnlkczFxIn0.GytjwhxtQ1VS1wysWsp89A"}
            >
                <Marker latitude={this.state.viewport.latitude} longitude={this.state.viewport.longitude} >
                    <i className="fas fa-street-view" id="mineloc"></i>
                </Marker>
                <Marker latitude={this.state.angkot1.latitude} longitude={this.state.angkot1.longitude} offsetLeft={-20} offsetTop={-10}>
                    <div>{this.state.angkot1.id}</div>
                </Marker>
                <Marker latitude={this.state.angkot2.latitude} longitude={this.state.angkot2.longitude} offsetLeft={-20} offsetTop={-10}>
                    <div>{this.state.angkot2.id}</div>
                </Marker>
                <Marker latitude={this.state.angkot3.latitude} longitude={this.state.angkot3.longitude} offsetLeft={-20} offsetTop={-10}>
                    <div>{this.state.angkot3.id}</div>
                </Marker>
                <Marker latitude={this.state.angkot4.latitude} longitude={this.state.angkot4.longitude} offsetLeft={-20} offsetTop={-10}>
                    <div>{this.state.angkot4.id}</div>
                </Marker>
                <Marker latitude={this.state.angkot5.latitude} longitude={this.state.angkot5.longitude} offsetLeft={-20} offsetTop={-10}>
                    <div>{this.state.angkot5.id}</div>
                </Marker>
            </ ReactMapGL>
            <div  id="aneh">
                <Link className="button is-link"  to={ "/jemputsaya/" + this.state.viewport.latitude + "/" + this.state.viewport.longitude + "/" + randToken.generate(16) }>
                    <span className="icon">
                        <i className="fas fa-car-side"></i>
                    </span>
                    <span>
                        Jemput Saya
                    </span>
                </Link>
            </div>
        </div>
        </div>
    );
  }
}