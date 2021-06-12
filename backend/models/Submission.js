const mongoose = require('mongoose');
const SubmissionSchema = mongoose.Schema({
  account_id: {
    type: String
  },
	submission_id: {
		type: Number
	},
	form_id: {
		type: Number
	},
	email: {
		type: String
	},
  date: {
    type: Date
  }
})

module.exports = mongoose.model('submission', SubmissionSchema);