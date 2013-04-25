var App = App || {};

(function () {
	
	App.Materials = new App.Collections.List;   
	App.Units = new App.Collections.Units;
	App.Goods = new App.Collections.Goods;

	App.Views.Show = new App.Views.ControlView ( { el: $( '.container' ) } );
	//App.UnitCollection = new Array(); 
	
	console.log(App.Units.models);
	App.Router1 = new App.Router();
	Backbone.history.start();
}()); 