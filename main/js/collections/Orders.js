define([
	'backbone',
	'app',
	'underscore',
	'orderItemListView'
], function(Backbone, App, _,orderItemListView) {

	var App = App || {};

	App.Collections.Orders = Backbone.Collection.extend({

			model:App.Models.BasketFormModel,

			initialize: function (){
				this.fetchFromDb();
			},

			fetchFromDb: function (){
			
			var that = this;
				$.ajax({
					type: "POST",
					url: "/cgi-bin/fetchOrders.py",
					data:{
						fetchType:1
					},	
					success: function(msg) {
						that.writeCollection(msg);
					},
 					error: function (er){
 						console.log('error ' + er);
 					}	
				})

			},

			writeCollection: function(msg, pointer){
			var that=this;	
				var orders = JSON.parse(msg);
				_.each(orders, function(current) {
					var currModel = new App.Models.BasketFormModel(current);
					var products = new App.Collections.BasketItems(JSON.parse(currModel.get('order')));
					currModel.set('order', products);
					that.add(currModel);
				});
				var ordersView = new orderItemListView({collection: this})
				ordersView.render();
				$('#orders').append(ordersView.el);
			return this;	
			},

	});

	return App.Collections.Orders;

});