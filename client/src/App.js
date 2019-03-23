import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import L from 'leaflet'
import visitorIcon from './images/visitorLocation.svg'
import myLocation from './images/myLocation.svg'
import MessageForm from './components/MessageForm';
import Credit from './components/Credit';

import { getLocation, getMessages, loadData } from './lib/API'
const visitor_Icon = L.icon({
  iconUrl: visitorIcon,
  iconSize: [50, 82],
  iconAnchor: [0, 82],
  popupAnchor: [25, -82]
})
const myIcon = L.icon({
  iconUrl: myLocation,
  iconSize: [50, 82],
  iconAnchor: [0, 82],
  popupAnchor: [25, -82]
})
const SERVER_URL = 'http://localhost:5000/api/v1/messages'
// const attribution = <text x="206" y="321" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Iconika</text><text x="206" y="326" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text>
// const otherAttribution = <text x="206" y="321" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Iconika</text><text x="206" y="326" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text>
class App extends Component {
  state = {
    userMessage: {
      name: '',
      message: ''
    },
    location: {
      lat: '',
      lng: '',
    },
    zoom: 3,
    haveUsersLocation: false,
    sentMessage: false,
    sendingMessage: false,
    messages: [],
    showMessageForm: false,
  }
  componentDidMount = () => {
    getMessages().then(messages => {
      this.setState(() => ({
        messages,
      }))
    })
  }

  showMessageForm = () => {
    this.setState(() => ({
      showMessageForm: true
    }))
    getLocation().then((location) => {
      this.setState(() => ({
        location,
        haveUsersLocation: true,
        zoom: 13,
      }))
    })
  }


  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      userMessage: {
        ...prevState.userMessage,
        [name]: value
      }
    }))
  }



  handleNewMessage = () => {
    this.setState({ sendingMessage: true });
    const postMessage = {
      name: this.state.userMessage.name,
      message: this.state.userMessage.message,
      latitude: this.state.location.lat,
      longitude: this.state.location.lng,
    }
    fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postMessage)
    }).then((msg) => {
      setTimeout(() => {
        this.setState({ sentMessage: true, sendingMessage: false })
      }, 4000);
    })
  }

  render() {

    const position = [this.state.location.lat, this.state.location.lng]
    const { haveUsersLocation, sentMessage, sendingMessage, userMessage: { name, message }, } = this.state;

    return (
      <>
        <div className="mapCard">
          <MessageForm
            showForm={this.state.showMessageForm}
            submitMessage={this.handleNewMessage}
            haveUsersLocation={haveUsersLocation}
            valueChanged={this.handleInputChange}
            sentMessage={sentMessage}
            sendingMessage={sendingMessage}
          /></div>
        <Map center={position} zoom={this.state.zoom} className="map">

          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {haveUsersLocation && sentMessage ? <Marker position={position} icon={myIcon}>
            <Popup>
              {name} : {message}
            </Popup>
          </Marker> : ''}
          {this.state.messages.map(marker => (
            <Marker key={marker._id} position={[marker.latitude, marker.longitude]} icon={visitor_Icon}>
              <Popup>
                <span>{marker.name}: {marker.message}</span>

              </Popup>
            </Marker>
          ))}

        </Map>
        <div className="andrew-btn"><Credit /></div>
      </>
    )
  }
}

export default App;
