requirejs.config({
	paths: {
		jquery : 'libs/jquery-min',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone-min',
		text: 'libs/text',
		listCollection : 'collections/List',
  		unitsCollection : 'collections/Units',
  		unitsItemsCollection : 'collections/UnitsItems',
  		basketItemsCollection : 'collections/BasketItems',
  		goodsCollection : 'collections/Goods',
  		goodsItemsCollection : 'collections/GoodsItems',
  		basketItemModel : 'models/BasketItem',
  		goodsItemModel : 'models/GoodsItemModel',
  		goodsModel : 'models/GoodsModel',
  		materialModel : 'models/MaterialModel',
  		unitItemModel : 'models/unitItemModel',
  		unitModel : 'models/unitModel',
  		router : 'router/router',
  		stateMachine : 'statemachin/stMachine',
  		addGoodsButtonView : 'views/AddGoodsButton',
  		addGoodsView : 'views/AddGoodsView',
  		addMaterialView : 'views/AddMaterial',
  		addMaterialListView : 'views/AddMaterialList',
  		addUnitsButtonView : 'views/AddUnitsButton',
  		addUnitsListView : 'views/AddUnitsList',
  		addUnitsView : 'views/AddUnitsView',
  		basketView : 'views/Basket',
  		basketItemsView : 'views/BasketItems',
  		goodsView : 'views/Goods',
  		goodsItemView : 'views/GoodsItem',
  		goodsItemListView : 'views/GoodsItemList',
  		listView : 'views/List',
  		materialView : 'views/Material',
  		plusMaterialView : 'views/PlusMaterial',
  		unitItemView : 'views/UnitItem',
  		unitItemsListView : 'views/UnitItemsList',
  		unitsView : 'views/Units',
  		unitsListView : 'views/UnitsList',
  		usersView : 'views/Users',
  		dbConnector : 'dbConnector',

	},
	shim : {
		jquery : {
			deps : [],
			exports: '$'
		},
		underscore : {
			deps: [],
			exports: '_'
		},
		backbone : {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		}
	}
})

define(['init'], function (initialize) {
	initialize();
});


