define([
	'backbone',
	'app'
], function(Backbone, App) {

	var App = App || {};

	App.Collections.List = Backbone.Collection.extend({ 
		model: App.Models.Material,
		url: '/materials.json',
		initialize: function () {
		
			App.Events.on( 'destroyModel', this.destroyModel, this );
			App.Events.on( 'addModel', this.addModel, this );
			App.Events.on( 'fetchProducts', this.fetchProducts, this );
			App.Events.on( 'writeProducts', this.writeProducts, this );
			App.Events.on('fetchMaterialsPostgDB', this.fetchPostDB, this);
			//App.dbConnector.openDatabase();
			
		},
		fetchPostDB: function (jsonDate) {
			
			var materialsArray = JSON.parse(jsonDate);
	
			for ( var i=0; i<=materialsArray .length-1; i++ )
			{   
			
				var strMaterial = new App.Models.Material({ 
					material: materialsArray[i].material, 
					price: materialsArray[i].price 
				});
				this.addModel ( strMaterial );
				
			}

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
		
			App.dbConnector.deleteProduct( model.get('material') );
			model.destroy();
			
		},
		addModel: function ( model ) {
		  
			this.add( model );
			App.dbConnector.addProduct ( model.get("material"), model.get("price") );
			
		}
	});

	return App.Collections.List;

});

