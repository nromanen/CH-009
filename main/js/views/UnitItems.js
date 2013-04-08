var App = App || {};

(function () {

	App.Views.UnitItem = Backbone.View.extend({
	
		tagName: 'li',
		initialize: function (){
			//
		},
		template: _.template( $('#unit-count').html() ),
		render: function () {
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
		},
	
	});
	
	App.Views.UnitItemsList = Backbone.View.extend({  // это вид коллекции
	
		tagName: 'ul',
		initialize: function () {
			this.collection.on('add', this.addOne, this);
		},
		render: function () {
			this.collection.each(this.addOne, this);
			return this;
		},
		addOne: function( modelUnitItem ) {
			var unitItemView = new App.Views.UnitItem({ model: modelUnitItem });
			unitItemView.render();
			this.$el.append( unitItemView.el );
		}
	
	});

}());