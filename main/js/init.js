define([
  'backbone',
  'router',
  'app', 
  'usersView',
  'stateMachine',
  'materialModel',
  'unitModel',
  'unitItemModel',
  'goodsModel',
  'goodsItemModel',
  'basketItemModel',
  'basketItemsCollection',
  'goodsCollection',
  'goodsItemsCollection',
  'listCollection',
  'unitsCollection',
  'unitsItemsCollection'

], function(Backbone, Router, App, usersView,
  stateMachine, materialModel, unitModel, unitItemModel, 
  goodsModel, goodsItemModel, basketItemModel, basketItemsCollection,
  goodsCollection, goodsItemsCollection, listCollection, unitsCollection,
  unitsItemsCollection){

  var init = function() {

    console.log('Hello World: ' + App);

    //App.dbConnector = dbConnector;
    App.StateMachine = stateMachine;

    //Models
    App.Models.Material = materialModel;
    App.Models.Unit = unitModel;
    App.Models.UnitItem = unitItemModel;
    App.Models.Goods = goodsModel;
    App.Models.GoodsItem = goodsItemModel;
    App.Models.BasketItem = basketItemModel;

    //Collections
    App.Collections.BasketItems = basketItemsCollection;
    App.Collections.Goods = goodsCollection;
    App.Collections.GoodsItems = goodsItemsCollection;
    App.Collections.List = listCollection;
    App.Collections.Units = unitsCollection;
    App.Collections.UnitItems = unitsItemsCollection;

    //getting actual Views...
    App.Materials = new App.Collections.List; 
    App.Units = new App.Collections.Units;
    App.Goods = new App.Collections.Goods;
    App.Basket = new App.Collections.BasketItems;
    App.Views.Show = new usersView;

    location.hash = '';
    new Router();
    Backbone.history.start({ hashChange:true });   

  }

  return init;

});