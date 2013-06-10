define([
	'jquery',
	'underscore',
	'backbone',
	'app',
	'basketItemsView',
	'text!../templates/basket.html',
	'text!../templates/basketConfirmForm.html',
	'text!../templates/alertInputForm.html',
	'modelBinder'

], function($, _, Backbone, App, basketItemsView, basketTemplate, confirmFormTemplate, alertInputFormTemplate, modelBinder) {

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
			this.modelBinder = new Backbone.ModelBinder();
          	this.modelBinder.bind(this.model, this.el);
          	return this;
		},
		validateForm: function (){
			if (!($('#firstName').val().trim()!='' && 
				$('#inputLastName').val().trim()!='' &&
				$('#inputAddress').val().trim()!='')) {
					$('#alertInputForm').remove();
					$('.form-horizontal').append('<div id="alertInputForm"></div>');
					$('#alertInputForm').html(alertInputFormTemplate);
			} else {
				this.model.set('order', this.collection);
				
			}
			
			setTimeout( function() { $('#alertInputForm').remove() } , 2000)
			return false; 
		},
		addOne: function(modelItems){
			
			var basketItems =  new basketItemsView({model:modelItems});
			$('#basket_tableRow').prepend( basketItems.el );
			basketItems.render();
			var	totalPrice = 0;
			_.each ( App.Basket.models, function ( goodsItem ) {
					totalPrice = totalPrice + (goodsItem.get('price')*goodsItem.get('counts'));
				} )
			$('.BasketPrice').html("$" + totalPrice);

		}


	});

	return Basket;
	
});
