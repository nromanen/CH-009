var localDatabase = {};
var dbName = "productDB";
localDatabase.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
localDatabase.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
localDatabase.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

localDatabase.indexedDB.onerror = function (e) {
	console.log("Database error: " + e.target.errorCode);
};

function openDatabase() {
	var openRequest = localDatabase.indexedDB.open(dbName);
	openRequest.onerror = function(e) {
		console.log("Database error: " + e.target.errorCode);
	};
	openRequest.onsuccess = function(event) {
		localDatabase.db = openRequest.result;
		console.log("database is open");
	};	
}
//openDatabase();

function createDatabase() {
	
	console.log('Deleting local database');
	var deleteDbRequest = localDatabase.indexedDB.deleteDatabase(dbName);
	deleteDbRequest.onsuccess = function (event) {
   		console.log('Database deleted');
   		var openRequest = localDatabase.indexedDB.open(dbName,1);
		
		openRequest.onerror = function(e) {
			console.log("Database error: " + e.target.errorCode);
		};
		openRequest.onsuccess = function(event) {
			console.log("Database created");
			localDatabase.db = openRequest.result;
		};	
		openRequest.onupgradeneeded = function (evt) {   
			console.log('Creating object stores');
	    	var productStore = evt.currentTarget.result.createObjectStore
				("products", {keyPath: "id", autoIncrement: true});
			productStore.createIndex("matIndex", "product", { unique: false });        
			productStore.createIndex("priceIndex", "productPrice", { unique: false });
        };
        deleteDbRequest.onerror = function (e) {
        	console.log("Database error: " + e.target.errorCode);
        };
    
	};
}
	
	
	
	
		

function addProduct(material, price) {
	try {
		var result = document.getElementById("result");
		result.innerHTML = "";
		
		//var material = document.getElementById("product").value;
		//var price = document.getElementById("productPrice").value;
		var transaction = localDatabase.db.transaction("products", "readwrite");
		var store = transaction.objectStore("products");            
		console.log(store);
	  
		if (localDatabase != null && localDatabase.db != null) {
			var request = store.add({
				"product" : material,
				"productPrice" : price,
			});
			request.onsuccess = function(e) {
				result.innerHTML = "Product record was added successfully.";
			};
			
			request.onerror = function(e) {
				console.log(e.value);
				result.innerHTML = "Product record was not added.";
			};
		}
	}
	catch(e){
		console.log(e);
	}
}


function clearAllProducts() {
	try {
		var result = document.getElementById("result");
		result.innerHTML = "";
		
		if (localDatabase != null && localDatabase.db != null) {
			var store = localDatabase.db.transaction("products", "readwrite").objectStore("products");                    
		  
			store.clear().onsuccess = function(event) {
				result.innerHTML = "'product' object store cleared";
			};
		}
	}
	catch(e){
		console.log(e);
	}
}

function fetchProduct() {
	try {
		var result = document.getElementById("result");
		result.innerHTML = "";
		if (localDatabase != null && localDatabase.db != null) {
			var store = localDatabase.db.transaction("products").objectStore("products");
			store.get("E3").onsuccess = function(event) {
				var productItem = event.target.result;
				if (productItem == null) {
					result.innerHTML = "product not found";
				}
				else {					
					var jsonStr = JSON.stringify(productItem);
					result.innerHTML = jsonStr;
				}
			};
		}
	}
	catch(e){
		console.log(e);
	}
}

function fetchAllProducts() {
	try {
		var result = document.getElementById("result");
		result.innerHTML = "";
		
		if (localDatabase != null && localDatabase.db != null) {
			var store = localDatabase.db.transaction("products").objectStore("products");
			var request = store.openCursor();
			request.onsuccess = function(evt) {  
			    var cursor = evt.target.result;  
			    if (cursor) {
			    	var productItem = cursor.value;
			    	var jsonStr = JSON.stringify(productItem);
			    	result.innerHTML = result.innerHTML + "<br/>" + jsonStr;         
			        cursor.continue();  
			    }  
			};
		}
	}
	catch(e){
		console.log(e);
	}
}

function fetchAllProduct_ver2() {
	try {
		var result = document.getElementById("result");
		result.innerHTML = "";
		
		if (localDatabase != null && localDatabase.db != null) {
			var transaction = localDatabase.db.transaction("products", "readwrite");
			var store = transaction.objectStore("products");
			var request = store.openCursor();
			request.onsuccess = function(evt) {  
			    var cursor = evt.target.result;  
			    if (cursor) {
			    	var productItem = cursor.value;
			    	var jsonStr = "id: " + productItem.id + " Material: " + productItem.product + " Price: " + productItem.productPrice;
			    	result.innerHTML = result.innerHTML + "<br/>" + jsonStr;         
			        cursor.continue();  
			    }  
			};
		}
	}
	catch(e){
		console.log(e);
	}
}

function deleteProduct() {
	try {
		var result = document.getElementById("result");
		result.innerHTML = "";
		var id = 1;
		var transaction = localDatabase.db.transaction("products", "readwrite");
		var store = transaction.objectStore("products");
		if (localDatabase != null && localDatabase.db != null) {
			var request = store.delete(id);
			request.onsuccess = function(evt) {
				console.log("product deleted");
			};
			request.onerror = function(evt) {
					console.log(evt.value);
				};		
						
		};
	}
	
	catch(e){
		console.log(e);
	}
}
    


function deleteProductById() {
	try {
		var result = document.getElementById("result");
		result.innerHTML = "";
		var id = 1;
		var transaction = localDatabase.db.transaction("products", "readwrite");
		var store = transaction.objectStore("products");
		if (localDatabase != null && localDatabase.db != null) {
			var request = store.delete(id);
			request.onsuccess = function(evt) {
				console.log("product deleted");
			};
			request.onerror = function(evt) {
					console.log(evt.value);
				};		
						
		};
	}
	
	catch(e){
		console.log(e);
	}
}


/*
function deleteProduct(material) {
     try {
         var result = document.getElementById("result");
         result.innerHTML = "";
         var transaction = localDatabase.db.transaction("products", 
"readwrite");
         var store = transaction.objectStore("products");
         if (localDatabase != null && localDatabase.db != null) {

             var request = store.openCursor();
             request.onsuccess = function(evt) {
                 var cursor = evt.target.result;
                 console.log(cursor.value.product);
                 //console.log(material);
                 if(cursor){
                     if(cursor.value.product == material){
                         var delReq = store.delete(cursor.value.product);

                         delReq.onsuccess = function(evt) {
                             console.log('Deleted!');
                         }
                         delReq.onerror = function(evt) {
                             console.log('Not deleted!');
                         }
                     }
                     cursor.continue();
                 }
             };
             request.onerror = function(evt) {
                     console.log(evt.value);
                 };

         };
     }

     catch(e){
         console.log(e);
     }
}
*/

