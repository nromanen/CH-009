define([
	'jquery',
	'underscore',
	'backbone',
	'app',
	'listView',
	'addMaterialView',
	'unitsListView',
	'addUnitsView',
	'addUnitsButtonView',
	'goodsListView',
	'addGoodsView',
	'addGoodsButtonView',
	'accountantFilterView',
	'text!../templates/tab.html',
	'text!../templates/userTabs.html',
	'text!../templates/addUnit2GoodsButton.html',
	'text!../templates/loginForm.html',
	'text!../templates/addNewMaterialModal.html',
	'text!../templates/addUnit2GoodsModal.html',
	'text!../templates/addMaterial2UnitModal.html',
	'text!../templates/addNewUnitModal.html',
	'text!../templates/addNewMaterialButton.html'

], function(
	$,
	_,
	Backbone,
	App,
	listView,
	addMaterialView,
	unitsListView,
	addUnitsView,
	addUnitsButtonView,
	goodsListView,
	addGoodsView,
	addGoodsButtonView,
	accountantFilterView,
	tabTemplate,
	userTabsTemplate,
	addUnit2GoodsButtonTemplate,
	loginFormTemplate,
	addNewMaterialModalTemplate,
	addUnit2GoodsModalTemplate,
	addMaterial2UnitModalTemplate,
	addNewUnitModalTemplate,
	addNewMaterialButtonTemplate
	) {

	var Users = Backbone.View.extend({

		initialize: function() {

			$('#myTab').html("");
			App.Events.on ( 'chooseRole', this.chooseRole, this );
			App.Events.on ( 'openCustomer', this.openCustomer, this );
			App.Events.on ( 'openAccountant', this.openAccountant, this );
			App.Events.on ( 'openEngineer', this.openEngineer, this );
			App.Events.on ( 'openStorekeeper', this.openStorekeeper, this );
			App.Events.on ( 'sendData', this.sendData, this );

		},
		el: $( '.container' ),
		events:{

			'click #loginButton' : 'loginUser',
			'click #addGoodsButton' : 'showAddGoodsView',
			'click #addUnitsButton' : 'showAddUnitsView',
			'click #searchButton' : 'search'

		},
		search: function(){
			//alert('search');

			var href = $(' #myTab .active a ').attr('href');
			console.log(href);
			if( href === '#products' ){
				console.log("search in products tab!");
				goodSearch();
			}
			else if( href === '#units'){
				console.log("search in units tab!");
				unitSearch();
			}
			else if( href === '#materials' ){
				console.log("search in materials tab!");
				materialSearch();
			}

			function goodSearch(){
				String.prototype.RE = function() {
				    return this.replace(/([\$\^\*\(\)\+\[\]\{\}\|\.\/\?\\])/g, '\\$1');
				}
				var request = $('#searchInput').val();
				var myExp = new RegExp('^'+request.RE()+'','ig');
				console.log(request);
				var model = App.Goods.models;
				for (var i = 0; i < App.Goods.length; i++ ){
					$('.accordion-group:has( .goods_name_id:contains(' + model[i].get("nameG") + '))').hide();
					var result = model[i].get('nameG').search( myExp );
					if( result != -1) {

						$('.accordion-group:has( .goods_name_id:contains(' + model[i].get("nameG") + '))').show();
						console.log('hide()');
					};
				}

				/*
				var myExp = /request/g;
				regexp.test([str])
				App.Goods.models[i].get('nameG') === 'dede'
				console.log(App.Goods.length);
				//reject
				//var odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
				var elemsToHide = _.reject(App.Goods.models, function(req){
					return req.test
				})*/



			};
			function unitSearch(){
				var request = $('#searchInput').val();
				console.log(request);
				console.log( App.Units );
			};
			function materialSearch(){
				var request = $('#searchInput').val();
				console.log(request);
				console.log( App.Materials );

			}

		},
		loginUser: function(){
			var userDate = [];
			userDate['login'] = $('#inputLogin').val();
			userDate['password']= $('#inputPassword').val();
			//console.log(userDate);

				$.ajax({
						type: "POST",
						url: "/cgi-bin/login.py",
						data:{login:userDate['login'], password:userDate['password']},
							success: function(msg) {

	 						if (msg==='engineer') {
	 							window.location.replace('/#engineer');
	 						} else if (msg === 'storekeeper') {
	 							window.location.replace('/#storekeeper');
	 						} else if (msg === 'accauntant') {
	 							window.location.replace('/#accountant');
	 						} else {
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
			$('.container').append( '<h1>Send data to JSON</h1>' );
			$('.container').append( matCol + "<br><br>");
			$('.container').append( uniCol +"<br><br>" );
			$('.container').append( gooCol +"<br><br>" );
			$.ajax({
   						type: "POST",
   						url: "/cgi-bin/insertJSON.py",
   						data:{materials:matCol, units:uniCol, goods:gooCol},
   							success: function(msg) {
     							alert(msg);
   							}
 					});

		},
		SaveCollectionsToDb: function() {
			for (var i = 0; i < App.Materials.length; i++) {
				var model = App.Materials.at(i)
				App.dbConnector.addProduct ( model.get("material"), model.get("price") );
				//console.log("save materials to db complete");
			};

			for (var i = 0; i < App.Units.length; i++){
				var model = App.Units.at(i);
				App.dbConnector.AddUnit ( "Units", model );
				//console.log("save units to db complete");
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
			$('.container').append( _.template ( loginFormTemplate ) );
			$('#inputLogin').focus();
			$('#login').html('login');
			$('#inputPassword').keypress(function (e) {
				if(e.which == 13) $('#loginButton').click();
			});

		},
		openCustomer: function () {

			App.userRole = 'customer';
			this.renderBeginning( 'Customer' , App.userRole + 'Tab' );

			var viewProducts = new goodsListView( { collection: App.Goods } );
			$('#TabContent').html("");
			$('#TabContent').append ( _.template ( tabTemplate, {
				id      : 'products',
				active  : ' in active',
			}) );
			$('#products').html( viewProducts.el );

			$('#login').html('login');

			$('.delete').remove();
			$('.edit_right').remove();
			$('.delete_goods').remove();
			$('.delete').remove();
			$('.edit_right').remove();
			$('.colspan4').attr('colspan', '2');
			$('.buttonPlace').html("");
			$('#actionButton').remove();
			$('#roles').remove();

		},
		openAccountant: function () {

			App.userRole = 'accountant';
			this.renderBeginning( 'Accountant' , App.userRole + 'Tab' );

			var viewProducts = new goodsListView( { collection: App.Goods } );

			$('#TabContent').append ( _.template ( tabTemplate, {
				id      : 'products',
				active  : ' in active',
			}) );
			$('#products').append( viewProducts.el );

			viewProducts.render();
			$('.buttonPlace').html("")
			// rendering the content of the Goods Tab
			var viewUnits = new unitsListView( { collection: App.Units } );
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
			var viewUnits = new unitsListView( { collection: App.Units } );
			//var unitsFilter = new accountantFilterView( { collection: App.Units } );
			//unitsFilter.render();
			viewUnits.render();
			$('#TabContent').append ( _.template ( tabTemplate, {
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
			var viewMaterials = new listView( { collection: App.Materials } );
			viewMaterials.render();
			$('#TabContent').append ( _.template ( tabTemplate, {
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
			$('#TabContent').append ( _.template ( tabTemplate, {
				id      : 'products',
				active  : ' in active',
			}) );

			var addGoodsButton = new addGoodsButtonView();
			var addGoodsViewInstance = new addGoodsView({ collection: App.Goods });

			$('.container').append( addUnit2GoodsModalTemplate );
			var viewProducts = new goodsListView( { collection: App.Goods } );
			$('.buttonPlace').html( addUnit2GoodsButtonTemplate );
			$('#addGoodsView').css({'display': 'none'});

			// rendering the content of the Units Tab

			$('#TabContent').append ( _.template ( tabTemplate, {
				id      : 'units',
				active  : '',
			}) );

			var addUnitsButton = new addUnitsButtonView();
			var addUnitsViewInstance = new addUnitsView({ collection: App.Units });


			$('.container').append( addMaterial2UnitModalTemplate );

			$('#units').append( $( '#addNewUnitButton' ).html() );
			$('#units').append( addNewUnitModalTemplate );

			$('#units').append( addMaterial2UnitModalTemplate );
			//var addNewUnits = new App.Views.AddUnit( { collection: App.Materials } );
			var viewUnits = new unitsListView( { collection: App.Units } );
			viewUnits.render();
			$('#units').append( viewUnits.el );
			$('#addUnitsView').css({'display': 'none'});
			$('#login').html('Quit').click(function(){ window.location.replace('/#'); });
			$('#roles').remove();
			$('.headerPrice').remove();
		},
		openStorekeeper: function () {

			App.userRole = 'storekeeper';
			this.renderBeginning( 'Storekeeper' , App.userRole + 'Tab' );

			// rendering content of the Materials Tab
			$('#TabContent').append( addNewMaterialButtonTemplate );
			$('#TabContent').append( addNewMaterialModalTemplate );

			$('#addNewMaterial').on('shown', function () {
			    $('#addNewMaterial').find('#material').focus();
			});

			var addNewMaterials = new addMaterialView( { collection: App.Materials } );
			var viewMaterials = new listView( { collection: App.Materials } );
			viewMaterials.render();

			$('#TabContent').append ( _.template ( tabTemplate, {
				id      : 'materials',
				active  : ' in active',
			}) );
			$('#materials').append( viewMaterials.el );
			$('#login').html('Quit').click(function(){ window.location.replace('/#'); });
			$('#roles').remove();


		},
		renderBeginning: function ( userName, tabName ) {

			var that = this;
			$('body').prepend( userTabsTemplate );
			$('.container-navbar #userRole').html( userName );

			$('#fetchData').bind('click', function() { that.fetchData(); });
			$('#clearDB').bind('click', function() { that.clearDB(); });
			$('#saveCollectionsToDb').bind('click', function() { that.SaveCollectionsToDb(); });
			$('#login').bind('click', function() { that.chooseRole() });

			$('.container').html('');  //empty main container
			$('.container').append( '<div class="row"><div class="span3"></div><div class="span6 content"></div><div class="span3"></div>' );
			$('.content').append( $('#' + tabName ).html() );
			$('.content').append( '<div id="TabContent" class="tab-content">' );

		},
		showAddGoodsView: function () {

			$('#addGoodsView').show();

		},
		showAddUnitsView: function() {

			$('addUnitsView').show();

		}


    });

	return Users;

});
