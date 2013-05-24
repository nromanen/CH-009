var App = App || {};
(function() {
	App.Models.Unit = Backbone.Model.extend({
		defaults: function() {
			return {	
				name: 'unit',
				mcollection: '',
				unitPrice: 0,
			}
		},
		initialize: function () {
			
		},
		requestUnitDelete: function (){
			var that = this;
			var found = false;
			var foundFlag = false;
			App.Goods.each ( function (goodsModel) {
				if ( found === false ) {
					var unitsInside = goodsModel.get('goodsCollection');
					found = unitsInside.find( function (goodsItem) {
						return that.get('name') === goodsItem.get('units');					
					});

					if (found === undefined) {

						foundFlag = false;	

					} else {

						foundFlag = true;

					}
				}

			});

			return foundFlag;
		},
		deleteUnit: function (){
			App.dbConnector.deleteUnit( this.get( "name" ) );
			this.destroy();
		},
		setName: function (value){
			App.dbConnector.changeUnitName( this.get( 'name' ), value );
			this.set({ name: value });
		},
		refreshUnitPrice: function(){
			var that=this;
			that.set('unitPrice', 0);
			this.get('mcollection').each( function ( currModel ) {
				that.set('unitPrice', parseFloat (( that.get('unitPrice') + currModel.get('unitItemPrice') ).toFixed(2)) );
			});
		}
	})
		
}());