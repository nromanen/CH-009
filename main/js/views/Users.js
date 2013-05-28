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

			'click #loginButton' : 'loginUser',
			'click #addGoodsButton' : 'showAddGoodsView',
			'click #addUnitsButton' : 'showAddUnitsView'

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
     						
     							if(msg==='engineer'){
     							window.location.replace('/#engineer');	
     						}
     						else if(msg === 'storekeeper'){
     							window.location.replace('/#storekeeper');	

     						}else if(msg === 'accauntant'){
     						window.location.replace('/#accountant');	

     						}else{
     							alert(msg + "Error login and password")
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
			$.ajax({
   						type: "POST",
   						url: "/cgi-bin/insertJSON.py",
   						data:{materials:matCol, units:uniCol, goods:gooCol},
   							success: function(msg){
     							alert(msg);
     							   						

   							}
 					});



		},
		SaveCollectionsToDb: function() {
			for (var i = 0; i < App.Materials.length; i++) {
				var model = App.Materials.at(i)
				App.dbConnector.addProduct ( model.get("material"), model.get("price") );
				console.log("save materials to db complete");
			};

			for (var i = 0; i < App.Units.length; i++){
				var model = App.Units.at(i);
				App.dbConnector.AddUnit ( "Units", model );
				console.log("save units to db complete");
			};

		},
		fetchData: function() { //fetching data from json files, letter from the server


			function fetchMaterials(){
				$.ajax({
   						type: "POST", 
   						url: "/cgi-bin/fetch.py",
   						data:{fetchType:1},
   							success: function(msg){
     							App.Events.trigger("fetchMaterialsPostgDB", msg)
     							console.log(msg);
   							}
 					});
			};
			function fetchUnits() {
						$.ajax({
   						type: "POST",
   						url: "/cgi-bin/fetch.py",
   						data:{fetchType:2},
   							success: function(msg){
     							App.Events.trigger("fetchUnitsPostgDB", msg)
     							console.log(msg);
   							}
 					});
			};
			function fetchGoods() {
						$.ajax({
   						type: "POST",
   						url: "/cgi-bin/fetch.py",
   						data:{fetchType:3},
   							success: function(msg){
     							App.Events.trigger("fetchGoodsPostgDB", msg)
     							console.log(msg);
   							}
 					});
			};
			fetchMaterials();
			fetchUnits();
			fetchGoods()
		},
		chooseRole: function () {

			$('.container').html('');
			$('#userRole').css('display', 'none');
			//$('.container').append( _.template ( $('#chooseRole').html() ) );
			$('.container').append( _.template ( $('#loginForm').html() ) );
			$('#inputLogin').focus();
			$('#inputPassword').keypress(function (e){
				if(e.which == 13) $('#loginButton').click();
			});

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
			$('.delete').remove();
			$('.edit_right').remove();
			$('.delete_goods').remove();
			$('.delete').remove();
			$('.edit_right').remove();
			//$('#products table tr th:nth-child(3)').hide();
			//$('#products table tbody tr td:nth-child(3)').hide();
			//$('#products table tr th:nth-child(4)').hide();
			//$('#products table tbody tr td:nth-child(4)').hide();
			$('.colspan4').attr('colspan', '2');
			$('.buttonPlace').html("");
			$('#actionButton').remove();
			$('#roles').remove();

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
			// rendering the content of the Goods Tab
			var viewUnits = new App.Views.UnitsList( { collection: App.Units } );
			viewUnits.render();
			$('.delete').remove();
			$('.edit_right').remove();
			$('.delete_goods').remove();
			$('.buttonPlace').html("")
			$('#products table tr th:nth-child(3)').hide();
			$('#products table tbody tr td:nth-child(3)').hide();
			$('#products table tr th:nth-child(4)').hide();
			$('#products table tbody tr td:nth-child(4)').hide();
			$('.colspan4').attr('colspan', '2');
			$('#actionButton').remove();
			
			// rendering the content of the Units Tab
			var viewUnits = new App.Views.UnitsList( { collection: App.Units } );
			viewUnits.render();
			$('#TabContent').append ( _.template ( $('#tab').html(), { 
				id      : 'units',
				active  : '',
			}) );
			$('#units').append( viewUnits.el );
			$('.edit_right').remove();
			$('.delete_unit').remove();
			$('.edit').remove();
			$('.delete').remove();
			$('#units table tr th:nth-child(3)').hide();
			$('#units table tbody tr td:nth-child(3)').hide();
			$('#units table tr th:nth-child(4)').hide();
			$('#units table tbody tr td:nth-child(4)').hide();
			$('td a').remove();
			$('.colspan4').attr('colspan', '2');

			// rendering the content of the Materials Tab
			var viewMaterials = new App.Views.List( { collection: App.Materials } );
			viewMaterials.render();
			$('#TabContent').append ( _.template ( $('#tab').html(), { 
				id      : 'materials',
				active  : '',
			}) ); 
			$('#materials').append( viewMaterials.el );
			$('#login').html('Quit').click(function(){ window.location.replace('/#'); });
			$('#roles').remove();

		},
		openEngineer: function () {

			App.userRole = 'engineer';
			this.renderBeginning( 'Engineer' , App.userRole + 'Tab' );
			
			// rendering the content of the Products Tab			
			$('#TabContent').append ( _.template ( $('#tab').html(), { 
				id      : 'products',
				active  : ' in active',
			}) );

			var addGoodsButton = new App.Views.AddGoodsButton();
			var addGoodsView = new App.Views.AddGoodsView({ collection: App.Goods });

			$('.container').append($('#addUnit2GoodsTemplate').html()); 
			var viewProducts = new App.Views.GoodsList( { collection: App.Goods } );
			$('.buttonPlace').html( $('#addUnit2GoodsButton').html() );
			$('#addGoodsView').css({'display': 'none'});
			
			// rendering the content of the Units Tab
			
			$('#TabContent').append ( _.template ( $('#tab').html(), { 
				id      : 'units',
				active  : '',
			}) );
			
			var addUnitsButton = new App.Views.AddUnitsButton();
			var addUnitsView = new App.Views.AddUnitsView({ collection: App.Units });


			$('.container').append( $('#addMaterial2UnitModal').html() );
			
			$('#units').append( $( '#addNewUnitButton' ).html() );
			$('#units').append( $( '#addNewUnitModal' ).html() );

			$('#units').append( $( '#addMaterial2UnitModal' ).html() );
			//var addNewUnits = new App.Views.AddUnit( { collection: App.Materials } );
			var viewUnits = new App.Views.UnitsList( { collection: App.Units } );
			viewUnits.render();
			$('#units').append( viewUnits.el );
			$('#addUnitsView').css({'display': 'none'});
			$('#login').html('Quit').click(function(){ window.location.replace('/#'); });
			$('#roles').remove();

		},
		openStorekeeper: function () {

			App.userRole = 'storekeeper';
			this.renderBeginning( 'Storekeeper' , App.userRole + 'Tab' );

			// rendering content of the Materials Tab
			$('#TabContent').append( $( '#addNewMaterialButton' ).html() );
			$('#TabContent').append( $( '#addNewMaterialModal' ).html() );

			$('#addNewMaterial').on('shown', function () {
			    $('#addNewMaterial').find('#material').focus();
			});

			var addNewMaterials = new App.Views.AddMaterial( { collection: App.Materials } );
			var viewMaterials = new App.Views.List( { collection: App.Materials } );
			viewMaterials.render();
			
			$('#TabContent').append ( _.template ( $('#tab').html(), { 
				id      : 'materials',
				active  : ' in active',
			}) ); 
			$('#materials').append( viewMaterials.el );
			$('#login').html('Quit').click(function(){ window.location.replace('/#'); });
			$('#roles').remove();

			
		},
		renderBeginning: function ( userName, tabName ) {

			var that = this;
			$('.container-navbar').html(''); 
			$('.container-navbar').append ( _.template ( $('#navbar').html(), { user : userName } ) );

			$('#fetchData').bind('click', function() { that.fetchData(); });
			$('#clearDB').bind('click', function() { that.clearDB(); });
			$('#saveCollectionsToDb').bind('click', function() { that.SaveCollectionsToDb(); });
			$('#login').bind('click', function() { that.chooseRole() });

			$('.container').html('');  //empty main container 
			$('.container').append( App.HTML.Row );
			$('.content').append( $('#' + tabName ).html() );
			$('.content').append( App.HTML.tabContentHeader );

		},
		showAddGoodsView: function () {
			 console.log('test');
			 $('#addGoodsView').show();
		},
		showAddUnitsView: function() {
			$('addUnitsView').show();
		}


    });
    
}()); 
