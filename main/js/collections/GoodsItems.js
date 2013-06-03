define([
	'backbone',
	'app'
], function(Backbone, App) {

	var App = App || {};

	App.Collections.GoodsItems = Backbone.Collection.extend({
		
		model:App.Models.GoodsItem,
		initialize: function () {
		
			App.Events.on('newUnitsCount', this.editCount, this);
			App.Events.on('refreshGoodsPrice', this.refreshPrice, this);
		},
		editCount: function ( model, value, newPrice ) {
			model.set({ goodPrice: newPrice});
			model.set({ count: value });
			console.log(model);
		},
		refreshPrice: function (pointerModel){
			this.each( function (iterator){
				if (iterator.get('units')===pointerModel.get('name')) {
					iterator.set('goodsItemPrice', parseFloat((pointerModel.get('unitPrice')*iterator.get('count')).toFixed(2)));
					App.Events.trigger('changeGoodsPrice', iterator.get('nameGoods'));
				}
			});
		}
	
	});

	return App.Collections.GoodsItems;

});