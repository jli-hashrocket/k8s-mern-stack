import React, { Fragment, useEffect, useState} from 'react';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "../node_modules/react-router-dom";

const App = () => {
  useEffect(() => {
    const getAPI = async () => {
      const response = await fetch('http://localhost:8080/');
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
        <h1>Account Home</h1>
        <div>
          {loading ? (
              <div>Loading</div>
          ) : (
            <div>
              {accounts.map((account) => (
                <div key={account._id}>
                  <ul>
                    <li>
                      <Link to={`/${account._id}`}>{account.last_name}, {account.first_name}</Link>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </Fragment>
      <Switch>
        <Route path="/:accountId" children={<Account />}/>
      </Switch>
    </Router>
    
  );
};

function Account() {
  debugger;
  let { accountId } = useParams();
  return <h3>ID: {accountId} </h3>
}



export default App;
