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
			
			var newUnitCollection = new App.Collections.UnitItems([
				{
					unitID: 1,
					material: 'stone',
					count: 12	
				},
				{
					unitID: 2,
					material: 'wood',
					count: 16
				}
			]);
			
			var modelUnit = new App.Models.Unit ({
				
                uid:'',
				name: strUnit,
				mcollection: newUnitCollection
				
			});
			
			App.globalVar = modelUnit;
			
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
		events: {
			'click .unit_name' : 'unitToggle',
			'click .add_unitItem' : 'unitAddItem'
			//'ckick .delete_unitItem' : 'unitDeleteItem'
		},
		template: _.template( $('#unit-name').html() ),
		render: function () {	      
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
			var newUnitItemsList = new App.Views.UnitItemsList( { collection: this.model.get( 'mcollection' )  } ) ;
			this.$('.unit_info').append( newUnitItemsList.el );
			newUnitItemsList.render();
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
			
			App.Events.trigger( 'addUnitItem', newUnitItem );
			
			console.log ( this.model.get ( 'mcollection' ).toJSON() );
		
		}
		//unitDeleteItem: function {
		
			
		
			//App.Events.trigger( 'deleteUnitItem', UnitItem );
		
		
		
	});
	
	App.Views.UnitsList = Backbone.View.extend({  // это вид коллекции
	
		tagName: 'ul',
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
	
	App.Views.UnitItem = Backbone.View.extend({
	
		tagName: 'li',
		initialize: function (){
			//
		},
		template: _.template( $('#unit-count').html() ),
		render: function () {
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
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
	
    App.Views.ControlView = Backbone.View.extend({

		initialize: function (){
			console.log("create show all voew"); 
			this.$el.append($('#navigation').html());
			this.showUnit();
		},
		events:{
			"click #showMaterial":"showMaterials",
			"click #showUnit":"showUnit",
		},
		showMaterials: function(){
			 
			this.$el.html('');
			this.$el.append( $( '#navigation' ).html() );
			this.$el.append( $( "#temlateMaterials" ).html() );
			var addMaterial = new App.Views.AddMaterial( { collection: App.Materials } );
			var viewMaterials = new App.Views.List( { collection: App.Materials } );
			viewMaterials.render();
			$('#table_holder').html( viewMaterials.el );
			 
		},
		showUnit:function(){
		 
			this.$el.html('');
			this.$el.append( $('#navigation').html() );
			this.$el.append( $("#temlateUnits").html() );
			var addUnit = new App.Views.AddUnit ( { collection: App.Units } );
			var viewUnits = new App.Views.UnitsList( { collection: App.Units } );
			viewUnits.render();
			$('#units_holder').html( viewUnits.el );

		}
                
    });
    
}()); 