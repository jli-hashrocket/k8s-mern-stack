import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const AccountList = ({accounts}) => (
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
)

AccountList.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string
  }))
};
export default AccountList;