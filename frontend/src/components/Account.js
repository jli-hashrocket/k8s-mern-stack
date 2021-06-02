import { Link, useParams} from "react-router-dom";

const Account = ({accounts}) => {
  const { accountId } = useParams();
  const account = accounts.find(a => a._id === accountId);
  let accountData;

  // useEffect(() => {
  //   const deleteAPI = async () => {
  //     const response = await fetch(`http://localhost:8080/delete/${accountId}`);
  //     const data = await response.json();

  //     try {
  //       console.log(data);
  //       setLoading(false);
  //       setAccounts(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   deleteAPI();
  // }, []);

  if (account) {
    accountData = (
      <div>
        <p>
          <b>Email: </b>{account.email}<br/>
          <b>First Name: </b>{account.first_name}<br/>
          <b>Last Name: </b>{account.last_name}
        </p>
        <form method="POST" action={`http://localhost:8080/delete/${account._id}`}>
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

export default Account;