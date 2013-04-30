var App = App || {};

(function () {

	App.Views.Unit = Backbone.View.extend({
	
		tagName: 'div',
		className: 'accordion-group',
		initialize: function () {
			this.model.on( 'change', this.render, this);
			this.model.on( 'destroy', this.unitRemoveItem, this );
		},
		events: {
			'click .unit_name' : 'unitToggle',
			'click .deleteUnit' : 'unitDeleteItem',
			'click .edit_unitItem' : 'changeUnitName',
			'keypress .edit_unit_name': 'updateOnEnter',
			'blur .edit_unit_name': 'close'
		},
		template: _.template( $('#unit-name').html() ),
		render: function () {	
			var nameTrimmed = this.model.get( 'name' ).replace(/\s/g, ''); // видаляє пробіли
			this.model.set ('hrefID', nameTrimmed);     
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );

			var newUnitItemsList = new App.Views.UnitItemsList( { collection: this.model.get( 'mcollection' ), model: this.model  } ) ;
			newUnitItemsList.render();

			console.log ( $(this) );	

			//console.log ( newUnitItemsList.el );

			//console.log ( this.$('.accordion-group') );

			this.$el.append( newUnitItemsList.el );

			//$( this.el ).append ('something');

			//this.$input = this.$('.edit_unit_name');

		},
		unitToggle: function () {
			
			this.$( '.unit_info' ).toggle();

			if ( this.$( '.unit_info' ).is( ':visible' ) === true ) {
			
				$ ( '.unit_info' ).hide();
				this.$( '.unit_info' ).show();
				
				var AddMaterialsList = new App.Views.AddMaterialsList( { collection: App.Materials, model : this.model } );

				AddMaterialsList.render();
				
				$( '.AddMaterialsList' ).html('');
				$( '.AddMaterialsList' ).append( AddMaterialsList.el );
				
				$(  '.AddMaterialsList'  ).show();	
					var positionTop = this.$( '.unit_holder' ).position().top;
					var positionLeft = this.$( '.unit_info' ).position().left + 530;
				$(  '.AddMaterialsList'  ).css ( { 'top' : positionTop,  'left' : positionLeft } ); 
				
			} else {
			
				$( '.AddMaterialsList' ).hide();
			
			}

		},
		unitDeleteItem: function() {
		
			if ( confirm('Are you sure you want to delete this Unit?') ) {
				App.Events.trigger( 'unitDelete', this.model );
			}
		
		},
		unitRemoveItem: function() {
		
			this.$el.remove();
			$('.AddMaterialsList').hide();
	
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
			App.Events.trigger('editUnitName', this.model, value);
			this.$el.removeClass('editing');
		},
		updateOnEnter: function (e) {
			if (e.keyCode == 13) {
				this.close(); 
			}
		},
		
	});
	
	App.Views.UnitsList = Backbone.View.extend({  // это вид коллекции
	
		tagName: 'div',
		className: 'accordion',
		initialize: function () {
			this.collection.on('add', this.render, this);
		},
		render: function () {
			
            this.$el.html('');
          	this.collection.each( this.addOne, this );
			return this;
			
		},
		addOne: function( modelUnit ) {
		  
			var UnitView = new App.Views.Unit({ model: modelUnit });
			this.$el.prepend( UnitView.el );
			UnitView.render();
			
			this.$el.find( '.unit_info' ).hide();

		}
	
	});

}());