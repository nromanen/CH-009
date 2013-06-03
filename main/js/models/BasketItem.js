define([
	'backbone',
	'app'
], function(Backbone, App) {

	var App = App || {};

	App.Models.BasketItem =  Backbone.Model.extend({

		itemsName:"",
		counts:0,
		price:0

	});

	return App.Models.BasketItem;

});