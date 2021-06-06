import React, { Fragment, useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AccountList from "./components/AccountList";
import Account from "./components/Account";
import AccountForm from "./components/AccountForm";


const App = () => {
  useEffect(() => {
    const getAPI = async () => {
      const response = await fetch('http://localhost:8080/account-list');
      const data = await response.json();

      try {
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

  const handleStateChange = (value) => {
    let newAccounts = accounts;
    newAccounts.push(value);
    setAccounts(newAccounts);
  }

  return (
    <Router>
      <Fragment>
        <h1>Welcome</h1>
        <Link to='/' className="nav-item">Home</Link>
        <Link to='/account-list' className="nav-item">Account List</Link>
      </Fragment>
      <Switch>
        <Route path="/add-account">
          <AccountForm accounts={accounts} handleStateChange={handleStateChange} />
        </Route>s
        <Route exact path="/account-list">
          <AccountList accounts={accounts}/>
        </Route>
        <Route path="/:accountId">
          <Account accounts={accounts}/>
        </Route>
        <Route path="/delete/:accountId" />

      </Switch>
    </Router>
    
  );
};



export default App;
