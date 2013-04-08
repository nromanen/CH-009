var App = App || {};

(function () {

	App.Views.Unit = Backbone.View.extend({
	
		tagName: 'li',
		initialize: function () {
			this.model.on( 'change', this.render, this);
			this.model.on( 'destroy', this.unitRemoveItem, this );
			
		},
		className: 'unit',
		events: {
			'click .unit_name' : 'unitToggle',
			'click .add_unitItem' : 'unitAddItem',
			'click .deleteUnit' : 'unitDeleteItem',
			'click .edit_unitItem ' : 'changeUnitName',
			'keypress .edit_unit_name': 'updateOnEnter',
			'blur .edit_unit_name': 'close'
		},
		template: _.template( $('#unit-name').html() ),
		render: function () {	      
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
			
			var newUnitItemsList = new App.Views.UnitItemsList( { collection: this.model.get( 'mcollection' )  } ) ;
			this.$('.unit_info').append( newUnitItemsList.el );
			newUnitItemsList.render();
			
			//var viewMaterials = new App.Views.AddMaterialsList( { collection: App.Materials, model : this.model	} );

			//viewMaterials.render();
			//$('.materials_holder').html('');
			//$('.materials_holder') .append( viewMaterials.el );
			this.$input = this.$('.edit_unit_name');
		}, 
		unitToggle: function () {
			
			this.$('.unit_info').toggle();
			
		},
		unitAddItem: function () {
		
			var newUnitItem = new App.Models.UnitItem({
				
				unitID: 1,
				material: 'material',
				count: 12
				
			});

			var MaterialCollection = this.model.get ( 'mcollection' );
			MaterialCollection.add ( newUnitItem );
		
		},
		unitDeleteItem: function() {
		
			App.Events.trigger( 'unitDelete', this.model );
		
		},
		unitRemoveItem: function() {
		
			this.$el.remove();
	
		},
		changeUnitName: function () {
			this.$el.addClass('editing');
			this.$input.focus();
			
		},
		close: function () {
			var value = this.$input.val().trim();
			
			if ( value =='' ) {
			this.$el.removeClass('editing');
			return;
			};
			if  ( ! value ) {
			this.$el.removeClass('editing');
			return;
			}
			this.model.set({ name: value });
			this.$el.removeClass('editing');
		},
		updateOnEnter: function (e) {
			if (e.keyCode == 13) {
				this.close(); 
			}
		},
		
	});
	
	App.Views.UnitsList = Backbone.View.extend({  // это вид коллекции
	
		tagName: 'ul',
		className: 'units',
		initialize: function () {
			this.collection.on('add', this.render, this);
		},
		render: function () {
			
            this.$el.html('');
            console.log( this.collection );
          	this.collection.each( this.addOne, this );
			return this;
			
		},
		addOne: function( modelUnit ) {
		  
			var UnitView = new App.Views.Unit({ model: modelUnit });
			this.$el.prepend( UnitView.el );
			UnitView.render();
			
		}
	
	});

}());