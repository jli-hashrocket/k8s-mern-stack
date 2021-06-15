import React from 'react';
import { Link, useParams, withRouter, Redirect} from "react-router-dom";
import { Button, Container } from 'react-bootstrap';

class Submissions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showImport: null,
      showSubmissions: null,
      selectedAccount: null
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = async (event) => {
    const accountId = event.target.value; 

    if ( accountId !== "" ) {
      const response =  await fetch(`http://localhost:8080/accounts/${accountId}/submissions`);
      const data = await response.json();
      
      try {
        if (data.submissions === null ) {
          this.setState({ showImport: false, showSubmissions: true, selectedAccount: accountId })
        } else {
          this.setState({ showImport: true, showSubmissions: false, selectedAccount: accountId })
        }
      } catch (error) {
        console.log(error);
      }
      
    } 
  }

  render() {
    const { accounts } = this.props;

    return(
      <Container>
        <div>
          <label>Choose an account:</label>
          <select name="accounts" onChange={this.handleChange}>
            <option key=""></option>
            {accounts.map((account) => (
              <option value={account._id} key={account.id}>{account.last_name}, {account.first_name}</option>
            ))}
          </select>
        </div> 
        { this.state.showImport === false &&
          <div>
            <label>There is no submissions for this account. Please import your data below.</label><br/>
            <Button variant="outline-primary" type="submit">Import</Button>
          </div>
        }
      </Container>      
    )
  }
  
}

export default Submissions;