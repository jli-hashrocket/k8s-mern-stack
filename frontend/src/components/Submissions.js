import React from 'react';
import { Link, useParams, withRouter, Redirect} from "react-router-dom";
import { Container } from 'react-bootstrap';

class Submissions extends React.Component {
  constructor(props) {
    super(props)
  }

  handleChange = (event) => {
  }

  render() {
    const { accounts } = this.props;

    return(
      <Container>
        <label>Choose an account:</label>
        <select name="accounts" onChange={this.handleChange}>
          <option key=""></option>
          {accounts.map((account) => (
            <option value={account._id} key={account.id}>{account.last_name}, {account.first_name}</option>
          ))}
        </select>
      </Container>
    )
  }
  
}

export default Submissions;