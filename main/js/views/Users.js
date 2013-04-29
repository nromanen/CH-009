var App = App || {};

(function () {

	App.HTML.Row = '<div class="row"><div class="span3"></div><div class="span6 content"></div><div class="span3"></div>';
	App.HTML.tabContentHeader = '<div id="TabContent" class="tab-content">';

    App.Views.ControlView = Backbone.View.extend({

		initialize: function (){

			$('#myTab').html("");
			$('#myTab').append( $('#navigation').html() );
			App.Events.on ( 'chooseRole', this.chooseRole, this );
			App.Events.on ( 'openCustomer', this.openCustomer, this );
			App.Events.on ( 'openAccountant', this.openAccountant, this );
			App.Events.on ( 'openEngineer', this.openEngineer, this );
			App.Events.on ( 'openStorekeeper', this.openStorekeeper, this );
			App.Events.on ( 'sendData', this.sendData, this );
		},
		events:{
			"click #showMaterial" : "showMaterials",
			"click #showUnit" : "showUnit",
			"click #showGoods" : "showGoods"
		},
		sendData: function() {

			var uniCol = JSON.stringify( App.Units );
			var matCol = JSON.stringify( App.Materials );
			var gooCol = JSON.stringify( App.Goods );

			$('.container').html('');
			$('.container').append( _.template ( $('#sendDataTmp').html() ) );
			$('.container').append( matCol + "<br><br>");
			$('.container').append(  uniCol +"<br><br>" );
			$('.container').append( gooCol +"<br><br>" );

		},
		fetchData: function() { //fetching data from json files, letter from the server

			App.Materials.fetch( { update:true} );
			App.Units.fetch( { update:true } );

			console.log( App.Units.toJSON() );
			console.log( App.Materials.toJSON() );
			console.log( JSON.stringify(App.Units) );
			console.log( JSON.stringify(App.Materials) );

			for (var i = 0; i < App.Materials.length; i++) {
				var model = App.Materials.at(i)
				App.dbConnector.addProduct ( model.get("material"), model.get("price") );
				console.log("save materials to db complete");
			};
		},
		chooseRole: function () {

			$('.container').html('');
			$('.container').append( _.template ( $('#chooseRole').html() ) );

		},
		openCustomer: function () {

			App.userRole = 'customer';
			this.renderBeginning( 'Customer' , App.userRole + 'Tab' );

			var viewProducts = new App.Views.GoodsList( { collection: App.Goods } );
			$('#TabContent').html("");
			$('#TabContent').append ( _.template ( $('#tab').html(), { 
				id      : 'products',
				active  : ' in active',
			}) ); 
			$('#products').html( viewProducts.el );

			viewProducts.render();
			$('.delete_goods').remove();
			$('.buttonPlace').html("")
			$('.goods_info').html("");

		},
		openAccountant: function () {

			App.userRole = 'accountant';
			this.renderBeginning( 'Accountant' , App.userRole + 'Tab' );

			var viewProducts = new App.Views.GoodsList( { collection: App.Goods } );
			
			$('#TabContent').append ( _.template ( $('#tab').html(), { 
				id      : 'products',
				active  : ' in active',
			}) ); 
			$('#products').append( viewProducts.el );

			viewProducts.render();
			$('.buttonPlace').html("")
			// rendering the content of the Units Tab
			var viewUnits = new App.Views.UnitsList( { collection: App.Units } );
			viewUnits.render();


			// rendering the content of the Products Tab
			var viewProducts = new App.Views.GoodsList( { collection: App.Goods } );
			
			$('#TabContent').append ( _.template ( $('#tab').html(), { 
				id      : 'products',
				active  : ' in active',
			}) ); 
			$('#products').append( viewProducts.el );

			viewProducts.render();
			$('.buttonPlace').html("")
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
			
			$('#TabContent').append ( _.template ( $('#tab').html(), { 
				id      : 'products',
				active  : ' in active',
			}) ); 

			$('#products').html( $( '#temlateGoods' ).html() );

			$('.container').append($('#addUnit2GoodsTemplate').html());
			var addGoods2 = new App.Views.AddGoods ( { collection: App.Goods } );

			
			console.log(viewProducts.el);

			$('#products').append( viewProducts.el );
			
			viewProducts.render();
			$('.buttonPlace').html($('#addUnit2GoodsButton').html());
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
			var that = this;
			$('#fetchData').bind('click', function() {
			 	that.fetchData();
			});
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
			console.log(addUnit);
			addUnit.addItem("adf");
			$('#units_holder').html( viewUnits.el );
			$( '.AddMaterialsList' ).draggable();
			$( '.AddUnitsList' ).hide();
			$( '.AddMaterialsList' ).hide();
			$( '.unit' ).each ( function () {
				$( this ).find( '.unit_info' ).hide();
			});
		},
		showGoods: function() {
		

		
			//$('#myTab').append( $('#navigation').html() );
			
			//$('#products').html( $("#temlateGoods").html() );
			

			var addGoods = new App.Views.AddGoods ( { collection: App.Goods } );
			var viewGoods = new App.Views.GoodsList( { collection: App.Goods } );
			viewGoods.render();
			
			$('#goods_holder').html( viewGoods.el );
			$( '.AddUnitsList' ).draggable();
			$( '.AddMaterialsList' ).hide();
	
		}

    });
    
}()); 
