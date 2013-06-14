define([
	'jquery',
	'underscore',
	'backbone',
	'app',
	'plusMaterialView'

], function($, _, Backbone, App, plusMaterialView) {

	var AddMaterialsList = Backbone.View.extend({
	
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
		addOne: function( modelMaterials ) {
		
			var MaterialsCollection = this.model.get ( 'mcollection' );
			var PlusMaterial = new plusMaterialView({ model: modelMaterials, collection: MaterialsCollection, something: this.model });
			//console.log( this.model );
			PlusMaterial.render();
			this.$el.append( PlusMaterial.el );
			
		},
		saveUnitCollection: function () {
			
			App.dbConnector.EditUnitItem ( this.model );
	
		}
	
	});

	return AddMaterialsList;	

});