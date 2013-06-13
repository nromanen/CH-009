define([
	'backbone',
	'app',
	'underscore'
], function(Backbone, App, _) {

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

			writeCollection: function(msg){
				var that=this;	
				var orders = JSON.parse(msg);
				_.each(orders, function(current) {
					var currModel = new App.Models.BasketFormModel(current);
					that.add(currModel);
				});
			}			

	});

	return App.Collections.Orders;

});