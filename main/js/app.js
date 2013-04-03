var App = App || {};

(function () {
	
	var Materials = new App.Collections.List;
	var addMaterial = new App.Views.AddMaterial( { collection: Materials } );
	var viewMaterials = new App.Views.List( { collection: Materials } );
	viewMaterials.render();
	$('#table_holder').html( viewMaterials.el );
	
}()); 