/**
* Route
*
* @description :: Represents a Route
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	attributes: {
		dateFrom: {
			type: 'date',
			required: true
		},
		dateTo: {
			type: 'date',
			required: true
		},
		description: 'string',
		client: {
			model: 'Client'
		}
	}
};
