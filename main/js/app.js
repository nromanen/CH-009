var App = App || {};

//(function () {
	
	var Materials = new App.Collections.List;
	var addMaterial = new App.Views.AddMaterial( { collection: Materials } );
	var Units = new App.Collections.Units;
	var addUnit = new App.Views.AddUnit ( { collection: Units } );
	var viewUnits = new App.Views.UnitsList( { collection: Units } );
	var viewMaterials = new App.Views.List( { collection: Materials } );
	viewMaterials.render();
	viewUnits.render();
	$('#table_holder').html( viewMaterials.el );
	$('#units_holder').html( viewUnits.el );
	
//}()); 