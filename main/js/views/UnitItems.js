var App = App || {};

(function () {

	App.Views.UnitItem = Backbone.View.extend({

		tagName: 'tr',
		initialize: function (){
			this.model.on( 'destroy', this.remove, this );
			this.model.on( 'change', this.render, this);
		},
		events: {
			'click .delete' : 'confirmRemove',
			'click .editCount' : 'changeCount',
			'keypress .editMaterialCount': 'updateOnEnter',
			'blur .editMaterialCount': 'close'
		},
		template: _.template( $('#materials-row-in-unit').html() ),
		render: function () {
			var price = this.model.get( 'price' );
			if ( price === undefined ) { 
				price = '120';
				this.model.set( 'price', price );
			}
			
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );	

			this.$input = this.$('.editMaterialCount');
			this.$input.val( this.model.get( 'count' ) );
		},
		confirmRemove: function () {
			if ( confirm('Are you sure you want to delete this Unit Item?') ) {
				this.model.destroy();
				App.dbConnector.EditUnitItem( this.options.unitModel );
			}	
		},
		remove: function () {
			
			this.$el.remove();
		
		},
		changeCount: function () {
			this.$el.addClass('editingCount');
			this.$input.focus();		
		},
		close: function () {
			var value = this.$input.val().trim();
			 if ( isNaN ( value ) || value <0 || value == '') {
				this.$el.removeClass('editingCount');
				this.render();
				return;
			}	
			App.Events.trigger('newMaterialCount', this.model, value);
			App.dbConnector.changeCount( this.options.unitModel );
			this.$el.removeClass('editingCount');
			
		},
		updateOnEnter: function (e) {
			if (e.keyCode == 13) {
				this.close(); 
			}
		},
		
	
	});
	 
	App.Views.UnitItemsList = Backbone.View.extend({  // это вид коллекции
	
		tagName: 'div',
		initialize: function () {
			console.log(this.collection);
			console.log(App.Units);
			//console.log(this.collection.parse());
			console.log(_.isArray(this.collection) );
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
			this.$el.find( '#' + this.model.get( 'name' ) + '_tableRow' ).prepend( unitItemView.el );

		}
	
	});
	

	

}());