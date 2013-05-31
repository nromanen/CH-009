define([
	'backbone',
	'app'
], function(Backbone, App) {

	var App = App || {};

	App.Models.Goods = Backbone.Model.extend({
	
		nameG: 'Goods',
		goodsCollection: '',
		goodsPrice: 0
	
	});

	return App.Models.Goods;
	
});
