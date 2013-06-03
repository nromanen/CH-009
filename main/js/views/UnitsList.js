define([
	'jquery',
	'underscore',
	'backbone',
	'unitsView'

], function($, _, Backbone, unitsView) {

	var UnitsList = Backbone.View.extend({  // это вид коллекции
	
		tagName: 'div',
		className: 'accordion',
		initialize: function () {
			this.collection.on('add', this.render, this);
			this.render();
		},
		render: function () {
			$('#units').append( this.el );	
            this.$el.html('');
          	this.collection.each( this.addOne, this );
			return this;
			
		},
		addOne: function( modelUnit ) {

			var UnitView = new unitsView({ model: modelUnit, collection: this.collection });
			this.$el.prepend( UnitView.el );
			UnitView.render();
			
			this.$el.find( '.unit_info' ).hide();

		}
	
	});

	return UnitsList;

});