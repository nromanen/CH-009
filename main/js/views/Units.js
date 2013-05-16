var App = App || {};

(function () {

	App.Views.Unit = Backbone.View.extend({
	
		tagName: 'div',
		className: 'accordion-group',
		initialize: function () {
			//this.model.on( 'change', this.render, this);
			this.model.on( 'change', this.unitChange, this);
			this.model.on( 'destroy', this.unitRemoveItem, this );
		},
		events: {
			'click .unit_name' : 'unitToggle',
			'click .delete_unit' : 'unitDeleteItem',
			'click .edit_right' : 'changeUnitName',
			'keypress .edit_unit_name': 'updateOnEnter',
			'blur .edit_unit_name': 'close',
			'click .add-material-to-unit' : 'inputMaterials'
		},
		template: _.template( $('#unit-name').html() ),

		render: function () {	
			var nameTrimmed = this.model.get( 'name' ).replace(/\s/g, ''); // видаляє пробіли
			this.model.set ('hrefID', nameTrimmed);     
			
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );

			var newUnitItemsList = new App.Views.UnitItemsList( { collection: this.model.get( 'mcollection' ), model: this.model  } ) ;
			newUnitItemsList.render();

			this.$el.append( newUnitItemsList.el );
			//$( this.el ).append ('something');


		},
		unitChange: function () {

			//this.render();
			//this.unitToggle();
			this.$el.find('.unit_name').html(this.model.get('name'));
			this.$el.find('.unitPrice').html('$'+this.model.get('unitPrice'));
			console.log( );
		},
		unitToggle: function () {
			
			this.$(".collapse").collapse();	

		},
		inputMaterials: function () {
			
			var AddMaterialsList = new App.Views.AddMaterialsList( { collection: App.Materials, model : this.model } );
			AddMaterialsList.render();
			$( '#materialsContainer' ).html( AddMaterialsList.el );
			$('#addMaterial2Unit').find('#myModalLabel').html('Add New Material to ' + this.model.get('name') );
			var materialsInUnit = this.model.get( 'mcollection' );
			var materialsInUnitSentence = ''; // for #addMaterial2Unit sentence
			_.each ( materialsInUnit.models, function ( unitItem ) {
				materialsInUnitSentence = materialsInUnitSentence + ', ' + unitItem.attributes.material + ' ($' + unitItem.attributes.price + ') <b>x ' + unitItem.attributes.count + '</b>';
			} )
			$('#addMaterial2Unit').find('.unit_text').html( '<b>' + this.model.get('name') + '</b> already contains: <span class="unitItems_list">' + materialsInUnitSentence.substr(2) + '</span>' );

		},
		unitDeleteItem: function() {
		
			var that = this;
			App.Goods.each ( function (goodsModel) {

				var unitsInside = goodsModel.get('goodsCollection');
				var found = unitsInside.find( function (goodsItem) {
					return that.model.get('name') === goodsItem.get('units'); 
				});

				if (found === undefined) {

					if ( confirm('Are you sure you want to delete this Unit?') ) {
						App.Events.trigger( 'unitDelete', that.model );
					}	

				} else {

					$('#newUnitBtn').after('<div class="error">You CANNOT DELETE this unit, because it is already used in Goods!</div>');
					setTimeout( function() { 
						$('.error').fadeOut('slow')
					}, 2000);

				}

			});
		
		},
		unitRemoveItem: function() {
		
			this.$el.remove();
			$('.AddMaterialsList').hide();
	
		},
		changeUnitName: function () {

			var that = this;
			App.Goods.each ( function (goodsModel) {

				var unitsInside = goodsModel.get('goodsCollection');
				var found = unitsInside.find( function (goodsItem) {
					return that.model.get('name') === goodsItem.get('units'); 
				});

				if (found === undefined) {

					that.$el.addClass('editing');
					that.$el.find('input').focus();	

				} else {

					$('#newUnitBtn').after('<div class="error">You CANNOT EDIT this name, because this unit is already used in Goods!</div>');
					setTimeout( function() { 
						$('.error').fadeOut('slow')
					}, 2000);

				}

			});

			//this.model.get('name')
			
					

		},
		close: function () {

			if ( this.$el.hasClass('editing') ) {


				var value = this.$el.find('input').val().trim();

				if ( value === this.model.get('name') ) {

					this.$el.removeClass('editing');
					return;

				} else {

					var found = this.collection.find (function (currentModel) {
						return currentModel.get('name') === value;
					});

					if ( found === undefined || found === false ) {
						App.Events.trigger('editUnitName', this.model, value);
						this.$el.removeClass('editing');
					} else if ( found !== undefined && found !== false ) {
						alert (value + ' name is already in use!');
					} else {
						this.$el.removeClass('editing');
						return;
					}

				}

			}
		
		},
		updateOnEnter: function (e) {
			console.log('update on enter');
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

			var UnitView = new App.Views.Unit({ model: modelUnit, collection: this.collection });
			this.$el.prepend( UnitView.el );
			UnitView.render();
			
			this.$el.find( '.unit_info' ).hide();

		}
	
	});

}());