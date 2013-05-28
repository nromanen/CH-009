var App = App || {};

(function () {

	App.Views.List = Backbone.View.extend({  // это вид коллекции
	
		tagName: 'table',
		className: 'table',
		initialize: function () {
			this.collection.on('add', this.addOne, this);
		},
		render: function () {
			if ( App.userRole === 'accountant' ) {
				this.$el.append( $('#tableheader-materials-accountant').html() );
			} else if ( App.userRole === 'storekeeper' ) {
				this.$el.append( $('#tableheader-materials-storekeeper').html() );
			}
			this.collection.each(this.addOne, this);
			return this;
		},
		addOne: function( modelMaterial ) {
			var MaterialView = new App.Views.Material({ model: modelMaterial });
			MaterialView.render();
			this.$el.append( MaterialView.el );
		}
	
	});

})();