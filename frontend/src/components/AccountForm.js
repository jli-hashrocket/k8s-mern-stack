import React from 'react';
import { Link, Redirect } from "react-router-dom";

class AccountForm extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    email: ''
  }

  handleChange = (event) => {
    switch(event.target.name){
      case 'first_name':
        this.setState({ first_name: event.target.value });
        break;
      case 'last_name':
        this.setState({ last_name: event.target.value });
        break;
      case 'email':
        this.setState({ email: event.target.value });
        break;
    }
  }

  handleSubmit = (event) => {
    const account = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email
    }
   
    const response = fetch('http://localhost:8080/create-account', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(account)
    }).then(res => {
      console.log(res.status);
    });

    <Redirect to="/account-list" />

  }

  render() {
    return (
      <div>
        <h1>Add Account</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>First Name</label>
            <input type="text" name="first_name" onChange={this.handleChange} required />
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" name="last_name" onChange={this.handleChange} required />
          </div>
          <div>
            <label>Email</label>
            <input type="text" name="email" onChange={this.handleChange} required />
          </div>
          <div>
            <Link to='/account-list'>Cancel</Link>
            <button type="submit">Add Account</button>
          </div>
        </form>
      </div>
    )
  }
  
  
};
  
export default AccountForm;