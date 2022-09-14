import React from 'react';
import { Link, Redirect, withRouter } from "react-router-dom";
import { Container, Form, Button } from 'react-bootstrap';
import '../scss/AccountForm.scss';

class AccountForm extends React.Component {
  constructor(props) {
    super(props);
    
    const accountId = this.props.match.params.accountId;

    if(accountId){
      const account = this.props.accounts.find(a => a._id === accountId);
      this.state = {
        id: account.id,
        first_name: account.first_name ,
        last_name: account.last_name,
        email: account.email,
        redirect: null
      }
      this.account = account;
    } else {
      this.state = {
        first_name: '',
        last_name: '',
        email: '',
        redirect: null
      }
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange = async (event) => {
    switch(event.target.name){
      case 'first_name':
        this.setState({ 
          first_name: event.target.value 
        });
        break;
      case 'last_name':
        this.setState({ 
          last_name: event.target.value 
        });
        break;
      case 'email':
        this.setState({
          email: event.target.value
        });
        break;
    }

  }

  handleSubmit = (event) => {
    event.preventDefault();
    const endPoint = this.account ? `update/${this.account._id}` : 'create-account';
    const body = {first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email}

    fetch(`http://localhost:3000/${endPoint}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(res => {
      const data = res.json();

      if (!res.ok) {
          const error = (data && data.message) || res.status;
          return Promise.reject(error);
      }
      data.then(d => {
        this.props.handleStateChange(d.account)
        this.setState({ redirect: '/accounts' });
      })
      
    })
    .catch(err => {
      console.log('error')
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <Container className="content-body">
        <h4>{ this.account ? 'Edit' : 'Add' } Account</h4>
        
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="first_name" onChange={this.handleChange} value={this.state.first_name} required />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" type="text" name="last_name" onChange={this.handleChange} value={this.state.last_name} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" onChange={this.handleChange} value={this.state.email} required />
          </Form.Group>
          <Link to='/accounts' className="btn btn-outline-secondary">Cancel</Link>
          <Button variant="outline-primary" type="submit">Save</Button>
        </Form>
      </Container>
    )
  }
  
  
};
  
export default withRouter(AccountForm);