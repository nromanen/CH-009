define([
	'backbone',
	'app'
], function(Backbone, App) {

	var App = App || {};
	
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
					
					App.Units.each( function (unit) {
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

	return App.Collections.Goods;

});