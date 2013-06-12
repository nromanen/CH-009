define([
	'backbone',
	'app'
], function(Backbone, App) {

	var App = App || {};

	App.Models.BasketItem = Backbone.Model.extend({
		initialize: function() {
			this.on('error', function(model) {
				alert('Negative number!');
			})		
		},
		defaults: {
			itemsName: "",
			counts: 0,
			price: 0
		},
		validate: function( attrs ) {

			console.log( attrs.toJSON() );
			if ( attrs.attributes.counts < 1 ) return 'This is an error message!';

		}		

	});

	return App.Models.BasketItem;

});