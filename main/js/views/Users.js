var App = App || {};

(function () {

    App.Views.ControlView = Backbone.View.extend({

		initialize: function (){
			this.$el.append($('#navigation').html());
			this.showUnit();
		},
		events:{
			"click #showMaterial" : "showMaterials",
			"click #showUnit" : "showUnit",
			"click #showGoods" : "showGoods",
			"click #fetchMaterials" : "fetchMaterials"
		},
		fetchMaterials: function() {

			App.Materials.fetch({ update:true } );
			console.log( App.Materials );

		},
		showMaterials: function() {
			 
			this.$el.html('');
			this.$el.append( $( '#navigation' ).html() );
			this.$el.append( $( "#temlateMaterials" ).html() );
			var addMaterial = new App.Views.AddMaterial( { collection: App.Materials } );
			var viewMaterials = new App.Views.List( { collection: App.Materials } );
			viewMaterials.render();
			$('#table_holder').html( viewMaterials.el );
			$( '.AddMaterialsList' ).hide();
			
		},
		showUnit: function() {
		 
			this.$el.html('');
			this.$el.append( $('#navigation').html() );
			this.$el.append( $("#temlateUnits").html() );
			var addUnit = new App.Views.AddUnit ( { collection: App.Units } );
			var viewUnits = new App.Views.UnitsList( { collection: App.Units } );
			viewUnits.render();
			$('#units_holder').html( viewUnits.el );
			$( '.AddMaterialsList' ).draggable();
			$( '.AddUnitsList' ).hide();
			$( '.AddMaterialsList' ).hide();
			$( '.unit' ).each ( function () {
				$( this ).find( '.unit_info' ).hide();
			});
		},
		showGoods: function() {
		
			this.$el.html('');
			this.$el.append( $('#navigation').html() );
			this.$el.append( $("#temlateGoods").html() );
			var addGoods = new App.Views.AddGoods ( { collection: App.Goods } );
			var viewGoods = new App.Views.GoodsList( { collection: App.Goods } );
			viewGoods.render();
			
			$('#goods_holder').html( viewGoods.el );
			$( '.AddUnitsList' ).draggable();
			$( '.AddMaterialsList' ).hide();
			
			
		}
                
    });
    
}()); 
