const mongoose = require('mongoose');
const AccountSchema = mongoose.Schema({
	first_name: {
		type: String,
		require: true,
	},
	last_name: {
		type: String,
		require: true
	},
	email: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('account', AccountSchema);