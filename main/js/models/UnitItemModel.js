var App = App || {};

(function () {
	App.Models.UnitItem = Backbone.Model.extend({
		defaults: function() {
			return {
				unitID: 1,
				material: '',
				count: 0,
				unitItemPrice: 0
			}
			
		},
		initialize: function (){

		},

		setCount: function (value){
			var that=this;
			var found = App.Materials.find( function( currentModel ) {
				return currentModel.get('material') === that.get('material');
			});
			var newprice = ( value*found.get('price') ).toFixed(2);
			newprice = parseFloat( newprice );
			this.set({ count: value, unitItemPrice: newprice });
		}
	});
}());	