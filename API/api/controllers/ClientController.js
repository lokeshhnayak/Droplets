/**
 * ClientController - Provides access to Clients related data.
 *
 * @description :: Server-side logic for managing Clients
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	findOne: function(req, res) {
		var params = req.params.all();
		Client.findOne(params.id)
			.populate("address")
			.then(function(client) {
				return res.send(client);
			})
			.catch(function(err) {
				return res.serverError(err);
			});
	}
};

