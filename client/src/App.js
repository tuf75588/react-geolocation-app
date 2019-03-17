import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
const myIcon = L.icon({
  iconUrl: icon
})
class App extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  }
  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        console.log(position)
      }
    })
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map center={position} zoom={this.state.zoom} className="map">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={myIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    )
  }
}

export default App;
