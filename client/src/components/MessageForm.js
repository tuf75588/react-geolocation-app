import React from 'react'
import {
  Card, CardText,
  CardTitle, Button,
  Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import icon from '../images/loader.svg'

function MessageForm({ sentMessage, sendingMessage, haveUsersLocation, valueChanged, submitMessage, showForm, isOpen, handleCancelClick }) {
  return (
    <Card body>
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
        {' '}
        <Button color="danger" type="submit" onClick={handleCancelClick}>Cancel</Button>
      </Form>

    </Card>

  )
}




export default MessageForm;