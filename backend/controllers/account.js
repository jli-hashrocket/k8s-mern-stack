
const Account = require('../models/Account');

exports.index = async (req, res) => {
	const accounts = await Account.find((data) => data);
	
	try {
		res.json(accounts);
	} catch (error) {
		console.log(error);
	}
    
};

exports.getAccount = async (req, res) => {
	const accountId = req.params._id;
	const account = await Account.findById(accountId, (account) => account);
	
	try {
		res.status(200).render('account', { account: account });
		console.log('success');
	} catch (error) {
		console.log(error);
	}
};

exports.addAccount = (req, res) => {
	res.status(200).render('add-account');
};

exports.editAccount = async (req, res) => {
	const accountId = req.params._id;
	const account = await Account.findById(accountId, (account) => account);

	try {
		res.status(200).render('edit-account', {account: account});
	} catch (error) {
		console.log(error);
	}
    
};

exports.updateAccount = (req, res) => {
	const accountId = req.params._id
	Account.findById(accountId, function(err, doc) {
		doc.first_name = req.body.first_name
		doc.last_name = req.body.last_name
		doc.email = req.body.email
		doc.save()
		try {
			res.json({account: doc});
		} catch (error) {
			console.log(error);
		}
	});
}

exports.createAccount = (req, res) => {
	const account = new Account(req.body);
	account.save();

	try {
		res.status(200);
		res.json({account: account});
	} catch (error) {
		console.log(error)
	}
	
}

exports.deleteAccount = (req, res) => {
	console.log('delete')
	const accountId = req.params._id;
	try {
		Account.findByIdAndDelete(accountId, function(err){
			if(err){
				console.log(err);
			} else {
				console.log('Item deleted');
				res.status(302)
				// res.redirect('/account-list');
			}
		});
	} catch (error) {
		console.log(error);
	}
}