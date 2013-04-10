var App = App || {};

(function () {

	App.Views.UnitItem = Backbone.View.extend({
	
		tagName: 'li',
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
		template: _.template( $('#unit-count').html() ),
		render: function () {
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
			this.$input = this.$('.editMaterialCount');
		},
		confirmRemove: function () {
			if ( confirm('Вы действительно хотите удалить данную запись?') ) {
				App.Events.trigger( 'destroyItemModel', this.model );  
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
			if ( value =='' ) {
			this.$el.removeClass('editingCount');
			return;
			};
			if  ( ! value ) {
			this.$el.removeClass('editingCount');
			return;
			}
			App.Events.trigger('newMaterialCount', this.model, value);
			this.$el.removeClass('editingCount');
		},
		updateOnEnter: function (e) {
			if (e.keyCode == 13) {
				this.close(); 
			}
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