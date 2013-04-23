var App = App || {};

(function () {

	App.Collections.List = Backbone.Collection.extend({ 
		model: App.Models.Material,
		url: "/materials.json",
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
	
	App.Collections.Units = Backbone.Collection.extend({	//�����
	
		model: App.Models.Unit,
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
				
				unitCollection.add(units[i].mcollection);
				
				var mUnit = new App.Models.Unit({
					name:units[i].name,
					mcollection:unitCollection 
							
				});
			
				this.add(mUnit);
				i++;
			}
		},
		deleteModel: function( model ) {
			App.dbConnector.deleteUnit( model.get( "name" ) );
			model.destroy();
			// ������ ��������� ������ �������� �� ����

		},
		
		changeName: function ( model, value ) {
			App.dbConnector.changeUnitName( model.get( 'name' ), value );
			model.set({ name: value });
		}
	
	});
	
	App.Collections.UnitItems = Backbone.Collection.extend({	//��������� � ������
	
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
		
			//App.dbConnector.EditUnitItem ( this.model );
			console.log('App.dbConnector.EditUnitItem triggered!');
		
		},
		editCount: function (model, value) {
			model.set({ count: value });
		}

	});

	
	App.Collections.Goods = Backbone.Collection.extend({
	
		model:App.Models.Goods,
		initialize: function () {
		
			App.Events.on( 'addGoods', this.addModel, this );
			App.Events.on('goodsDelete', this.deleteModel, this);
			App.Events.on('editGoodsName', this.changeName, this);

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
			model.destroy();
			this.remove(model); 			
		},
		writeCollection: function(goods){
			for(i=0; i<=goods.length-1;i++){
			    console.log(goods);
				var goodsCollection = new App.Collections.GoodsItems();
				goodsCollection.add(goods[i].goodsCollection);
				var mGoods = new App.Models.Unit({
					nameG:goods[i].nameG,
					goodsCollection: goodsCollection 
							
				});

	this.add(mGoods);
				i++;
				i++;
			}	
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
		editCount: function ( model, value ) {
		
			model.set({ count: value });
		
		}
	
	});
	
}()); 