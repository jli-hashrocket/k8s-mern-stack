import React from 'react';
import { Link, Redirect } from "react-router-dom";

class AccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      first_name: '',
      last_name: '',
      email: '',
      redirect: null
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
     fetch('http://localhost:8080/create-account', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => {
      const data = res.json();

      if (!res.ok) {
          const error = (data && data.message) || res.status;
          return Promise.reject(error);
      }
      data.then(d => {
        this.props.handleStateChange(d.account)
        this.setState({ redirect: '/account-list' });
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
      <div>
        <h1>Add Account</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>First Name</label>
            <input type="text" name="first_name" onChange={this.handleChange} value={this.state.first_name} required />
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" name="last_name" onChange={this.handleChange} value={this.state.last_name} required />
          </div>
          <div>
            <label>Email</label>
            <input type="text" name="email" onChange={this.handleChange} value={this.state.email} required />
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