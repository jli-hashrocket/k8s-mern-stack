
const Account = require('../models/Account');

exports.getIndex = async (req, res) => {
    const account = await Account.find((data) => data);

    try {
        res.status(200).render('index', { account: account });
    } catch (error) {
        console.log(error);
    }
    
};

exports.getAccount = async (req, res) => {
    const accountId = req.params.accountId;
    const account = await Account.findById(accountId, (account) => account);

    try {
        res.status(200).render('account', { account: account });
    } catch (error) {
        console.log(error);
    }
};

exports.getAddAccount = (req, res) => {
    res.status(200).render('add-account');
};

exports.postAccount = (req, res) => {
    const { first_name, last_name, email } = req.body;
    
    const account = new Account({ first_name: first_name, last_name: last_name, email: email });
    account.save();
    res.status(201).redirect('/');
}

exports.postDelete = (req, res) => {
    const accountId = req.params.accountId;
    try {
        Account.findByIdAndDelete(accountId, function(err){
            if(err){
                console.log(err);
            } else {
                console.log('Item deleted');
                res.redirect('/');
            }
        });
    } catch (error) {
        console.log(error);
    }
}