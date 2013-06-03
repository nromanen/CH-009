define([
	'jquery',
	'underscore',
	'backbone',
	'app',
	'basketItemsView'

], function($, _, Backbone, App, basketItemsView) {

	var Basket =  Backbone.View.extend({

		tagName:'div',

		initialize: function (){


			//this.collection.off('add');
			this.collection.on('add', this.addOne, this);
			this.render()

		},

		render: function (){
			this.$el.html('');
			this.$el.html($('#basket-table').html());
			this.$el.append($('#confirmFormTemplate').html());
          	this.collection.each( this.addOne, this );

			return this;


		},
		addOne: function(modelItems){
			
			var basketItems =  new basketItemsView({model:modelItems});
			$('#basket_tableRow').prepend( basketItems.el );
			basketItems.render();
			var	totalPrice = 0;
			_.each ( App.Basket.models, function ( goodsItem ) {
					console.log(goodsItem)
					totalPrice = totalPrice + (goodsItem.get('price')*goodsItem.get('counts'));
				} )
			$('.BasketPrice').html("$" + totalPrice);

		}


	});

	return Basket;
	
});
