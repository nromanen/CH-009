var App = App || {};

(function () {	

	App.Views.AddMaterialsList = Backbone.View.extend({
	
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
			var PlusMaterial = new App.Views.PlusMaterial({ model: modelMaterials, collection: MaterialsCollection, something: this.model });
			//console.log( this.model );
			PlusMaterial.render();
			this.$el.append( PlusMaterial.el );
			
		},
		saveUnitCollection: function () {
			
			App.dbConnector.EditUnitItem ( this.model );
	
		}
	
	});
	

}());