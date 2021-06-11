import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Table } from 'react-bootstrap';
import '../scss/Accounts.scss';



const Accounts = ({accounts}) => (
    <Container className="content-body">
      <h4>Accounts</h4>
      <div>
        <Link to='/add-account' className="btn btn-outline-primary">Add Account</Link>
      </div>
      <Table responsive striped bordered hover className="account-list">
        <thead>
          <tr>
            <th>Account</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account._id}>
              <td>
                <Link to={`/${account._id}`}>
                  {account.last_name}, {account.first_name}
                </Link>
              </td>
              <td>
                <Link to={`/edit/${account._id}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  
);
  
export default Accounts;