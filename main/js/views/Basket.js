var App = App || {};

(function () {

	App.Views.Basket =  Backbone.View.extend({

		tagName:'div',

		initialize: function (){


			//this.collection.off('add');
			this.collection.on('add', this.addOne, this);
			this.render()

		},

		render: function (){
			this.$el.html('');
			this.$el.html($('#basket-table').html());
          	this.collection.each( this.addOne, this );
			return this;


		},
		addOne: function(modelItems){
			
			var basketItems =  new App.Views.BasketItems({model:modelItems});
			$('#basket_tableRow').prepend( basketItems.el );
			basketItems.render();
			var	totalPrice = 0;
			_.each ( App.Basket.models, function ( goodsItem ) {
				
					totalPrice = totalPrice + goodsItem.get('price');
				} )
			$('.BasketPrice').html("$" + totalPrice);

		}


	});
})();