define([
	'backbone',
	'app'
], function(Backbone, App) {

	var App = App || {};

	App.Models.BasketItem = Backbone.Model.extend({
		initialize: function () {
			this.on('error', function(model, error){
			   console.log(error);
			});
		},
		defaults: {
			itemsName: "",
			counts: 0,
			price: 0
		},
		validate: function( attrs ) {
			if ( attrs.counts < 1 ) return 'error message';
			//App.Events.trigger('basketItemQuantityValidation');
		}		

	});

	return App.Models.BasketItem;

});