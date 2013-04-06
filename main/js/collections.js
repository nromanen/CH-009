var App = App || {};

(function () {

	App.Collections.List = Backbone.Collection.extend({
		model: App.Models.Material,
		initialize: function () {
			
			App.Events.on( 'destroyModel', this.destroyModel, this );
			App.Events.on( 'addModel', this.addModel, this );
			App.Events.on( 'fetchProducts', this.fetchProducts, this );
			App.Events.on( 'writeProducts', this.writeProducts, this );
			
			App.dbConnector.openDatabase();
			
		},
		fetchProducts: function () {
			
			App.dbConnector.fetchAll();
			
		},
		writeProducts: function ( products ) {
		
			for ( var i=0; i<=products.length-1; i++ )
			{   
			
				var strMaterial = new App.Models.Material({ 
					material: products[i].material, 
					price: products[i].price 
				});
				this.add ( strMaterial );
				
			}
			
		},
		destroyModel: function ( model ) {
			App.dbConnector.deleteProduct( model.get('material'));
			model.destroy();
			
		},
		addModel: function ( model ) {
		  
			this.add( model );
			App.dbConnector.addProduct ( model.get("material"), model.get("price"));
		}
	});
	
	App.Collections.Units = Backbone.Collection.extend({
	
		model: App.Models.Unit,
		initialize: function () {
			
			App.Events.on( 'addUnit', this.addModel, this );
			
		},
		addModel: function ( model ) {
		  
			console.log('addModel function performing'); 
			this.add( model );
			App.dbConnector.AddToDb("Units", model);
		}
	
	});
	
	App.Collections.UnitItems = Backbone.Collection.extend({
	
		model: App.Models.UnitItem,
		initialize: function () {
			
			App.Events.on( 'addUnitItem', this.addModel, this );
			
		},
		addModel: function ( model ) {
			
			this.add( model );
			
		}
	
	});


}()); 