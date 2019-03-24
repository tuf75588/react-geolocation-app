import React from 'react'
import {
  Card, CardText,
  CardTitle, Button,
  Form, FormGroup, Label, Input
} from 'reactstrap';
import icon from '../images/loader.svg'

function MessageForm({ sentMessage, sendingMessage, haveUsersLocation, valueChanged, formSubmitted, cancelMessage, formIsValid }) {
  return (
    <Card body className="message-form">
      <CardTitle>Welcome to React Guestbook!</CardTitle>
      <CardText>Leave a message with your location! <span role="img" aria-label="heart emoji">😍🗺</span></CardText>
      {
        !sendingMessage && !sentMessage && haveUsersLocation ?
          <Form onSubmit={formSubmitted}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                onChange={valueChanged}
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name" />
            </FormGroup>
            <FormGroup>
              <Label for="message">Message</Label>
              <Input
                onChange={valueChanged}
                type="textarea"
                name="message"
                id="message"
                placeholder="Enter a message" />
            </FormGroup>
            <Button type="cancel" color="danger" onClick={cancelMessage}>Cancel</Button> {' '}
            <Button type="submit" color="info" disabled={!formIsValid()}>Send</Button>
          </Form> :
          sendingMessage || !haveUsersLocation ?
            <img src={icon} alt="loading indicator" /> :
            <CardText>Thanks for submitting a message! <span role="img" aria-label="heart emoji">💖👋</span></CardText>
      }

    </Card>

  )
}




export default MessageForm;