import React from 'react';
import { Link, Redirect, withRouter } from "react-router-dom";

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

    fetch(`http://localhost:8080/${endPoint}`, {
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
        <h1>{ this.account ? 'Edit' : 'Add' } Account</h1>
        
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
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    )
  }
  
  
};
  
export default withRouter(AccountForm);