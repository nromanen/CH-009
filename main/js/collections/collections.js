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
			App.Events.on('fetchMaterialsPostgDB', this.fetchPostDB, this);
			//App.dbConnector.openDatabase();
			
		},
		fetchPostDB: function (jsonDate) {

			var materialsArray = JSON.parse(jsonDate)
	
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
	



	App.Collections.Units = Backbone.Collection.extend({

	
		model: App.Models.Unit,
		url: "/units.json",
		initialize: function () {
			
			App.Events.on( 'addUnit', this.addModel, this );
			App.Events.on( 'fetchUnit', this.fetchUnits, this );
			App.Events.on( 'writeUnits', this.writeCollection, this );
			App.Events.on('fetchUnitsPostgDB', this.fetchPostgDB, this);
			App.Events.on('updateUnitPrice', this.updateUnitPrice, this);
			App.dbConnector.openDatabase();
			
		},
		addModel: function ( model ) {

			this.add( model );
			App.dbConnector.AddUnit ( "Units", model );
			 
		},
		fetchPostgDB: function (jsonUnits){
			var unitsArray = JSON.parse(jsonUnits)
			console.log(unitsArray)
			var totalPrise=0;
			for(i=0; i<=unitsArray .length-1;i++){
			
			
				var unitCollection = new App.Collections.UnitItems();
				
				unitCollection.add(JSON.parse(unitsArray[i].mcollection));

				_.each(JSON.parse(unitsArray[i].mcollection),  function ( model ) {

					totalPrise= parseFloat ( (totalPrise + model['unitItemPrice']).toFixed(2) );
				
				});


				var mUnit = new App.Models.Unit({
					name:unitsArray[i].name,
					mcollection:unitCollection,
					unitPrice:totalPrise
							
				});
				//console.log(unitCollection)
				
				this.addModel(mUnit);
				totalPrise=0
			}




		},
		fetchUnits: function(){
			
			App.dbConnector.fetchUnit();
		
		},
		writeCollection: function(units){
		
			for(i=0; i<=units.length-1;i++){
			
				var unitCollection = new App.Collections.UnitItems();
				
				_.each( units[i].mcollection,  function ( model ) {
					App.Materials.each( function (material) {
						if (model['material'] === material.get('material') ) {
							model['unitItemPrice'] = parseFloat( (material.get('price') * model['count']).toFixed(2) );
						}
					});
					//model['unitItemPrice']=App.Materials.where({material: model['material']}).get('price')*model['count'];
					//console.log(App.Materials.where({material: model['material']}));
				});

				_.each( units[i].mcollection,  function ( model ) {

					units[i].unitPrice = parseFloat ( (units[i].unitPrice + model['unitItemPrice']).toFixed(2) );
				
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
		updateUnitPrice: function (unitItemCollection) {

			this.each(function (iterator) {
				if (iterator.get('mcollection')===unitItemCollection){
					iterator.set('unitPrice', 0);
					iterator.get('mcollection').each(function (material){
						iterator.set('unitPrice', iterator.get('unitPrice')+material.get('unitItemPrice'));

					});
				}

			})
			


		}
		
	});
	
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

	
	App.Collections.Goods = Backbone.Collection.extend({
	
		model:App.Models.Goods,
		initialize: function () {
		
			App.Events.on( 'addGoods', this.addModel, this );
			App.Events.on( 'goodsDelete', this.deleteModel, this)
			App.Events.on( 'writeGoods', this.writeCollection, this );
			App.Events.on( 'fetchGoods', this.fetchGoods, this );
			App.Events.on( 'editGoodsName', this.changeName, this );
 			App.Events.on('newUnitsCount', this.editCount, this);
			App.Events.on('fetchGoodsPostgDB', this.fetchPostgDB, this);
			App.Events.on('changeGoodsPrice', this.changeGoodsPrice, this);
		},
		addModel: function (model) {
			var search = this.where({nameG:model.get('nameG')})
			if(!search[0]){
				this.add( model );

				App.dbConnector.AddGoodsToDb( 'Tovaru', model );
		
				
			}else{
				alert("this goods is already in database")

			}

			
		},
		fetchPostgDB: function (jsonGoods){
			
			var goodsArray = JSON.parse(jsonGoods);
			var totalPrice = 0;
			for(i=0; i<goodsArray.length;i++){
				
				var goodsCollection = new App.Collections.GoodsItems();
				
				console.log(goodsArray[i].goodsPrice);
				goodsCollection.add(JSON.parse(goodsArray[i].goodsCollection));

				_.each( JSON.parse(goodsArray[i].goodsCollection),  function ( model ) {

					 totalPrice = parseFloat( ( totalPrice + model['goodsItemPrice']).toFixed(2) );

				});

				var mGoods = new App.Models.Goods({
					nameG:goodsArray[i].nameG,
					goodsCollection: goodsCollection,
					goodsPrice: totalPrice
							
				});

				this.addModel(mGoods);
				totalPrice=0;
			}	


		},
		changeGoodsPrice: function (pointer){
			var goodsArray = this.where({nameG: pointer});
			if (goodsArray.length>0) {
				_.each(goodsArray, function (currGoodsModel){
					currGoodsModel.set('goodsPrice', 0);
					currGoodsModel.get('goodsCollection').each(function(iterator) {
						currGoodsModel.set('goodsPrice', currGoodsModel.get('goodsPrice')+iterator.get('goodsItemPrice') );
					});
				});
			};
		},
		deleteModel: function(model) {			
			App.dbConnector.deleteGoods(this.model.get('nameG'));
			model.destroy();
			this.remove(model); 			
		},
		writeCollection: function(goods){
			for(i=0; i<goods.length;i++){
				
				var goodsCollection = new App.Collections.GoodsItems();
				_.each( goods[i].goodsCollection,  function ( model ) {
					console.log('first each');
					App.Units.each( function (unit) {console.log('second each');
						if (model['units'] == unit.get('name')) {
							model['goodsItemPrice'] = parseFloat( (unit.get('unitPrice') * model['count']).toFixed(2) );
						}
					});
				});

				_.each( goods[i].goodsCollection,  function ( model ) {

					goods[i].goodsPrice = parseFloat( (goods[i].goodsPrice + model['goodsItemPrice']).toFixed(2) );

				});
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
		fetchGoods: function(){
			
			App.dbConnector.fetchGood();
		
		},
		changeName: function(model, value){

			App.dbConnector.changeGoodsName( model.get( 'nameG' ), value );
			var goodsHrefId = value;
			goodsHrefId = goodsHrefId.replace(" ","");
			model.set('hrefId', goodsHrefId);
			console.log(model);
			model.set({ nameG: value});
			
			
		},
		editCount: function (model, value) {
			var found = App.Units.find( function( currentModel ) {
				return currentModel.get('name') === model.get('units');
			});
			var newprice = ( value*found.get('unitPrice') ).toFixed(2);
			newprice = parseFloat( newprice );
			model.set({ count: value, goodsItemPrice: newprice });

		}
		
	});


	App.Collections.GoodsItems = Backbone.Collection.extend({
		
		model:App.Models.GoodsItem,
		initialize: function () {
		
			App.Events.on('newUnitsCount', this.editCount, this);
			App.Events.on('refreshGoodsPrice', this.refreshPrice, this);
		},
		editCount: function ( model, value, newPrice ) {
			model.set({ goodPrice: newPrice});
			model.set({ count: value });
			console.log(model);
		},
		refreshPrice: function (pointerModel){
			this.each( function (iterator){
				if (iterator.get('units')===pointerModel.get('name')) {
					iterator.set('goodsItemPrice', parseFloat((pointerModel.get('unitPrice')*iterator.get('count')).toFixed(2)));
					App.Events.trigger('changeGoodsPrice', iterator.get('nameGoods'));
				}
			});
		}
	
	});
	
}()); 