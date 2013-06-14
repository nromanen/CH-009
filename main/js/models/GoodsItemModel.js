define([
	'backbone',
	'app'
], function(Backbone, App) {

	var App = App || {};

	App.Models.GoodsItem = Backbone.Model.extend({
		
		units: '',
		count: 0,
		goodsItemPrice: 0
		
	});
	
	return App.Models.GoodsItem;
	
});

