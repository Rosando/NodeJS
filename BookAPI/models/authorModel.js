var mongoose = requre('mongoose');
var Schema = mongoose.Schema;

var authorModel = new Schema({
	name: {
		type: string
	},
	isActive: {
		type: boolean,
		default: true
	}
});

return mongoose.model('Author', authorModel);