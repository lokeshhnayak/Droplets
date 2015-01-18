/**
* Client
*
* @description :: Represents a Client
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	attributes: {
		name: {
			type: 'string',
			required: true
		},
		description: 'string',
		clientType: {
			type: 'string',
			enum: ['School', 'Office', 'Contractor', 'Individual'],
			defaultsTo: 'School'
		},
		clientStatus: {
			type: 'string',
			enum: ['Prospect', 'Active', 'Inactive'],
			defaultsTo: 'Prospect'
		},
		address: {
			model: 'Address'
		},
		agency: {
			model: 'Agency'
		},
		routes: {
			collection: 'Route',
			via: 'client'
		},
		holidays: {
			collection: 'Holiday',
			via: 'client'
		}
	}
};
