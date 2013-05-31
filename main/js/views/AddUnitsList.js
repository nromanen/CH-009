define([
	'jquery',
	'underscore',
	'backbone',
	'app',
	'unitPlusView'

], function($, _, Backbone, App, unitPlusView) {

	var AddUnitsList = Backbone.View.extend({
	
		tagName: 'ul',
		className: 'nobullets',
		initialize: function () {
			this.collection.on('add', this.addOne, this);
			this.model.on('change', this.saveUnitCollection, this);
		},
		render: function () {
			this.collection.each(this.addOne, this);
			return this;
		},
		addOne: function(modelUnits) {
			var UnitsCollection = this.model.get ( 'goodsCollection' );
			var UnitView = new unitPlusView({ model: modelUnits, collection: UnitsCollection, something: this.model });

			UnitView.render();
			this.$el.append( UnitView.el );
			
		},
		saveUnitCollection: function () {
			App.dbConnector.EditUnitItem ( this.model );
		}
	
	});

	return AddUnitsList;
		
});