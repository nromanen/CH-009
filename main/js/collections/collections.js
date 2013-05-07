var App = App || {};

(function () {

	App.Collections.List = Backbone.Collection.extend({ 
		model: App.Models.Material,
		url: '/materials.json',
		initialize: function () {
		
			App.Events.on( 'destroyModel', this.destroyModel, this );
			App.Events.on( 'addModel', this.addModel, this );
			App.Events.on( 'fetchProducts', this.fetchProducts, this );
			App.Events.on( 'writeProducts', this.writeProducts, this );
			
			//App.dbConnector.openDatabase();
			
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
	



	App.Collections.Units = Backbone.Collection.extend({

	
		model: App.Models.Unit,
		url: "/units.json",
		initialize: function () {
			
			App.Events.on( 'addUnit', this.addModel, this );
			App.Events.on( 'unitDelete', this.deleteModel, this );
			App.Events.on( 'fetchUnit', this.fetchUnits, this );
			App.Events.on( 'writeUnits', this.writeCollection, this );
			App.Events.on( 'editUnitName', this.changeName, this );
			App.dbConnector.openDatabase();
			
		},
		addModel: function ( model ) {

			this.add( model );
			App.dbConnector.AddUnit ( "Units", model );
			 
		},
		fetchUnits: function(){
			
			App.dbConnector.fetchUnit();
		
		},
		writeCollection: function(units){
		
			for(i=0; i<=units.length-1;i++){
			
				var unitCollection = new App.Collections.UnitItems();
				
				_.each( units[i].mcollection,  function ( model ) {
					App.Materials.each( function (material) {
						if (model['material']==material.get('material')) {
							model['unitItemPrice']=material.get('price')*model['count'];
						}
					});
					//model['unitItemPrice']=App.Materials.where({material: model['material']}).get('price')*model['count'];
					//console.log(App.Materials.where({material: model['material']}));
				});

				_.each( units[i].mcollection,  function ( model ) {

					units[i].unitPrice=units[i].unitPrice+model['unitItemPrice'];
				});

				unitCollection.add(units[i].mcollection);
				var mUnit = new App.Models.Unit({
					name:units[i].name,
					mcollection:unitCollection,
					unitPrice: units[i].unitPrice
							
				});
				this.add(mUnit);
				i++;
			}
		},
		deleteModel: function( model ) {
			App.dbConnector.deleteUnit( model.get( "name" ) );
			model.destroy();

		},
		
		changeName: function ( model, value ) {
			App.dbConnector.changeUnitName( model.get( 'name' ), value );
			model.set({ name: value });
		}
	
	});
	
	App.Collections.UnitItems = Backbone.Collection.extend({	
	
		model: App.Models.UnitItem,
		initialize: function () {
			
			App.Events.on( 'addUnitItem', this.addModel, this );
			App.Events.on( 'destroyItemModel', this.destroyModel, this );
			App.Events.on('newMaterialCount', this.editCount, this);
			this.on('add', this.saveUnitCollection, this);
			
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
		editCount: function (model, value) {
			model.set({ count: value });
		}

	});

	
	App.Collections.Goods = Backbone.Collection.extend({
	
		model:App.Models.Goods,
		initialize: function () {
		
			App.Events.on( 'addGoods', this.addModel, this );
			App.Events.on('goodsDelete', this.deleteModel, this)
			App.Events.on( 'writeGoods', this.writeCollection, this );
			App.Events.on( 'fetchGoods', this.fetchGoods, this );
			App.Events.on( 'editGoodsName', this.changeName, this );
			App.Events.on('newUnitsCount', this.editCount, this);

		},
		addModel: function (model) {
			
			this.add( model );

			App.dbConnector.AddGoodsToDb( 'Tovaru', model );
		
		},
		deleteModel: function(model){
			App.dbConnector.deleteGoods(model.get( 'nameG' ));

			model.destroy();
			this.remove(model); 			
		},
		writeCollection: function(goods){
			for(i=0; i<goods.length;i++){
				
				var goodsCollection = new App.Collections.GoodsItems();
				_.each( goods[i].goodsCollection,  function ( model ) {
					App.Units.each( function (unit) {
						if (model['units']==unit.get('name')) {
							model['goodsItemPrice']=unit.get('unitPrice')*model['count'];
						}
					});
				});

				_.each( goods[i].goodsCollection,  function ( model ) {

					goods[i].goodsPrice=goods[i].goodsPrice+model['goodsItemPrice'];
				});
				console.log(goods[i].goodsPrice);
				goodsCollection.add(goods[i].goodsCollection);
				var mGoods = new App.Models.Goods({
					nameG:goods[i].nameG,
					goodsCollection: goodsCollection,
					goodsPrice: goods[i].goodsPrice
							
				});

				this.add(mGoods);
			}	

		},
		deleteModel: function(model){
				
				App.dbConnector.deleteGoods(model.get('nameG'));
				model.destroy();
				this.remove(model); 			
			

		},
		changeName: function ( model, value ) {
		
			//App.dbConnector.changeGoodName( model.get( 'name' ), value );
			model.set({ nameG: value });


				this.add(mGoods);
				i++;
			
		},
		fetchGoods: function(){
			
			App.dbConnector.fetchGood();
		
		},
		changeName: function(model, value){
			App.dbConnector.changeGoodsName( model.get( 'nameG' ), value );
			model.set({ nameG: value });
		},
		editCount: function (model, value) {
			model.set({ count: value });

		}
		
	});


	App.Collections.GoodsItems = Backbone.Collection.extend({
		
		model:App.Models.GoodsItem,
		initialize: function () {
		
			App.Events.on('newUnitsCount', this.editCount, this);
		
		},
		editCount: function ( model, value, newPrice ) {
			model.set({ goodPrice: newPrice});
			model.set({ count: value });
			console.log(model);
		}
	
	});
	
}()); 