import { useState } from 'react';
import { Link, useParams, withRouter, Redirect} from "react-router-dom";

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
        <p>
          <b>Email: </b>{account.email}<br/>
          <b>First Name: </b>{account.first_name}<br/>
          <b>Last Name: </b>{account.last_name}
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="hidden" value={account._id} />
            <Link to="/account-list">Back</Link>
            <button>Delete</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      {accountData}
    </div>
  )
  
};

export default withRouter(Account);