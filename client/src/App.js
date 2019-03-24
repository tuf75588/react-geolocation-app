import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Card, CardText } from 'reactstrap';
import L from 'leaflet'
import messageLocationURL from './images/visitorLocation.svg'
import userLocationURL from './images/myLocation.svg'
import MessageForm from './components/MessageForm';
import Credit from './components/Credit';

import { getLocation, getMessages, sendMessage } from './lib/API'


const myIcon = L.icon({
  iconUrl: userLocationURL,
  iconSize: [50, 82]
});

const messageIcon = L.icon({
  iconUrl: messageLocationURL,
  iconSize: [50, 82]
});
const SERVER_URL = 'https://express-api-starter-rwanwwzmcr.now.sh/api/v1/messages'
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
    zoom: 2,
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

  formIsValid = () => {
    let { name, message } = this.state.userMessage;
    name = name.trim();
    message = message.trim();

    const validMessage =
      name.length > 0 && name.length <= 500 &&
      message.length > 0 && message.length <= 500;

    return validMessage && this.state.haveUsersLocation ? true : false;
  }

  showMessageForm = () => {
    this.setState(() => ({
      showMessageForm: true
    }))
    getLocation().then((location) => {
      const { latitude, longitude } = location;
      this.setState(() => ({
        location: {
          lat: latitude,
          lng: longitude
        },
        haveUsersLocation: true,
        zoom: 13,
      }))
    })
  }
  handleCancelClick = () => {
    this.setState(() => ({
      showMessageForm: false,
    }))
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



  handleNewMessage = (event) => {
    event.preventDefault();
    const { userMessage: { name, message }, location: { lat, lng } } = this.state;
    if (this.formIsValid()) {
      this.setState({ sendingMessage: true, })
    }
    const postMessage = {
      name,
      message,
      latitude: lat,
      longitude: lng,
    }
    sendMessage(postMessage).then(message => {
      setTimeout(() => {
        this.setState({ sendingMessage: false, sentMessage: true })
      }, 4000);
    })
  }

  render() {

    const position = [this.state.location.lat, this.state.location.lng]
    const { haveUsersLocation, sentMessage, sendingMessage, userMessage: { name, message }, showMessageForm } = this.state;

    return (

      <div className="map">
        <Map
          className="map"
          worldCopyJump={true}
          center={position}
          zoom={this.state.zoom}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors and Chat location by Iconika from the Noun Project"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            haveUsersLocation ?
              <Marker
                position={position}
                icon={myIcon}>
                <Popup>
                  {name}: {message}
                </Popup>
              </Marker> : ''
          }
          {this.state.messages.map(message => (
            <Marker
              key={message._id}
              position={[message.latitude, message.longitude]}
              icon={messageIcon}>
              <Popup>
                <p><em>{message.name}:</em> {message.message}</p>
                {message.otherMessages ? message.otherMessages.map(message => <p key={message._id}><em>{message.name}:</em> {message.message}</p>) : ''}
              </Popup>
            </Marker>
          ))}
        </Map>
        {
          !showMessageForm ?
            <Button className="message-form" onClick={this.showMessageForm} color="info">Add a Message</Button> :
            !sentMessage ?
              <MessageForm
                cancelMessage={this.handleCancelClick}
                showMessageForm={showMessageForm}
                sendingMessage={sendingMessage}
                sentMessage={sentMessage}
                haveUsersLocation={haveUsersLocation}
                formSubmitted={this.handleNewMessage}
                valueChanged={this.handleInputChange}
                formIsValid={this.formIsValid}
              /> :
              <Card body className="thanks-form">
                <CardText>Thanks for submitting a message!</CardText>
              </Card>
        }
        <Card className="footer">
          <Credit />
        </Card>
      </div>
    )
  }
}

export default App;
