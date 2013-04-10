var App = App || {};

(function () {

	App.Views.UnitItem = Backbone.View.extend({
	
		tagName: 'li',
		initialize: function (){
			this.model.on( 'destroy', this.remove, this );
		},
		events: {
			'click .delete' : 'confirmRemove'
		},
		template: _.template( $('#unit-count').html() ),
		render: function () {
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
		},
		confirmRemove: function () {
			if ( confirm('Are you sure you want to delete this Unit Item?') ) {
				this.model.destroy();
				App.dbConnector.EditUnitItem( this.options.unitModel );
			}	
		},
		remove: function () {
			
			this.$el.remove();
		
		}
	
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
			var unitItemView = new App.Views.UnitItem({ model: modelUnitItem, unitModel: this.model });
			unitItemView.render();
			this.$el.append( unitItemView.el );
		}
	
	});

}());