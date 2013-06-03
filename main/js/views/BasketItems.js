define([
	'jquery',
	'underscore',
	'backbone',
	'app',
	'text!../templates/BasketItems.html'

], function($, _, Backbone, App, basketItemsTemplate) {

	var BasketItems = Backbone.View.extend({

		tagName:'tr',

		initialize: function () {
			
		},
		events: {
			'click .delete' : 'confirmRemove',
		},

		render: function (){

			var strTemplate = _.template( basketItemsTemplate, this.model.toJSON() );
			this.$el.html(strTemplate);

		},
		confirmRemove: function () {
			if ( confirm('Are you sure you want to delete this Goods Item?') ) {
				
				this.model.destroy();
				this.$el.remove();
				$('#itemCount').html(App.Basket.length);
				var	totalPrice = 0;
				_.each ( App.Basket.models, function ( goodsItem ) {
				
					totalPrice = totalPrice + goodsItem.get('price');
				} )
				$('.BasketPrice').html("$" + totalPrice);
			}	
		}

	});

	return BasketItems; 

});