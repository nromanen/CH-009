define([
	'jquery',
	'underscore',
	'backbone',
	'app',
	'text!../templates/orderProduct.html'

], function($, _, Backbone, App, orderProductTemplate) {

	var OrderProduct = Backbone.View.extend({

		tagName: 'tr',
		initialize: function (){
	
		},
		events: {

		},
		template: _.template( orderProductTemplate ),
		render: function () {
			
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );	
		},
		
	
	});

	return OrderProduct;

});