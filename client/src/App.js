import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import MessageForm from './components/MessageForm';
import Credit from './components/Credit';
import { getLocation, getMessages, loadData } from './lib/API'
const SERVER_URL = 'http://localhost:5000/api/v1/messages'

const myIcon = L.icon({
  iconUrl: icon,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
})
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
  }
  componentDidMount = () => {
    loadData().then(res => {
      const [...messages] = res[0]
      const { latitude, longitude } = res[1]
      this.setState(() => ({
        location: {
          lat: latitude,
          lng: longitude
        },
        zoom: 13,
        haveUsersLocation: true,
        messages
      }))
    })
    // getLocation().then(data => {
    //   const { latitude, longitude } = data;

    //   this.setState(() => ({
    //     location: {
    //       lat: latitude,
    //       lng: longitude,
    //     },
    //     zoom: 13,
    //     haveUsersLocation: true,
    //   }))
    // })
    // getMessages().then(res => {
    //   console.log(res);
    // })
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
    const { haveUsersLocation, sentMessage, sendingMessage, userMessage, } = this.state;
    return (
      <>
        <div className="mapCard">
          <MessageForm
            userMessage={userMessage}
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
              <span>Name: {userMessage.name}</span>
              <p>Message: {userMessage.message}</p>
            </Popup>
          </Marker> : ''}

        </Map>
        <div className="andrew-btn"><Credit /></div>
      </>
    )
  }
}

export default App;
