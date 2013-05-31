requirejs.config({
	paths: {
		jquery : 'lib/jquery-min',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone-min',
		bootstrap: 'lib/boostrap/bootstrap.min',
		text: 'lib/text',
		app: 'app',
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
		addMaterialsListView : 'views/AddMaterialsList',
		addUnitsButtonView : 'views/AddUnitsButton',
		addUnitsListView : 'views/AddUnitsList',
		addUnitsView : 'views/AddUnitsView',
		basketView : 'views/Basket',
		basketItemsView : 'views/BasketItems',
    	goodsListView : 'views/GoodsList',
		goodsView : 'views/Goods',
		goodsItemView : 'views/GoodsItem',
		goodsItemsListView : 'views/GoodsItemsList',
		listView : 'views/List',
		materialView : 'views/Material',
		plusMaterialView : 'views/PlusMaterial',
		unitItemView : 'views/UnitItem',
		unitItemsListView : 'views/UnitItemsList',
    	unitPlusView : 'views/UnitPlus',
		unitsView : 'views/Units',
		unitsListView : 'views/UnitsList',
		usersView : 'views/Users',
		dbConnector : 'dbConnector'
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
		},
		bootstrap : {
			deps: ['jquery']
		} 
	}
})

define(['init', 'bootstrap'], function (initialize) {
	initialize();
});


