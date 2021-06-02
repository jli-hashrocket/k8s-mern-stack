import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AccountList = ({accounts}) => (
    <div>
      <h2>Account List</h2>
      <div>
        <Link to='/add-account'>Add Account</Link>
      </div>
      <div>
        {accounts.map((account) => (
          <div key={account._id}>
            <ul>
              <li>
                <Link to={`/${account._id}`}>
                  {account.last_name}, {account.first_name}
                </Link>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  
);
  
  

AccountList.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string
  }))
};
export default AccountList;