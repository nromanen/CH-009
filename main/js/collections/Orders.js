define([
	'backbone',
	'app'
], function(Backbone, App) {

	var App = App || {};

	App.Collections.Orders = Backbone.Collection.extend({

			model:App.Models.BaketFormModel,

			initialize: function (){
				console.log("init orders");
			},

			fetchFromDb: function (){
				console.log('fetching orders');
				$.ajax({
					type: "POST",
					url: "/cgi-bin/fetchOrders.py",
					data:{
						fetchType:1
					},	
					success: function(msg) {
						console.log(msg);
					},
 					error: function (er){
 						console.log('error ' + er);
 					}	
				})
			}			

	});

	return App.Collections.BasketItems;

});