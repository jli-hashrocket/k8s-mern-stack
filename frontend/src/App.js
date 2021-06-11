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
import './scss/App.scss';
import { Container } from 'react-bootstrap';

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

  const handleStateChange = (value, status=null) => {
    let newAccounts = accounts;
    let updatedAccountIndex = newAccounts.findIndex((account) => account._id == value._id)
    if ( status === 204 ) {
      newAccounts.splice(updatedAccountIndex, 1);
    } else {
      if(updatedAccountIndex !== null && updatedAccountIndex !== undefined && updatedAccountIndex !== -1){
        newAccounts[updatedAccountIndex] = value
      } else {
        newAccounts.push(value);
      }
    }
    
    
    setAccounts(newAccounts);
  }

  return (
    <Router>
      <Container fluid className="wrapper">
        <Fragment>
          <Container>
            <h1>Submissions Manager</h1>
            <Link to='/' className="nav-item">Home</Link>
            <Link to='/account-list' className="nav-item">Account List</Link>
          </Container>
        </Fragment>
        <Switch>
          <Route path="/add-account">
            <AccountForm accounts={accounts} handleStateChange={handleStateChange} />
          </Route>
          <Route path="/edit/:accountId">
            <AccountForm accounts={accounts} handleStateChange={handleStateChange} />
          </Route>
          <Route exact path="/account-list">
            <AccountList accounts={accounts}/>
          </Route>
          <Route path="/:accountId">
            <Account accounts={accounts} handleStateChange={handleStateChange}/>
          </Route>
          <Route path="/delete/:accountId" />

        </Switch>
      </Container>
    </Router>
    
  );
};



export default App;
