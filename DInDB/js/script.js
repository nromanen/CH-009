(function() {  
    window.Aplication ={
            Model:{},
            View:{},
            Collection:{},
              
    };
	
	Aplication.events = _.extend({}, Backbone.Events);
	
			 function createDatabase() {
    	
          			  var openRequest = indexedDB.open("polise");
			
           				 openRequest.onerror = function(e) {
            	
                						console.log("Database error: " + e.target.errorCode);
            				 };
            
            				 openRequest.onsuccess = function(event) {
            
                 						console.log("Database created");
                						dbase = openRequest.result;
     				
            				};
            
            				openRequest.onupgradeneeded = function (evt) {
   		
                						alert("Створено базу даних");
                						var str = evt.target.result;
                						var objectStor= str.createObjectStore(["tovar"],{keyPath:"id",autoIncrement:true});
                						objectStor.createIndex("stafs","stafs",{unique: true});
                						objectStor.createIndex("price","price",{unique: false});
              
            				};
            
    };
    
    createDatabase();

    Aplication.Model.Order = Backbone.Model.extend({
        
        	defaults: {
           		"name":"",
           		"price":0,
           },
    });
	
	



    
    Aplication.Collection.Materials = Backbone.Collection.extend({
           Model:Aplication.Model.Order,
            
			 initialize: function(){
					
						Aplication.events.on("showCollection", this.showAll,this);
						Aplication.events.on("saveModel",this.saveAll,this);
									
           },
                      
           showAll: function(){
        		
                    var openRequest = indexedDB.open("polise");
           
                          openRequest.onerror = function(e) {
 
                                console.log("Database error: " + e.target.errorCode);
    
                          }; 
 
                    openRequest.onsuccess = function(event) {
   
                          db = openRequest.result;
                          var transation = db.transaction("tovar", "readonly");
                          var store = transation.objectStore("tovar");
                          var req = store.openCursor();
                          var myStor = document.getElementById('storage');
    
                                req.onerror = function(e){
    	             	     
                                        console.log("eror transact"+e.target.errorCode);
            		
                                }
    
                                req.onsuccess = function (event){
                            
                                        var cursor = event.target.result;
                                        if(cursor){
                                              var val = cursor.value;
                                              var innerText = "<p>Матеріал:" + val.stafs +" ціна:"+ val.price+"</p>";  
                                              myStor.innerHTML = myStor.innerHTML + "" + innerText;
                                              cursor.continue();  
                                        }else{
              
                                              console.log("Record");
                 
                                        }
                
                                }
                          myStor.innerHTML = "";
                    };
          },
          saveAll:function(){
                res = this.models;
                alert(res);
                res[res.length-1].save();
          }

    });
     
 Aplication.Collection.Oders = new Aplication.Collection.Materials;
       
        function deleteDatabase() {
       		alert("delete");
                var deleteDbRequest = indexedDB.deleteDatabase("polise");
        
      
                deleteDbRequest.onsuccess = function (event) {
                        alert("Dane del");
                };
                
                deleteDbRequest.onerror = function (e) {
                        console.log("Database error: " + e.target.errorCode);
                };
                     
                var myStor = document.getElementById('storage');
                var staf = document.getElementById('stafs');
                var price = document.getElementById('price');
                staf.value ="";
                price.value ="";
                myStor.innerHTML = "";
         }
    
     
     
         Aplication.View.Serch = Backbone.View.extend({
        
               initialize: function(){
               			Aplication.Collection.Oders.bind("InsertDbDane", this.showAll);
                       Aplication.Collection.Oders.bind('add',this.saveModel);
                        console.log("create view");
                        this.render();  
                
               },
            
                render: function(){
                
                        var search= document.getElementById("serch_template");
                        var tamplate = search.innerHTML;
                        this.el.innerHTML=tamplate;
                        Aplication.events.trigger("showCollection");

                
                },
                
                events: {
                        
                        "click input[id=butt]": "doAdd",
                        "click input[id=delete]": "del",
                        "click input[id=all]": "showAll"
                },
                                    
                doAdd: function(event){
                   		var stafs = document.getElementById('stafs');
                   		var price = document.getElementById('price');
                   		Aplication.Collection.Oders.add(new Aplication.Model.Order({name:stafs.value,price:price.value}));
                     
                         
                 },
           
                 del: function(event){
                     	deleteDatabase();  
                 },
                 
                showAll: function(){
                			Aplication.events.trigger("showCollection");
                   
               
                },
                saveModel:function(){
                			Aplication.events.trigger("saveModel");	
                    
		
                }
            
               
        });
        
    Aplication.el = document.getElementById('search_container');
    Aplication.search_view = new Aplication.View.Serch({el:Aplication.el});
     }());
