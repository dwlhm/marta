import React, {Component} from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
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
                <a class="button is-link"><span className="icon"><i class="fas fa-car-side"></i></span><span>Jemput Saya</span></a>
            </div>
        </div>
    );
  }
}