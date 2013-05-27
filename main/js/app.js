var App = App || {};

(function () {
	
	App.Materials = new App.Collections.List;   
	App.Units = new App.Collections.Units;
	App.Goods = new App.Collections.Goods;
	App.Basket = new App.Collections.BasketItems;
	App.Views.Show = new App.Views.ControlView ( { el: $( '.container' ) } );
	
	location.hash = '';
	App.Router1 = new App.Router();
	Backbone.history.start({hashChange:true});
}()); 