
	

Backbone.sync = function(method, model) {

	if(method==="create"){
		  alert(method + ": " + JSON.stringify(model));
		 var openRequest = indexedDB.open("polise");
		 
          
    
                openRequest.onerror = function(e) {
                    
                        console.log("Database error: " + e.target.errorCode);//----on error event
                };
                  
                openRequest.onsuccess = function(event) {
                    
                        console.log("Database opend");
                        var db = event.target.result;
                        var transaction = db.transaction("tovar", "readwrite");
                        
                            transaction.oncomplete = function(event) {
                               Aplication.Collection.Oders.trigger('InsertDbDane');
                               console.log("Транзакіція успішна");
                                
                            };
     
                            transaction.onerror = function(event) {
                               
                                alert("eror transaction");
                      
                            };
                
                
                        var oStor = transaction.objectStore("tovar")
            
                        oStor.add({stafs: model.get('name'), price:model.get('price')});
                     
                                
                };
                
                openRequest.onupgradeneeded = function (evt) {
                        alert("what a ...?");
                };
	}

	};

