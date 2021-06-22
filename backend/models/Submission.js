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
	user_name: {
		type: String
	},
	submission_status: {
		type: String
	},
  date: {
    type: Date
  }
})

module.exports = mongoose.model('submission', SubmissionSchema);