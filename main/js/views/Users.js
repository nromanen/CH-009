var App = App || {};

(function () {

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