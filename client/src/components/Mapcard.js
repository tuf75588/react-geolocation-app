import React from 'react'
import {
  Card, CardText,
  CardTitle, Button,
  Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import Joi from 'joi'

class Mapcard extends React.Component {
  state = {
    name: '',
    message: ''
  }
  formSubmitted = (event) => {
    event.preventDefault();
    const schema = Joi.object().keys({
      name: Joi.string().min(1).max(500).required(),
      message: Joi.string().min(1).max(500).required(),

    });
    const { lat, lng } = this.props.location;
    const userMessage = {
      name: this.state.name,
      message: this.state.message,
      latitude: lat,
      longitude: lng,
    }

    const result = Joi.validate(schema, userMessage);
    console.log(result.error)

  }




  handleInputChanges = ({ target: { name, value } }) => {
    this.setState(() => ({
      [name]: value
    }))

  }
  isDisabled() {
    return (this.state.name !== '' && this.state.message !== '')
  }
  render() {
    return (
      <Card body>
        <CardTitle>Welcome to React Guestbook!</CardTitle>
        <CardText>Leave a message with your location.😍</CardText>
        <CardText>Thanks for stopping by!</CardText>
        <Form onSubmit={this.formSubmitted}>
          <FormGroup>
            <Label for="exampleEmail">Name</Label>
            <Input type="text" name="name" value={this.state.name} id="name" onChange={this.handleInputChanges} placeholder="Elon Musk.." />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Message</Label>
            <Input type="textarea" name="message" value={this.state.message} onChange={this.handleInputChanges} id="message" placeholder="Teslas are cool I guess." />
          </FormGroup>
          <Button color="primary" type="submit" disabled={!this.isDisabled()}>Send</Button>
        </Form>
      </Card>
    );
  }
}
export default Mapcard;