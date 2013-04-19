var App = App || {};

(function () {
	
	App.Materials = new App.Collections.List;   
	App.Units = new App.Collections.Units;
	App.Goods = new App.Collections.Goods;
	App.Views.Show = new App.Views.ControlView ( { el: $( '#content' ) } );
	App.UnitCollection = new Array(); 
	
	console.log( App.Materials );
	console.log( App.Units );
	console.log(JSON.stringify(App.Materials));
}()); 