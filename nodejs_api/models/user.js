const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	first_name: String,
	last_name: String,
	address: {
		_id: mongoose.Schema.Types.ObjectId,
		street: String,
		number: Number,
		zipCode: Number
	}
});

module.exports = mongoose.model('User',userSchema);