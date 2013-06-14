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
			this.model.on('error', this.showError);	
		},
		events: {
			'click .delete' : 'confirmRemove',
			'change .span1': 'changeCount'
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
					totalPrice = totalPrice + (goodsItem.get('price')*goodsItem.get('counts'));
				});
				$('.BasketPrice').html("$" + totalPrice);
			}	
		},
		showError: function () {
			$('#alertAddItem').remove();
			$('body').append('<div id="alertAddItem"><div id="alertError"><div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Error! </strong>You may NOT enter negative or zero values!</div></div></div>');
			setTimeout( function() { $('#alertAddItem').remove() } , 5000);
		},
		changeCount:  function () {
			
			var	totalPrice = 0;
			this.model.set('counts', this.$el.find('.span1').val(), {validate: true});

				_.each ( App.Basket.models, function ( goodsItem ) {	
					totalPrice = totalPrice + (goodsItem.get('price')*goodsItem.get('counts'));
				} )
				this.$el.find('span').html("$"+this.model.get('price')*this.model.get('counts'));
				$('.BasketPrice').html("$" + totalPrice);



		}

	});

	return BasketItems; 


	});



