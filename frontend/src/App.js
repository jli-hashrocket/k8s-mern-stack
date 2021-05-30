import React, { Fragment, useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "../node_modules/react-router-dom";
import AccountList from "./components/AccountList.js";

const App = () => {
  useEffect(() => {
    const getAPI = async () => {
      const response = await fetch('http://localhost:8080/account-list');
      const data = await response.json();

      try {
        console.log(data);
        setLoading(false);
        setAccounts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAPI();
  }, []);


  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <Fragment>
        <h1>Welcome</h1>
        <Link to='/' className="nav-item">Home</Link>
        <Link to='/account-list' className="nav-item">Account List</Link>
      </Fragment>
      <Switch>
        <Route exact path="/account-list">
          <AccountList accounts={accounts}/>
        </Route>
      </Switch>
    </Router>
    
  );
};

function Account() {
  let { accountId } = useParams();
  return <h3>ID: {accountId} </h3>
}



export default App;
