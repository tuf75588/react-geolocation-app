import React from 'react'
import {
  Card, CardText,
  CardTitle, Button,
  Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import icon from '../images/loader.svg'

function MessageForm({ sentMessage, sendingMessage, haveUsersLocation, valueChanged, submitMessage }) {
  return (
    <Card body>
      <CardTitle>Welcome to React Guestbook!</CardTitle>
      <CardText>Leave a message with your location.😍</CardText>
      {!sentMessage && !sendingMessage && haveUsersLocation ?
        <Form onSubmit={submitMessage}>
          <FormGroup>
            <Label for="exampleEmail">Name</Label>
            <Input type="text" id="name" name="name" onChange={valueChanged} placeholder="Elon Musk.." />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Message</Label>
            <Input type="textarea" name="message" id="message" onChange={valueChanged} placeholder="Teslas are cool I guess." />
          </FormGroup>
          <Button color="primary" type="submit">Send</Button>
        </Form>
        : sendingMessage || !haveUsersLocation ? <img src={icon} /> : <CardText>Thanks for submitting a message!</CardText>
      }
    </Card >
  )
}




export default MessageForm;