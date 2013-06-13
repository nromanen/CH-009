define([
	'backbone',
	'app'
], function(Backbone, App) {

	var App = App || {};

	App.Collections.BasketItems = Backbone.Collection.extend({

			model : App.Models.BasketItem,

			initialize: function () {

				App.Events.on('addItemtToBasket', this.addItem, this);
				
			},
			addItem: function (model) {
				
				var search = this.where( { itemsName:model.get('nameG') } );
				if ( ! search[0] ) {
					var itemBasket = new App.Models.BasketItem({
						itemsName: model.get('nameG'),
						price: model.get('goodsPrice'),
						counts:model.get('count')
					});
					this.add(itemBasket);
					App.Events.trigger('alertAdd');
				} else {
					App.Events.trigger("ErrorExist");
				}

			}

	});

	return App.Collections.BasketItems;

});