define([
	'jquery',
	'underscore',
	'backbone',
	'app',
	'text!../templates/accountantFilter.html'

], function($, _, Backbone, App, accountantFilter) {

	var accFilter = Backbone.View.extend({
		
		el: 'div',
		events: {
			
		},
		initialize: function () {
			this.render();
		},
		template: _.template( accountantFilter ),
		render: function () {
			$('#products').append( this.template() );
		}
			
		
		});

	return accFilter;
	
});