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
			"click #loginButton":"loginUser",
			"click #showMaterial" : "showMaterials",
			"click #showUnit" : "showUnit",
			"click #showGoods" : "showGoods"
		},
		loginUser: function(){
				var userDate = [];
				userDate['login'] = $('#inputLogin').val();
				userDate['password']= $('#inputPassword').val();
				console.log(userDate);

					$.ajax({
   						type: "POST",
   						url: "/cgi-bin/login.py",
   						data:{login:userDate['login'], password:userDate['password']},
   							success: function(msg){
     							alert( "Data Saved: " + msg );
     							if(msg==='engenir'){
     							window.location.replace('/#engineer');	
     						}else{
     							alert(msg + "Логін і пароль не коректний")
     							window.location.replace('/#customer');
     						}


   							}
 					});

			



		},
		clearDB: function() {

			App.dbConnector.deleteDatabase();
			window.location.reload()

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


			function fetchMaterials(){
				var mat = App.Materials.fetch( { update: true } );
				mat ? console.log("materials fetch done") : console.log("materials fetch failed");

				for (var i = 0; i < App.Materials.length; i++) {
					var model = App.Materials.at(i)
					App.dbConnector.addProduct ( model.get("material"), model.get("price") );
					console.log("save materials to db complete");
				};
			};

			function fetchUnits() {
				var uni = App.Units.fetch( { update: true } );
				uni ? console.log("units fetch done") : console.log("units fetch failed");
				for (var i = 0; i < App.Units.length; i++){
					var model = App.Units.at(i);
					App.dbConnector.AddUnit ( "Units", model );
					console.log("save units to db complete");
				}

			};

			fetchMaterials();
			//fetchUnits();
			
			/*console.log( App.Units.toJSON() );
			console.log( App.Materials.toJSON() );
			console.log( JSON.stringify(App.Units) );
			console.log( JSON.stringify(App.Materials) );*/

		},
		chooseRole: function () {

			$('.container').html('');
			//$('.container').append( _.template ( $('#chooseRole').html() ) );
			$('.container').append( _.template ( $('#loginForm').html() ) );

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

		//	viewProducts.render();
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

			$('#products').append( viewProducts.el );
			
			viewProducts.render();
			$('.buttonPlace').html( $('#addUnit2GoodsButton').html() );

			// rendering the content of the Units Tab
			var viewUnits = new App.Views.UnitsList( { collection: App.Units } );
			viewUnits.render();
			$('#TabContent').append ( _.template ( $('#tab').html(), { 
				id      : 'units',
				active  : '',
			}) );
			$('#units').append( $( '#addNewUnitButton' ).html() );
			$('#units').append( $( '#addNewUnitModal' ).html() );
			$('#units').append( $( '#addMaterial2UnitModal' ).html() );
			var addNewUnits = new App.Views.AddUnit( { collection: App.Materials } );
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
			var that = this;
			$('.container-navbar').html(''); 
			$('.container-navbar').append ( _.template ( $('#navbar').html(), { user : userName } ) );

			$('#fetchData').bind('click', function() { that.fetchData(); });
			$('#clearDB').bind('click', function() { that.clearDB(); });

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
