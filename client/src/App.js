import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import Mapcard from './components/Mapcard';
import Credit from './components/Credit';
const myIcon = L.icon({
  iconUrl: icon,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
})
class App extends Component {
  state = {
    location: {

      lat: '',
      lng: '',
    },
    zoom: 3,
    haveUsersLocation: false,
  }
  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

        const { latitude, longitude } = position.coords;
        this.setState((state, props) => {
          return {
            location: {
              lat: latitude,
              lng: longitude

            },
            zoom: 13,
            haveUsersLocation: true,
          }
        })
      }, geoError => {
        fetch('https://ipapi.co/json').then(response => {
          return response.json();
        }).then(data => {
          this.setState((state, props) => {
            return {
              location: {
                lat: data.latitude,
                lng: data.longitude,

              },
              haveUsersLocation: true,
              zoom: 13,
            }
          })

        })
      })
    }



  }

  render() {

    const position = [this.state.location.lat, this.state.location.lng]
    const { haveUsersLocation } = this.state;
    return (
      <>
        <div className="mapCard"><Mapcard /></div>
        <Map center={position} zoom={this.state.zoom} className="map">

          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {haveUsersLocation ? <Marker position={position} icon={myIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
          </Marker> : ''}

        </Map>
      <div className="andrew-btn"><Credit /></div>
      </>
    )
  }
}

export default App;
