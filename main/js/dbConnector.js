var App = App || {};

(function () {

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
				
			var blockStore = evt.currentTarget.result.createObjectStore
					("bloks", {keyPath: "id", autoIncrement: true});
					blockStore.createIndex("blockName", "blockName", { unique: false });        
					blockStore.createIndex("count", "count", { unique: false });
					blockStore.createIndex("blockID", "blockID", { unique: false });
					
			var blockNameStore = evt.currentTarget.result.createObjectStore
					("bloksNameStore", {keyPath: "id", autoIncrement: true});
					blockNameStore.createIndex("blockName", "blockName", { unique: true });        
				  
			var tovarStore = evt.currentTarget.result.createObjectStore
					("Tovaru", {keyPath: "id", autoIncrement: true});
				   tovarStore.createIndex("tovarName", "tovarName", { unique: false });        
				   tovarStore.createIndex("count", "count", { unique: false });
				   tovarStore.createIndex("tovarID", "tovarID", { unique: false });
				   					
			var tovarNameStore = evt.currentTarget.result.createObjectStore
					("TovarNameStore", {keyPath: "id", autoIncrement: true});
					tovarNameStore.createIndex("tovarName", "tovarName", { unique: true });                 	   						  
			}
	
	}	
		
	App.dbConnector.addProduct = function ( material, price ) {

		try {

			var transaction = localDatabase.db.transaction("products", "readwrite");
			var store = transaction.objectStore("products");            
			
			console.log(store);
		  
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
			console.log ( products );
		}
		
	}	
	
	App.dbConnector.createDatabase();
	
})();


