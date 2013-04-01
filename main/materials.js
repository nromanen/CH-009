var App = App || {};
var dbConnector = dbConnector || {};

(function () {
	
	// создаем пространство имен (NameSpace)
	
	App = {
	
		Models: {},
		Views: {},
		Collections: {},
		Events : _.extend( {}, Backbone.Events )
	
	};
	
	App.Models.Material = Backbone.Model.extend({ 

		material: 'empty',
		price: 0
	
	});
	
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
	
	App.Collections.List = Backbone.Collection.extend({
		model: App.Models.Material,
		initialize: function () {
			
			App.Events.on( 'destroyModel', this.destroyModel, this );
			App.Events.on( 'addModel', this.addModel, this );
			App.Events.on( 'fetchProducts', this.fetchProducts, this );
			App.Events.on( 'writeProducts', this.writeProducts, this );
			
			dbConnector.openDatabase();
			
		},
		fetchProducts: function () {
			
			dbConnector.fetchAll();
			
		},
		writeProducts: function ( products ) {
		
			for ( var i=0; i<=products.length-1; i++ )
			{   
			
				var strMaterial = new App.Models.Material({ 
					material: products[i].material, 
					price: products[i].price 
				});
				this.add ( strMaterial );
				
			}
			
		},
		destroyModel: function ( model ) {
			
			dbConnector.deleteProduct( model.attributes.material );
			model.destroy();
			
		},
		addModel: function ( model ) {
		  alert(model.get("material") + model.get("price"));
			this.add( model );
			dbConnector.addProduct ( model.get("material"), model.get("price"));
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
				
				if ( strMaterial === this.collection.models[i].attributes.material ) {
					
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
	
	var Materials = new App.Collections.List;
	var addMaterial = new App.Views.AddMaterial( { collection: Materials } );
	var viewMaterials = new App.Views.List( { collection: Materials } );
	viewMaterials.render();
	$('#table_holder').html( viewMaterials.el );
	
}()); 




