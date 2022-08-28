import React from 'react';
import { Button, Form, Container, Table } from 'react-bootstrap';
import '../scss/Submissions.scss';


class Submissions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showImport: null,
      selectedAccount: null,
      submissions: [],
      apiUrl: ''
    }

    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.importData = this.importData.bind(this);
  }

  handleSelect = async (event) => {
    const accountId = event.target.value; 

    if ( accountId !== "" ) {
      const response =  await fetch(`http://localhost:8080/accounts/${accountId}/submissions`);
      const data = await response.json();
      
      try {
        if (data.submissions === null ) {
          this.setState({ showImport: false, selectedAccount: accountId, apiUrl: '' })
        } else {
          this.setState({ showImport: true, selectedAccount: accountId, apiUrl: '', submissions: data.submissions })
        }
      } catch (error) {
        console.log(error);
      }
      
    } 
  }

  handleChange = (accountId, event) => {
    this.setState({ apiUrl: event.target.value})
  }

  importData = (state, e) => {
    e.preventDefault();
    const body = { api_url: state.apiUrl }

    fetch(`http://localhost:8080/accounts/${state.selectedAccount}/import-submissions`, {
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
        if ( d.submissions ) {
          this.setState({ submissions: d.submissions, showImport: true })
        }
      })
      
    })
    .catch(err => {
      console.log('error')
    })

  }

  render() {
    const { accounts } = this.props;

    return(
      <Container>
        <div class="select-tag-group">
          <label>Choose an account:</label>
          <select name="accounts" onChange={this.handleSelect}>
            <option key=""></option>
            {accounts.map((account) => (
              <option value={account._id} key={account.id}>{account.last_name}, {account.first_name}</option>
            ))}
          </select>
        </div> 
        { this.state.showImport === false &&
          <div>
            <p>There are no submissions for this account. Please import your data below.</p>
            <Form onSubmit={(e) => this.importData(this.state, e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <div class="row">
                  <div class="col-2"> 
                    <Form.Label>API Endpoint:</Form.Label>
                  </div>
                  <div class="col-7"> 
                    <Form.Control type="text" placeholder="Enter URL" value={this.state.apiUrl} onChange={(e) => this.handleChange(this.state.selectedAccount, e)}/>
                  </div>
                </div>
              </Form.Group>
              <Button variant="outline-primary" type="submit">Import</Button>
            </Form>
          </div>
        }
        { this.state.showImport === true &&
          <Table responsive striped bordered hover className="submissions-list">
            <thead>
              <tr>
                <td>Username</td>
                <td>Submission Id</td>
                <td>Form Id</td>
                <td>Submission Status</td>
                <td>Created Date</td>
              </tr>
            </thead>
            <tbody>
              {this.state.submissions.map((submission) => (
                <tr key={submission._id}>
                  <td>{submission.username}</td>
                  <td>{submission.submission_id}</td>
                  <td>{submission.form_id}</td>
                  <td>{submission.submission_status}</td>
                  <td>{submission.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          
        }
        
      </Container>      
    )
  }
  
}

export default Submissions;