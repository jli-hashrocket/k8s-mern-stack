
const Account = require('../models/Account');

exports.getIndex = (req, res) => {
    res.status(200).render('index');
};

exports.getAddAccount = (req, res) => {
    res.status(200).render('add-account');
};

exports.postAccount = (req, res) => {
    const { first_name, last_name, email } = req.body;
    
    const account = new Account({ first_name: first_name, last_name: last_name, email: email });
    account.save();
    console.log('Account added to database');
    res.status(201).redirect('/');
}   