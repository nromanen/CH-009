var App = App || {};

(function () {
	
	var Materials = new App.Collections.List;   
	var Units = new App.Collections.Units;
	App.Views.Show = new App.Views.ControlView ( { el: $( '#content' ) } );
	var addMaterial = new App.Views.AddMaterial( { collection: Materials } );
	var viewMaterials = new App.Views.List( { collection: Materials } );
	viewMaterials.render();
	$('#table_holder').html( viewMaterials.el );
	var addUnit = new App.Views.AddUnit ( { collection: Units } );
	var viewUnits = new App.Views.UnitsList( { collection: Units } );
	viewUnits.render();
	$('#units_holder').html( viewUnits.el );

}()); 