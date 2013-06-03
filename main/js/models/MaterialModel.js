define([
	'backbone',
	'app'
], function(Backbone, App) {

	var App = App || {};

	App.Models.Material = Backbone.Model.extend({ 

		material: 'empty',
		price: 0
	
	});

	return App.Models.Material;

});
