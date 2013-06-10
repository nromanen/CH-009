define([
	'backbone',
	'app'
], function(Backbone, App) {

	var App = App || {};

	App.Models.BasketFormModel =  Backbone.Model.extend({

		defaults: function() {
			return {

				firstName:"",
				lastName:"",
				address:"",
				order: ""
				
			}
		}	

	});

	return App.Models.BasketFormModel;

});
