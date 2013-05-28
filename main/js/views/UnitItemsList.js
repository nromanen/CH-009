var App = App || {};

(function () {

	App.Views.UnitItemsList = Backbone.View.extend({  // это вид коллекции
	
		tagName: 'div',
		initialize: function () {
			
			this.collection.on('add', this.addOne, this);	
			this.el.id = this.model.get( 'name' ).replace(/\s/g, ''); // надає ім'я id без пробілів
			
		},
		className: 'accordion-body collapse',
		template: _.template( $('#materials-table').html() ),
		render: function () {

			var strTemplate = this.template( this.model.toJSON() );

			this.$el.html ( strTemplate  );
			this.collection.each(this.addOne, this);
			return this;
			
		},
		addOne: function( modelUnitItem ) {

			var unitItemView = new App.Views.UnitItem({ model: modelUnitItem, unitModel: this.model });
			unitItemView.render();
			this.$el.find( '#' + this.model.get( 'hrefID' ) + '_tableRow' ).prepend( unitItemView.el );

		}
	
	});

})();