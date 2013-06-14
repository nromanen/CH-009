define([
	'jquery',
	'app'

], function($, App) {

	var localDatabase = {};
	var dbName = "productDB";
	
	localDatabase.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	localDatabase.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
	localDatabase.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

	localDatabase.indexedDB.onerror = function (e) {
		console.log( "Database error: " + e.target.errorCode );
	};

	App.dbConnector.openDatabase = function () {
	
		var openRequest = localDatabase.indexedDB.open( dbName);
		
		openRequest.onerror = function (e) {
			console.log("Database error: " + e.target.errorCode);
		};
		
		openRequest.onsuccess = function ( event ) {
		
			localDatabase.db = openRequest.result;
			console.log("database is open");
			App.Events.trigger( 'fetchProducts' );
			App.Events.trigger( 'fetchUnit' );
			App.Events.trigger( 'fetchGoods' );
		
		};	
	}

	App.dbConnector.deleteDatabase = function() {
        
		console.log('Deleting local database');

		var deleteDbRequest = localDatabase.indexedDB.deleteDatabase(dbName);
		 
		deleteDbRequest.onsuccess = function ( event ) {
			console.log('Local Database deleted!');
		}

		deleteDbRequest.onerror = function (e) {
			console.log("Database error: " + e.target.errorCode);
		}
    
	};

	App.dbConnector.createDatabase = function () {

			var openRequest = localDatabase.indexedDB.open(dbName);
			
			openRequest.onerror = function (e) {
			 
				console.log("Database error: " + e.target.errorCode);
			
			}
			
			openRequest.onsuccess = function ( event ) {
		
				console.log("Database created");
				localDatabase.db = openRequest.result;
			
			}
			
			openRequest.onupgradeneeded = function (evt) {  
			
			console.log('Creating object stores');
				
			var productStore = evt.currentTarget.result.createObjectStore
					("products", {keyPath: "id", autoIncrement: true});
					productStore.createIndex("matIndex", "product", { unique: true });        
					productStore.createIndex("priceIndex", "productPrice", { unique: false });
				
			var unitStore = evt.currentTarget.result.createObjectStore
					("Units", {keyPath: "id", autoIncrement: true});
					unitStore.createIndex("unitName", "unitName", { unique: true});        
					unitStore.createIndex("unitCollection", "unitCollection", { unique: false }); 
					
				  
			var tovarStore = evt.currentTarget.result.createObjectStore
					("Goods", {keyPath: "id", autoIncrement: true});
				   tovarStore.createIndex("goodsName", "goodsName", { unique: true});        
				   tovarStore.createIndex("goodsCollection", "goodsCollection", { unique: false });		


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
				console.log('Creating object stores 2');
			}
	}	
		
	App.dbConnector.addProduct = function ( material, price ) {

		try {

			var transaction = localDatabase.db.transaction("products", "readwrite");
			var store = transaction.objectStore("products");            
		  
			if (localDatabase != null && localDatabase.db != null) {
		         
				var request = store.add({
					product : material,
					productPrice : price
				});
				
				request.onsuccess = function (e) {
					addProductHandler ( true );
				};
				
				request.onerror = function (e) {
					console.log(e.value);
					addProductHandler ( false );
				};
			}
		}
		
		catch (e) {
			console.log(e);
		}
		
		var addProductHandler = function ( result ) {
			console.log( result );
		}
		
	}

	App.dbConnector.changeMaterialPrice = function( inputModel )  {
		try {
		   	var transaction = localDatabase.db.transaction( "products" , "readwrite");
			var store = transaction.objectStore( "products" );

			if (localDatabase != null && localDatabase.db != null) {
			var request = store.openCursor();
			
				request.onsuccess = function( evt ) {

					var cursor = evt.target.result;

					if ( cursor.value.matIndex ===  inputModel.get ( 'name' ) ) {
						var newValue = cursor.value;
						newValue.productPrice = inputModel.get ( 'price' );
						store.put(newValue);
						return;	
					}
					cursor.continue(); 				
				}	
			}
		}
		catch(e){
		   console.log(e);
		}
	}
	
	App.dbConnector.EditUnitItem = function ( model ) {
	
	try {
		   
			var transaction = localDatabase.db.transaction("Units", "readwrite");
			var store = transaction.objectStore("Units");
			if (localDatabase != null && localDatabase.db != null) {
			var request = store.openCursor();
				request.onsuccess = function( evt ) {
					var cursor = evt.target.result;
					//console.log(cursor);
					if ( cursor ) {
						if ( cursor.value.unitName ===  model.get('name') ) {
							//console.log("value event");
							var newValue = cursor.value;
							newValue.unitName =  model.get('name');
							newValue.unitCollection = JSON.stringify(model.get('mcollection'));
							store.put(newValue);
							return;

						}	
					cursor.continue(); 	

					}
									
				}	
			}
		}
		catch(e){
		   console.log(e);
		}
	
	}
	
	
	
	App.dbConnector.AddUnit = function (objStor, model) {
		
		try {

			var transaction = localDatabase.db.transaction(objStor, "readwrite");
			var store = transaction.objectStore(objStor);            
		  
			if (localDatabase != null && localDatabase.db != null) {

				var request =store.put({unitName:model.get("name"), unitCollection:JSON.stringify(model.get("mcollection"))}); 

				
				request.onsuccess = function (e) {
					addProductHandler ( true );
				};
				
				request.onerror = function (e) {
					console.log(e.value);
					addProductHandler ( false );
				};
			}
		}
		
		catch (e) {
			console.log(e);
		}
	
	
		var addProductHandler = function ( result ) {
			console.log( result );
		}

	}
	
	
	
	App.dbConnector.fetchUnit = function()	{
			
					var store = localDatabase.db.transaction("Units").objectStore("Units");
					var request = store.openCursor();
					var units = new Array();
					var pointer = -1;
					
						var Units = function(config){
							this.name = config.name;
							this.mcollection = config.mcollection;
							this.unitPrice = config.unitPrice;

						}
						request.onsuccess =  function(event){
								var cursor = event.target.result;
								pointer++;
								
								if(cursor){
									units[pointer++] = new Units ({
									name:cursor.value.unitName,
									mcollection:JSON.parse(cursor.value.unitCollection),
									unitPrice: 0
									});
								cursor.continue(); 	
								}else{
								  onSuccessHandler ( units );
								}
						
						
						}
						var onSuccessHandler = function ( units ) {
							App.Events.trigger( 'writeUnits', units );
		}
						
	}
	
	App.dbConnector.deleteProduct = function ( material ) {

		if ( localDatabase != null && localDatabase.db != null ) {		
			
			var store = localDatabase.db.transaction("products").objectStore("products");
			var request = store.openCursor();
			var products = new Array();
			var pointer = -1;
			
			var Product = function ( config ) {
			
				this.material = config.product;
				this.price = config.productPrice;
			}
			
			request.onsuccess = function( evt ) {
				
				var cursor = evt.target.result;
				
				if ( cursor ) {
				
					if ( cursor.value.product ===  material ) {
						
						var deleteRequest = localDatabase.db.transaction( ["products"] , "readwrite" ).objectStore("products").delete( cursor.key );
						deleteRequest.onsuccess = function( ev ) {
							
							console.log("deleted id:" + cursor.key + " !");
							
						}
					
					}
					
					cursor.continue(); 				
				
				}
			}	
		}		
	}
	
	App.dbConnector.deleteUnit = function ( unitTitle ) {
			console.log(unitTitle);

		if ( localDatabase != null && localDatabase.db != null ) {		
			
			var store = localDatabase.db.transaction("Units").objectStore("Units");
			var request = store.openCursor();
			var products = new Array();
			var pointer = -1;
			
			var Unit = function ( config ) {
			
				this.unitTitle = config.unitName;
				this.mcollection = config.unitCollection;
				
			}
			
			request.onsuccess = function( evt ) {

				var cursor = evt.target.result;
				
				if ( cursor ) {
		
				
					if ( cursor.value.unitName ===  unitTitle ) {
						
						var deleteRequest = localDatabase.db.transaction( ["Units"] , "readwrite" ).objectStore("Units").delete( cursor.key );
						deleteRequest.onsuccess = function( ev ) {
							
							console.log("deleted id:" + cursor.key + " !");
							
						}
					
					}
					
					cursor.continue(); 				
				
				}
			}	
		}		
	}

	App.dbConnector.fetchAll = function () {
	
		console.log('fetching');
			
		if ( localDatabase != null && localDatabase.db != null ) {
		
		console.log('localDatabase NOT null');
			
			try {
				var store = localDatabase.db.transaction("products").objectStore("products");
				
				var request = store.openCursor();
				var products = new Array();
				var pointer = -1;
				
				var Product = function (config) {

							this.material = config.material;
							this.price = config.price;

				}

				request.onsuccess = function( evt ) {
		
							var cursor = evt.target.result;
							pointer++;

							if ( cursor ) {
	   
								products[pointer] = new Product ({	
									material : cursor.value.product,
									price : cursor.value.productPrice
								});
								
								cursor.continue(); 				
							
							} else {
								onSuccessHandler ( products );
							}
				};
			}
			
			catch (e) {
			 
				console.log('need to create db!');
                
				App.dbConnector.createDatabase();
                
			}
		}
		
		var onSuccessHandler = function ( products ) {
			App.Events.trigger( 'writeProducts', products );
		}
		
	}	
		
	App.dbConnector.changeUnitName = function( oldName, newName )  {
		try {
		   
			var transaction = localDatabase.db.transaction( "Units" , "readwrite");
			var store = transaction.objectStore( "Units" );
			if (localDatabase != null && localDatabase.db != null) {
			var request = store.openCursor();
			
				request.onsuccess = function( evt ) {
					var cursor = evt.target.result;
					
						if ( cursor.value.unitName ===  oldName ) {
							var newValue = cursor.value;
							newValue["unitName"] = newName;
							store.put(newValue);
							return;
						}	
					
					cursor.continue(); 				
				}	
			}
		}
		catch(e){
		   console.log(e);
		}
	}	
	
	App.dbConnector.changeCount = function( inputModel )  {
		try {
		   	var transaction = localDatabase.db.transaction( "Units" , "readwrite");
			var store = transaction.objectStore( "Units" );
			if (localDatabase != null && localDatabase.db != null) {
			var request = store.openCursor();
			
				request.onsuccess = function( evt ) {
					var cursor = evt.target.result;
					if ( cursor.value.unitName ===  inputModel.get ( 'name' ) ) {
						{	var newValue = cursor.value;
							newValue["unitCollection"] = JSON.stringify(inputModel.get("mcollection"));
							store.put(newValue);
							return;
						}	
					}
					cursor.continue(); 				
				}	
			}
		}
		catch(e){
		   console.log(e);
		}
	}		

	App.dbConnector.AddGoodsToDb = function (objStor, model) {
		
		try {

			var transaction = localDatabase.db.transaction(objStor, "readwrite");
			var store = transaction.objectStore(objStor);            
		  
			if (localDatabase != null && localDatabase.db != null) {
				var request =store.put({goodsName:model.get("nameG"), goodsCollection:JSON.stringify(model.get("goodsCollection"))}); 
				
				
				request.onsuccess = function (e) {
					addProductHandler ( true );
				};
				
				request.onerror = function (e) {
					console.log(e.value);
					addProductHandler ( false );
				};
			}
		}
		
		catch (e) {
			console.log(e);
		}
	
	
		var addProductHandler = function ( result ) {
			console.log( result );
		}

	}
	
	App.dbConnector.fetchGood = function()	{
		
		var store = localDatabase.db.transaction("Goods").objectStore("Goods");
		var request = store.openCursor();
		var goods = new Array();
		var pointer = 0;
		
			var Goods = function(config){
				this.nameG = config.nameG;
				this.goodsCollection = config.goodsCollection;
				this.goodsPrice = config.goodsPrice;
			
			};
			request.onsuccess =  function(event){
					var cursor = event.target.result;
					//pointer++;

					if(cursor){
						goods[pointer++] = new Goods ({
							nameG:cursor.value.goodsName,
							goodsCollection:JSON.parse(cursor.value.goodsCollection),
							goodsPrice: 0
						});
					cursor.continue(); 	
					} else {
					  onSuccessHandler ( goods );
					}
			
			}
			var onSuccessHandler = function ( goods ) {
				App.Events.trigger( 'writeGoods', goods );
			}		
						
	}
	
	App.dbConnector.deleteGoods = function ( title ) {

		if ( localDatabase != null && localDatabase.db != null ) {		
			
			var store = localDatabase.db.transaction("Goods").objectStore("Goods");
			var request = store.openCursor();
			var pointer = -1;
		
			request.onsuccess = function( evt ) {

				var cursor = evt.target.result;
				
				if ( cursor ) {
		
				
					if ( cursor.value.goodsName ===  title ) {
						
						var deleteRequest = localDatabase.db.transaction( ["Goods"] , "readwrite" ).objectStore("Goods").delete( cursor.key );
						deleteRequest.onsuccess = function( ev ) {

							
						}
					
					}
					
					cursor.continue(); 				
				
				}
			}	
		}		
	}
	
	App.dbConnector.changeGoodsName = function( oldName, newName )  {
		try {
		   
			var transaction = localDatabase.db.transaction( "Goods" , "readwrite");
			var store = transaction.objectStore( "Goods" );
			if (localDatabase != null && localDatabase.db != null) {
			var request = store.openCursor();
			
				request.onsuccess = function( evt ) {
					var cursor = evt.target.result;
					
						if ( cursor.value.goodsName ===  oldName ) {
							var newValue = cursor.value;
							newValue["goodsName"] = newName;
							store.put(newValue);
							return;
						}	
					
					cursor.continue(); 				
				}	
			}
		}
		catch(e){
		   console.log(e);
		}
	}	
	
	App.dbConnector.EditGoodsItems = function ( tovarModel ) {
	
	try {
		   
			var transaction = localDatabase.db.transaction("Goods", "readwrite");
			var store = transaction.objectStore("Goods");
			if (localDatabase != null && localDatabase.db != null) {
			var request = store.openCursor();
			
				request.onsuccess = function( evt ) {
					var cursor = evt.target.result;
					if ( cursor ) {
						if ( cursor.value.goodsName ===  tovarModel.get('nameG') ) {
							var newValue = cursor.value;
							newValue['goodsName'] =  tovarModel.get('nameG');
							newValue['goodsCollection'] = JSON.stringify(tovarModel.get('goodsCollection'));
							store.put(newValue);
							return;
						}	
					}
					cursor.continue(); 				
				}	
			}
		}
		catch(e){
		   console.log(e);
		}
	
	}

	
    //App.dbConnector.deleteDatabase();

	App.dbConnector.createDatabase();

	return App.dbConnector;

})

