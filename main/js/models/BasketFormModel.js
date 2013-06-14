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
				order: "",
				price: ""
				
			}
		}	

	});

	return App.Models.BasketFormModel;

});
