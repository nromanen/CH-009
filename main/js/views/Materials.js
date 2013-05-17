var App = App || {};
	
(function () {
	
	App.Views.Material = Backbone.View.extend({ // это вид модели
		tagName: 'tr',
		initialize: function () {
			//this.model.on('change:material', this.render, this);
			this.model.on('change:price', this.changeUnitItemPrice, this);
			this.model.on( 'destroy', this.remove, this );
		},
		events: {
			'click .delete' : 'confirmRemove',
			'click .edit' : 'edit',
			'blur .editPrice' : 'saveNewPrice'
		},
		render: function () {
			
			if ( App.userRole === 'accountant' ) {
				var Template = _.template( $('#materials-accountant').html(), this.model.toJSON() );
			} else if ( App.userRole === 'storekeeper' ) {
				var Template = _.template( $('#materials-storekeeper').html(), this.model.toJSON() );
			}
			
			this.$el.html( Template );
		},
		edit: function () {
			this.$el.addClass('editing');
			this.$el.find('input').focus();
		},
		saveNewPrice : function () {
			var value = this.$el.find('input').val();
			if ( isNaN ( value ) || value <0 || value == '') {
				this.$el.removeClass('editing');
				return;
			} else {
				this.$el.removeClass('editing');
				this.model.set('price', value);
				App.dbConnector.changeMaterialPrice( this.model );
				this.render();
			}
		},
		changeUnitItemPrice: function (){
			App.Events.trigger('changeUnitItemPrice', this.model);
		},
		confirmRemove: function () {
			var delMat = this.model.get("material");
			var unitModels = App.Units.models;

			for(var i = 0; i < unitModels.length; i++ ) {
				var arr = unitModels[i].get("mcollection").toJSON();

				for (var j = 0; j < arr.length; j++) {

					if (arr[j].material === delMat) {

						$('#NewMaterialButton').after('<div class="error">Attention! This material is used in unit: ' + unitModels[i].get("name") + '</div>');
						
					};
				};
			};
			
			if ( confirm('Are you sure you want to delete this product?') ) {
				App.Events.trigger( 'destroyModel', this.model );
			};

			$('#TabContent').find('.error').remove(); //detele eror message after confirm  
		},
		remove: function () {
		
			this.$el.remove();
		
		}
	});
	
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
	
	App.Views.AddMaterial = Backbone.View.extend({
		el: '#addNewMaterial',
		events: {
			'keypress input' : 'inputKeypress',
			'click .save-material' : 'validateItem'
		},

		inputKeypress: function(e) {
			if (e.which === 13) {
				this.validateItem();
			}
		},
		validateItem: function () {

			this.$el.find('.error').remove();
			var strMaterial = $('#material').val().trim(); 	
			var strPrice = $('#price').val().trim();
			

			if ( strMaterial === "" ) {

				$('#myModalLabel').after('<div class="error">Write name</div>');
				$('#material').val('');
				$('#material').focus();
				return false;
			}
			
			for ( var i = 0; i < this.collection.length; i++ ) {
				
				if ( strMaterial === this.collection.models[i].get ( 'material' ) ) {

					$('#myModalLabel').after('<div class="error">Material named ' + strMaterial + ' already exists! There should be NO material names repeated!</div>');
					$('#material').focus();
					return false;
					
				}
				
			}
			
			if ( isNaN( strPrice ) || strPrice < 0 || strPrice === "" )  {
			
				$('#myModalLabel').after('<div class="error">Price is incorrectly indicated!</div>');
				$('#price').val('');
				$('#price').focus();
				return false;
			
			}
			
			$('.close-addNewMaterial').click();
			this.addItem ( strMaterial, strPrice );
		
		},
		addItem: function( strMaterial, strPrice ) {
			
			var modelMaterial = new App.Models.Material({ 
				material: strMaterial, 
				price: parseInt(strPrice) 
			});
			
			App.Events.trigger( 'addModel', modelMaterial );
			
			this.clearTextBoxes();
		},
		clearTextBoxes: function() {
			$('#material').val('');
			$('#price').val('');
			$('#material').focus();
		}
	});	
	
}());