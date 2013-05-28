var App = App || {};

(function () {

	App.Collections.BasketItems = Backbone.Collection.extend({

			model:App.Models.BasketItem,

			initialize: function (){
				App.Events.on('addItemtToBasket', this.addItem, this);
			},
			addItem: function (model){
				console.log(model);
				
			var itemBasket = new App.Models.BasketItem({

				itemsName: model.get('nameG'),
				price: model.get('goodsPrice'),
				counts:model.get('count')
			})
			this.add(itemBasket);

			}

	})
}());