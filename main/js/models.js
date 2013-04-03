var App = App || {};

(function () {

	App.Models.Material = Backbone.Model.extend({ 

		material: 'empty',
		price: 0
	
	});
	
	App.Models.Unit = Backbone.Model.extend({
	
		material: '',
		count: 0
	
	});


}()); 