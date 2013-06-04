define([
	'jquery',
	'underscore',
	'backbone',
	'app',
	'basketItemsView',
	'text!../templates/basket.html',
	'text!../templates/basketConfirmForm.html'

], function($, _, Backbone, App, basketItemsView, basketTemplate, confirmFormTemplate) {

	var Basket =  Backbone.View.extend({

		tagName:'div',

		events:{
			'click #submitForm': 'validateForm'
		},

		initialize: function (){


			//this.collection.off('add');
			this.collection.on('add', this.addOne, this);
			this.render();
		},

		render: function (){
			this.$el.html('');
			this.$el.html( basketTemplate );
			this.$el.append( confirmFormTemplate );
          	this.collection.each( this.addOne, this );
			return this;


		},
		validateForm: function (){
			alert( ($('#firstName').val().trim()!='' && 
					$('#inputLastName').val().trim()!='' &&
					$('#inputAdress').val().trim()!=''));
			$('#prodactColletction').val(App.Basket.toJSON());
			console.log($('#prodactColletction').val());
			return ($('#firstName').val().trim()!='' && 
					$('#inputLastName').val().trim()!='' &&
					$('#inputAdress').val().trim()!='');
		},
		addOne: function(modelItems){
			
			var basketItems =  new basketItemsView({model:modelItems});
			$('#basket_tableRow').prepend( basketItems.el );
			basketItems.render();
			var	totalPrice = 0;
			_.each ( App.Basket.models, function ( goodsItem ) {
				
					totalPrice = totalPrice + goodsItem.get('price');
				} )
			$('.BasketPrice').html("$" + totalPrice);

		}


	});

	return Basket;
	
});