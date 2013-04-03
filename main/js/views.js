var App = App || {};

(function () {

	App.Views.Material = Backbone.View.extend({ // это вид модели
		tagName: 'li',
		initialize: function () {
			//this.model.on('change:material', this.render, this);
			//this.model.on('change:price', this.render, this);
			this.model.on( 'destroy', this.remove, this );
		},
		events: {
			'click .delete' : 'confirmRemove'
		},
		template: _.template( $('#material-price').html() ),
		render: function () {
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
		},
		confirmRemove: function () {
			if ( confirm('Вы действительно хотите удалить данную запись?') ) {
				App.Events.trigger( 'destroyModel', this.model );  
			}	
		},
		remove: function () {
		
			this.$el.remove();
		
		}
	});
	
	App.Views.List = Backbone.View.extend({  // это вид коллекции
	
		tagName: 'ul',
		initialize: function () {
			this.collection.on('add', this.addOne, this);
		},
		render: function () {
			this.collection.each(this.addOne, this);
			return this;
		},
		addOne: function(modelMaterial) {
			var MaterialView = new App.Views.Material({ model: modelMaterial });
			MaterialView.render();
			this.$el.append( MaterialView.el );
		}
	
	});
	
	App.Views.AddMaterial = Backbone.View.extend({
		el: '#addMaterial',
		tagName: 'addMaterial',
		events: {
			'keypress input': 'inputKeypress',
		},
		inputKeypress: function(e) {
			if (e.which === 13) {
				this.validateItem();
			}
		},
		validateItem: function () {
		
			var strMaterial = $('#material').val().trim(); 	
			var strPrice = $('#price').val().trim();
			
			if ( strMaterial === "" ) {
				alert ( 'Пожалуйста, введите имя материала!' );
				$('#material').val('');
				$('#material').focus();
				return false;
			}
			
			for ( var i = 0; i < this.collection.length; i++ ) {
				
				if ( strMaterial === this.collection.models[i].get ( 'material' ) ) {
					
					alert ( 'Материал ' + strMaterial + ' уже существует! Повторений НЕ должно быть!' );
					$('#material').focus();
					return false;
					
				}
				
			}
			
			if ( isNaN( strPrice ) || strPrice < 0 )  {
			
				alert ( 'Цена указана неверно!' );
				$('#price').focus();
				return false;
			
			}
			
			this.addItem ( strMaterial, strPrice );
		
		},
		addItem: function( strMaterial, strPrice ) {
			
			var modelMaterial = new App.Models.Material({ 
				material: strMaterial, 
				price: strPrice 
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
	
	App.Views.Block = Backbone.View.extend({
	
		
	
	});
	
	App.Views.AddUnit = Backbone.View.extend({
		el: '#addUnit',
		tagName: 'addUnit',
		events: {
			'keypress input': 'inputKeypress',
		},
		inputKeypress: function(e) {
			if (e.which === 13) {
				console.log('key on units is pressed!');
				this.validateItem();
			}
		},
		validateItem: function () {
		
			var strUnit = $('#unit').val().trim(); 	
			
			if ( strUnit === "" ) {
				alert ( 'Пожалуйста, введите имя Юнита!' );
				$('#unit').val('');
				$('#unit').focus();
				return false;
			}
			console.log('item validated');
			this.addItem ( strUnit );
		
		},
		addItem: function( strUnit ) {
			
			var modelUnit = new App.Models.Unit ({
				
				id: 1,
				name: strUnit
				
			});
			console.log('sending trigger');
			App.Events.trigger( 'addUnit', modelUnit );
			console.log('trigger sent');
			this.clearTextBoxes();
		},
		clearTextBoxes: function() {
			$('#unit').val('');
			$('#unit').focus();
		}
	});
	
	
	App.Views.Unit = Backbone.View.extend({
	
		tagName: 'li',
		initialize: function () {
			//initialize
		},
		template: _.template( $('#unit-name').html() ),
		render: function () {
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
		} 
	
	});
	
	App.Views.UnitsList = Backbone.View.extend({  // это вид коллекции
	
		tagName: 'ul',
		initialize: function () {
			this.collection.on('add', this.render, this);
		},
		render: function () {
			
			//var strTemplate = this.template( { id: 1, name: 'something' } );
			//this.$el.html( strTemplate );
			//$('#units_holder').html( strTemplate );
			this.collection.each( this.addOne, this );
			return this;
		},
		addOne: function( modelUnit ) {
			var UnitView = new App.Views.Unit({ model: modelUnit });
			UnitView.render();
			this.$el.append( UnitView.el );
		}
	
	});
	

}()); 