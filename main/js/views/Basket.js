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
					setTimeout( function() { $('#alertInputForm').remove() } , 2000)
			} else {
				this.sendData();
			}
			
			return false;/*($('#firstName').val().trim()!='' && 
					$('#inputLastName').val().trim()!='' &&
					$('#inputAddress').val().trim()!=''); */
		},
		sendData: function (){
			var that=this;
			$.ajax({
					type: "POST",
					url: "/cgi-bin/WriteBasket.py",
					data:{
						firstName:this.model.get('firstName'),
						lastName:this.model.get('lastName'),
						address:this.model.get('address'),
						products: JSON.stringify(this.collection)
					},	
					success: function(msg) {
						that.onSuccessEvent(msg);
					},
 					error: function (er){
 						console.log('error ' + er);
 					}	

			});
		},
		onSuccessEvent: function (msg){
			console.log(msg);
			$('#closeForm').click();
			$('#shoping_cart').remove();
			$('#basketTabMarker').remove();
			$('#myTab a:last').tab('show');
			App.Basket = new App.Collections.BasketItems;
			//window.location.reload();
			//history.go(0);
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
