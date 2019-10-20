import React, {Component} from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Link } from "react-router-dom";
import randToken from 'rand-token';
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
            counter: 1
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
                        <i class="far fa-id-badge"></i>
                        </span>
                        <span>
                          Profil Saya
                        </span>
                      </Link>
                    </p>
                    <p className="control">
                      <Link className="button is-primary" to="/lapor/">
                        <span className="icon">
                          <i class="fas fa-bug"></i>
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
            </ ReactMapGL>
            <div  id="aneh">
                <Link class="button is-link"  to={ "/jemputsaya/" + this.state.viewport.latitude + "/" + this.state.viewport.longitude + "/" + randToken.generate(16) }>
                    <span className="icon">
                        <i class="fas fa-car-side"></i>
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