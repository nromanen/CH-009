define([
  'backbone',
  'router',
  'app', 
  'listCollection',
  'unitsCollection',
  'basketItemsCollection',
  'goodsCollection',
  'usersView'

], function(Backbone, Router, App, listCollection, unitsCollection, 
  basketItemsCollection, goodsCollection, usersView){

  var App = App || {};

  var init = function() {

    App.Materials = new listCollection;   
    App.Units = new unitsCollection;
    App.Goods = new goodsCollection;
    App.Basket = new basketItemsCollection;
    App.Views.Show = new usersView;

    location.hash = '';
    new App.Router();
    Backbone.history.start({ hashChange:true });   

  }

  return init;

});