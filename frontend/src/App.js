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
import Index from "./components/Index";
import './scss/App.scss';
import { Container, Nav, Navbar } from 'react-bootstrap';

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
        <Container>
          <Fragment>
            <Navbar className="nav-container">
              <Navbar.Brand href="/">Submissions Manager</Navbar.Brand>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Link to='/' className="nav-item nav-link">Home</Link>
                  <Link to='/account-list' className="nav-item nav-link">Account List</Link>
                  <Link to='/submissions' className="nav-item nav-link">Submissions</Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Fragment>
        </Container>
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
          <Route path="/submissions">
            
          </Route>
          <Route path="/">
            <Index />
          </Route>
        </Switch>
      </Container>
    </Router>
    
  );
};



export default App;
