var App = App || {};

(function () {

	App.Models.Material = Backbone.Model.extend({ 

		material: 'empty',
		price: 0
	
	});
	
	App.Models.UnitItem = Backbone.Model.extend({
	
		unitID: 1,
		material: '',
		count: 0,
		sumPrice: 0
	
	});
	
	App.Models.Unit = Backbone.Model.extend({
	
		name: 'unit',
		mcollection: '',
		unitPrice: '0'
	});
	
	App.Models.Goods = Backbone.Model.extend({
	
		nameG: 'Goods',
		goodsCollection: '',
		goodsPrice: 0
	
	});
	App.Models.GoodsItem = Backbone.Model.extend({
		
		units: '',
		count: 0,
		goodPrice: 0

		
	});


}()); 