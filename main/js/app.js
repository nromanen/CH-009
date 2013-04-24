var App = App || {};

(function () {
	
	App.Materials = new App.Collections.List;   
	App.Units = new App.Collections.Units;
	App.Goods = new App.Collections.Goods;
	App.Views.Show = new App.Views.ControlView ( { el: $( '.container-fluid' ) } );
	//App.UnitCollection = new Array(); 
	
	new App.Router;
	Backbone.history.start();

}()); 