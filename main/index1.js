
<script type="text/template" id="navbar">
			<div class="navbar navbar-static-top" style="margin-bottom:20px;">
				<nav class="navbar-inner">
					<div style="width: 570px; margin: 0 auto;">
						<a class="brand"> Warehouse - <%= user %></a>
						<div class="btn-group pull-right">
							<a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="#">
								User Roles
								<span class="caret"></span>
							</a>
							<ul class="dropdown-menu">
								<li> <a href="#customer"> Customer </a> </li>
								<li> <a href="#accountant"> Accountant </a> </li>
								<li> <a href="#engineer"> Engineer </a> </li>
								<li> <a href="#storekeeper"> Storekeeper </a> </li>
							</ul>
						</div>
					</div>
				</nav>
			</div>		
		</script>

		<script type="text/template" id="chooseRole">
			<div class="row" style="margin-top:15%;">
				<div class="span5"></div>
				<div class="span2">
					<h3>Your role:</h3>
					<ul class="dropdown-menu" style="display: block; position: static; margin-bottom: 5px;">
						<li> <a href="#customer"> Customer </a> </li>
						<li> <a href="#accountant"> Accountant </a> </li>
						<li> <a href="#engineer"> Engineer </a> </li>
						<li> <a href="#storekeeper"> Storekeeper </a> </li>
					</ul>
				</div>
				<div class="span5"></div>
			</div>
		</script>
		
		<!-- User Tab templates -->
		
		<script type="text/template" id="storekeeperTab">
			<ul id="myTab" class="nav nav-tabs">
              <li class="active"><a href="#materials" data-toggle="tab">Materials</a></li>
            </ul>
		</script>

		<script type="text/template" id="engineerTab">
			<ul id="myTab" class="nav nav-tabs">
              <li class="active"><a href="#products" data-toggle="tab">Products</a></li>
              <li><a href="#units" data-toggle="tab">Units</a></li>
            </ul>
		</script>

		<script type="text/template" id="accountantTab">
			<ul id="myTab" class="nav nav-tabs">
              <li class="active"><a href="#products" data-toggle="tab">Products</a></li>
              <li><a href="#units" data-toggle="tab">Units</a></li>
              <li><a href="#materials" data-toggle="tab">Materials</a></li>
            </ul>
		</script>

		<script type="text/template" id="customerTab">
			<ul id="myTab" class="nav nav-tabs">
              <li class="active"><a href="#products" data-toggle="tab">Products</a></li>
            </ul>
		</script>
		
		<!-- Tab templates -->

		<script type="text/template" id="tab">
			<div class="tab-pane fade<%= active %>" id="<%= id %>">
			</div>
		</script>

		<!-- Button templates -->

		<script type="text/template" id="addNewMaterialButton">
			<a href="#addNewMaterial" role="button" class="btn btn-info" data-toggle="modal"><i class="icon-white icon-plus"></i> New Material</a>
		</script>

		<script type="text/template" id="addGoodsButton">
			<a href="#addNewMaterial" role="button" class="btn btn-info" data-toggle="modal"><i class="icon-white icon-plus"></i> New goods</a>
		</script>
	
		<script type="text/template" id="addUnit2GoodsButton">
		<a href="#addUnit2Goods" role="button" class="btn btn-info btn-small" data-toggle="modal"><i class="icon-white icon-plus"></i> Units</a>
		</script>
		<!-- Modal templates -->

		<script type="text/template" id="addNewMaterialModal">
			<div id="addNewMaterial" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				  <div class="modal-header">
				    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				    <h3 id="myModalLabel">Add New Material</h3>
				  </div>
				  <div class="modal-body">
				    	
					Material: <input class="textbox" id="material" type="text">
					<div class="clear"></div>
					Price: <input class="textbox" id="price" type="text">

				  </div>
				  <div class="modal-footer">
				    <button class="btn close-addNewMaterial" data-dismiss="modal" aria-hidden="true">Close</button>
				    <button class="btn btn-primary save-material">Save changes</button>
				  </div>
				</div>
		</script>

		<script type="text/template"  id="temlateGoods">
		 <div class="tab-pane fade in active" id="goodsView">
		 <a href="#addGoodsView" role="button" class="btn btn-info" data-toggle="modal"><i class="icon-white icon-plus"></i> New Goods</a>

			<div id="addGoodsView" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				  <div class="modal-header">
				    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				    <h3 id="myModalLabel">Modal goods header</h3>
				  </div>
				  <div class="modal-body">

				   		<h1>Warehouse</h1><br>
			
					
							<div id="addGoods">

							<div class="fl ">New goods:</div>
							<div class="fle"><input class="textbox span3" id="goods" type="text"></div>
							</div>
							<div style="height:15px;"></div>
						<br>
				  </div>
				  <div class="modal-footer">
				    <button class="btn" data-dismiss="modal" aria-hidden="true">Close goods Add</button>
				    <button class="btn btn-primary">Save changes</button>
				  </div>
				</div>

			
			
			<div  id="goods_holder" class="accordion" style="margin-top:20px;">



			</div>
		</div>
        </script> 


		<!-- Materials View templates -->
		
		<script type="text/template" id="tableheader-materials-accountant">
		  	<thead>
			  	<th> Material </th>
				<th> Price </th>
			</thead>
		</script>

		<script type="text/template" id="tableheader-materials-storekeeper">
		  	<thead>
			  	<th> Material </th>
				<th> Price </th>
				<th> Edit </th>
				<th> Delete </th>
			</thead>
		</script>
		
		<script type="text/template" id="materials-storekeeper">
		  	<td> <%= material %> </td>
			<td> <%= price %> </td>
			<td> <div class="edit"></div> </td>
			<td> <div class="delete"></div> </td>
		</script>

		<script type="text/template" id="materials-accountant">
		  	<td> <%= material %> </td>
			<td> <%= price %> </td>
		</script>

		<!-- other templates -->

		<!-- old templates -->

		<script type="text/template" id="navigation">

        	

        	<li class="active"><a href="#products" data-toggle="tab" id="showMaterial"><i class="icon-tint"></i>Show Materials</a></li>
        	 <li><a href="#units" data-toggle="tab" id="showUnit" ><i class="icon-th-list"></i>Show Unit</a></li>
        	<li>
        		<a href="#goodsView" data-toggle="tab" id="showGoods" >
        		<i class="icon-shopping-cart"></i>Show Goods</a>
        	</li>
        	<li><a href="#2C" id="fetchMaterials"  data-toggle="tab">
        	<i class="icon-shopping-cart"></i>fetchMaterials</a>
        	</li>
            		


    
    	</script>  


        
               
        <script type="text/template"  id="temlateUnits">
			
				
					<h1>Warehouse</h1><br>
			
					<div id="addUnit">
							<div class="fl">New unit:</div>
							<div class="fle"><input class="textbox" id="unit" type="text"></div>
					</div>
					<div style="height:15px;"></div>
					<br>
			
					<div id="units_holder"></div>

			 		     	 
        
        </script> 
   
        <script type="text/template"  id="temlateMaterials" >
		
				<h1>Warehouse</h1><br>
			
            	<div id="addMaterial">
						<div class="fl">Material:</div>
						<div class="fle"><input class="textbox" id="material" type="text"></div>
						<div class="clear"></div>
						<div class="fl">Price:</div> 
						<div class="fle"><input class="textbox" id="price" type="text"></div> 
            	</div>
			
            	<div id="table_holder"></div>
         
        </script> 
		
		
		<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
		
		<script type="text/template" id="goods-name">
			<div class="goods_holder">
						<div class="accordion-heading">
					      <a class="accordion-toggle" data-toggle="collapse" data-parent="#goods_holder" href="#collapseThree">
					        <%= nameG %><div class="delete_unit"></div>
					      </a>
					    </div>

				<div class="goods_info"></div>
			</div>
			<div class="clear"></div>	
			<div style="height:15px;"></div>
		</script>
		
		<script type="text/template" id="goods-count">


					    <div id="collapseThree" class="accordion-body collapse">
					      <div class="accordion-inner">
					      <table class="table">
                	
								<thead>
									
									<th> Units </th>
									<th> Quantity </th>
									<th> Edit </th>
									<th> Delete </th>
									<th> Price total </th>
								</thead>
								<tbody class="holder">
									
								<tr>
				                	<td><div class="units_in_Goods"><%= units %></div></td>
				                	<td> <div class="count"><%= count %></div> </td>
				                	<td> <div class="editCount"></div> </td>
				                	<td> <div class="delete" title="Delete <%= units %> material"></div></td>
				                	<td> $120 </td>
				                </tr>
				                <tr>	
				                		<td id="buttonPlace" colspan="4">
				                				
				                		</td>
										<td>
											Unit price: <b>$200</b>
										</td>
				                	</tr>
							</tbody>
			                	
			                </table>

					      </div>
					    </div>


					     
							 
					     
					  




			

			<div class="holder">
				<div class="units_in_Goods"><%= units %></div>
				<div class="count"><%= count %></div>
				<input class="editUnitsCount">
				
				<div class="delete" title="Delete <%= units %> material"></div>
				<div class="editCount"></div>
			</div> 

		</script>		
		
		<script type="text/template" id="goods-count-plus">
			  <div class="holder">
				<div class="plus" title="Add <%= name %> to the goods"></div>
				<div class="material"><%= name %></div>
				<!-- <div class="count"></div> -->
			  </div>
			  <div class="clear"></div>
		</script>	
		
		
   
		<script type="text/template" id="unit-name">
			<div class="unit_holder">
				<div class="unit_name"><%= name %></div>
				<input class="edit_unit_name" value="<%= name %>">
				<div class="deleteUnit" title="Delete <%= name %> unit"></div>
				<div class="edit_unitItem" title="Edit <%= name %> unit"></div>
				<div class="clear"></div>
				<div class="unit_info"></div>
			</div>
			<div class="clear"></div>	
			<div style="height:15px;"></div>
		</script>
		
		<script type="text/template" id="unit-count">
			<div class="holder">
				<div class="material_in_unit"><%= material %></div>

				<div class="count"><%= count %><span></span></div>

				<input class="editMaterialCount">
				
				<div class="delete" title="Delete <%= material %> material"></div>
				<div class="editCount"></div>
			</div> 
		</script>
		
		<script type="text/template" id="material-price-plus">
			  <div class="holder">
				<div class="plus" title="Add <%= material %> to the unit"></div>
				<div class="material"><%= material %></div>
				<div class="price"><%= price %></div>
			  </div>
			  <div class="clear"></div>
		</script>
	

