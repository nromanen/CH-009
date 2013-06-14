define([
	'backbone',
	'app'
], function(Backbone, App) {

	var App = App || {};

	App.Collections.UnitItems = Backbone.Collection.extend({	
	
		model: App.Models.UnitItem,
		url: "/units.json",
		initialize: function () {
			
			App.Events.on( 'addUnitItem', this.addModel, this );
			App.Events.on( 'destroyItemModel', this.destroyModel, this );
			this.on('add', this.saveUnitCollection, this);
			App.Events.on('changeUnitItemPrice', this.changeUnitItemPrice, this)
		},
		addModel: function ( model ) {
			
			this.add( model );
			
		},
		destroyModel: function ( model ) {
			//App.dbConnector.deleteProduct( model.get('material') );
			model.destroy();
			this.remove(model); 
			//App.dbConnector.AddUnit("Units", model);
			//App.dbConnector.EditUnitItem( model );
		},
		saveUnitCollection: function () {
		
			//console.log ( this );
		
		},
		changeUnitItemPrice: function (newModel) {
			that=this;
			this.each(function (iterator) {
				if (iterator.get('material')===newModel.get('material')) {
					iterator.set('unitItemPrice', parseFloat((newModel.get('price')*iterator.get('count')).toFixed(2)));
					App.Events.trigger('updateUnitPrice', that);
				}
			})
		}

	});

	return App.Collections.UnitItems;

});