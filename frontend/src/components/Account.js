import { useState } from 'react';
import { Link, useParams, withRouter, Redirect} from "react-router-dom";
import { Container, Form, Button } from 'react-bootstrap';
import '../scss/Account.scss';


const Account = ({accounts, handleStateChange}) => {
  const { accountId } = useParams();
  const [redirect, setRedirect] = useState(null);
  const account = accounts.find(a => a._id === accountId);
  let accountData;

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = { account: { _id: accountId }};

    fetch(`http://localhost:8080/delete/${account._id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(res => {
      if (!res.ok) {
          const error = res.status;
          return Promise.reject(error);
      } else {

      }
      
      handleStateChange({ account: { _id: accountId}}, res.status)
      setRedirect('/account-list');
    })
    .catch(err => {
      console.log('error')
    })
  }

  if (redirect) {
    return <Redirect to={redirect} />
  }
  if (account) {
    accountData = (
      <div>
        <h4>{account.last_name}, {account.first_name}</h4>
        <p>
          <b>First Name: </b>{account.first_name}<br/>
          <b>Last Name: </b>{account.last_name}<br/>
          <b>Email: </b>{account.email}
        </p>
        <Form onSubmit={handleSubmit}>
          <div>
            <input type="hidden" value={account._id} />
            <Link to="/account-list" className="btn btn-outline-secondary">Back</Link>
            <Button variant="outline-primary">Delete</Button>
          </div>
        </Form>
      </div>
    )
  }

  return (
    <Container className="content-body">{accountData}</Container>
  )
  
};

export default withRouter(Account);