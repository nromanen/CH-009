var App = App || {};

(function () {

	App.HTML.Row = '<div class="row"><div class="span3"></div><div class="span6 content"></div><div class="span3"></div>';
	App.HTML.tabContentHeader = '<div id="TabContent" class="tab-content">';

    App.Views.ControlView = Backbone.View.extend({

		initialize: function (){
			App.Events.on ( 'chooseRole', this.chooseRole, this );
			App.Events.on ( 'openCustomer', this.openCustomer, this );
			App.Events.on ( 'openAccountant', this.openAccountant, this );
			App.Events.on ( 'openEngineer', this.openEngineer, this );
			App.Events.on ( 'openStorekeeper', this.openStorekeeper, this );
		},
		events:{
			//
		},
		chooseRole: function () {

			$('.container').html('');
			$('.container').append( _.template ( $('#chooseRole').html() ) );

		},
		openCustomer: function () {

			App.userRole = 'customer';
			this.renderBeginning( 'Customer' , App.userRole + 'Tab' );

		},
		openAccountant: function () {

			App.userRole = 'accountant';
			this.renderBeginning( 'Accountant' , App.userRole + 'Tab' );

			// rendering the content of the Products Tab
			var viewProducts = new App.Views.GoodsList( { collection: App.Goods } );
			viewProducts.render();
			$('#TabContent').append ( _.template ( $('#tab').html(), { 
				id      : 'products',
				active  : ' in active',
			}) ); 
			$('#products').append( viewProducts.el );

			// rendering the content of the Units Tab
			var viewUnits = new App.Views.UnitsList( { collection: App.Units } );
			viewUnits.render();
			$('#TabContent').append ( _.template ( $('#tab').html(), { 
				id      : 'units',
				active  : '',
			}) );
			$('#units').append( viewUnits.el );

			// rendering the content of the Materials Tab
			var viewMaterials = new App.Views.List( { collection: App.Materials } );
			viewMaterials.render();
			$('#TabContent').append ( _.template ( $('#tab').html(), { 
				id      : 'materials',
				active  : '',
			}) ); 
			$('#materials').append( viewMaterials.el )
	

		},
		openEngineer: function () {

			App.userRole = 'engineer';
			this.renderBeginning( 'Engineer' , App.userRole + 'Tab' );

			// rendering the content of the Products Tab
			var viewProducts = new App.Views.GoodsList( { collection: App.Goods } );
			viewProducts.render();
			$('#TabContent').append ( _.template ( $('#tab').html(), { 
				id      : 'products',
				active  : ' in active',
			}) ); 
			$('#products').append( viewProducts.el );

			// rendering the content of the Units Tab
			var viewUnits = new App.Views.UnitsList( { collection: App.Units } );
			viewUnits.render();
			$('#TabContent').append ( _.template ( $('#tab').html(), { 
				id      : 'units',
				active  : '',
			}) );
			$('#units').append( viewUnits.el );


		},
		openStorekeeper: function () {

			App.userRole = 'storekeeper';
			this.renderBeginning( 'Storekeeper' , App.userRole + 'Tab' );

			// rendering content of the Materials Tab
			$('#TabContent').append( $( '#addNewMaterialButton' ).html() );
			$('#TabContent').append( $( '#addNewMaterialModal' ).html() );

			var addNewMaterials = new App.Views.AddMaterial( { collection: App.Materials } );
			var viewMaterials = new App.Views.List( { collection: App.Materials } );
			viewMaterials.render();
			
			$('#TabContent').append ( _.template ( $('#tab').html(), { 
				id      : 'materials',
				active  : ' in active',
			}) ); 
			$('#materials').append( viewMaterials.el )


		},
		renderBeginning: function ( userName, tabName ) {

			$('.container-navbar').html(''); 
			$('.container-navbar').append ( _.template ( $('#navbar').html(), { user : userName } ) );
			$('.container').html('');  //empty main container 
			$('.container').append( App.HTML.Row );
			$('.content').append( $('#' + tabName ).html() );
			$('.content').append( App.HTML.tabContentHeader );

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
