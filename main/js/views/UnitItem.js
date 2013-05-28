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
			if ( isNaN ( value ) || value <=0 || value == '' || value.length > 5) {
				this.$el.find('input').val('');
				this.$el.removeClass('editing');
				//this.render();
				return;
			};	
			this.model.setCount(value);
			this.options.unitModel.refreshUnitPrice();
			App.dbConnector.changeCount( this.options.unitModel );
			this.$el.removeClass('editing');
			
		},
		updateOnEnter: function (e) {
			if (e.keyCode == 13) {
				this.close(); 
			}
		},
		
	
	});

})();