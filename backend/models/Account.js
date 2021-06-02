const mongoose = require('mongoose');
const AccountSchema = mongoose.Schema({
	first_name: {
		type: String
	},
	last_name: {
		type: String
	},
	email: {
		type: String
	}
})

module.exports = mongoose.model('account', AccountSchema);