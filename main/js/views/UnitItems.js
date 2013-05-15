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
			'click .edit' : 'changeCount',
			'dblclick .count' : 'changeCount',
			'keypress .edit_count': 'updateOnEnter',
			'blur .edit_count': 'close'
		},
		template: _.template( $('#materials-row-in-unit').html() ),
		render: function () {
	
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );	

		},
		confirmRemove: function () {
			if ( confirm('Are you sure you want to delete this Unit Item?') ) {
				this.options.unitModel.set('unitPrice', this.options.unitModel.get('unitPrice')-this.model.get('unitItemPrice'));
				this.model.destroy();
				App.dbConnector.EditUnitItem( this.options.unitModel );
			}	
		},
		remove: function () {
			
			this.$el.remove();
		
		},
		changeCount: function () {
			this.$el.addClass('editing');
			this.$el.find('input').focus();		
		},
		close: function () {
			var value = this.$el.find('input').val().trim();
			if ( isNaN ( value ) || value <=0 || value == '') {
				this.$el.removeClass('editing');
				this.render();
				return;
			};	
			this.options.unitModel.set('unitPrice', this.options.unitModel.get('unitPrice')-this.model.get('unitItemPrice'));
			App.Events.trigger('newMaterialCount', this.model, value);
			this.options.unitModel.set('unitPrice', parseFloat( ( this.options.unitModel.get('unitPrice') + this.model.get('unitItemPrice') ).toFixed(2) ) ) ;			
			App.dbConnector.changeCount( this.options.unitModel );
			this.$el.removeClass('editing');
			
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
	

	

}());