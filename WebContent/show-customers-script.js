$(document).ready(function(){
	
	var URLForCustomers = "http://localhost:8080/api/customers/";
	var URLForGettingAllCars = "http://localhost:8080/api/cars/";
	
	
	
	
	$('a').hover(function(){
		$(this).css('cursor', 'pointer');
	});
	
	updateTable();
	
	function updateTable() {
		
		$.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: URLForCustomers,
            success: function(data, textStatus, jqXHR){
            	
                list = data;
                listLength = list.length;
                
                for(i = 0; i<listLength; i++){
                	fillCustomerTable(list[i]);
                }
                
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('addCustomer error: ' + textStatus);
                console.log("error: " + textStatus);
            }
        });
	}
	
	
	function fillCustomerTable(customer) {
		
		$("#tab_logic").find('tbody')
		.append($('<tr>')
	        .append($('<th scope="row">')
	            .append($('<h5>')       
	                    		.text(customer.id)    
	            )
	        )
	        .append($('<td>')
	            .append($('<h5>')
	            		.text(customer.firstName + " " + customer.lastName)
	                    
	                    .append($('<a href="#" class="editLink" id="editLink">')       
	                    		.text("Edit")
	                    		.attr('id', customer.id)
	                    )
	                    .append($('<a href="#" class="removeLink">')       
	                    		.text("Remove")
	                    		.attr('id', customer.id)
	                    )
	                    
	                    
	            )
	        ).append($('<td>')
		            .append($('<h5>')
		            		           
		                    		.text(customer.email)
		                    
		            )
		    ).append($('<td>')
		            .append($('<h5>')   		           
		                    		.text(customer.phoneNumber) 
		            )
		    )
		    .append($('<td>')
		            .append($('<h5>')
		            		.append($('<a href="#" class="linkInfo">')            
		                    		.text("Current cars")
		                    		.attr('id', customer.id)
		                    )
		            )
		    )
	    );
		console.log("customer id" + customer.id);
		
	}
	
	$(document).on("click", ".linkInfo", function(){
	
		var currentCustomerId = $(this).attr('id');
		sessionStorage.setItem('currentCustomerId', currentCustomerId);
		location.href = '../customerView/customerView.html';
		
	});
	
	$(document).on("click", ".editLink", function(){
		
		var currentCustomerId = $(this).attr('id');
		sessionStorage.setItem('currentCustomerId', currentCustomerId);
		location.href = '../updateCustomer/updateCustomer.html';
		
	});
	
	$(document).on("click", ".removeLink", function(){
		
		var currentCustomerId = $(this).attr('id');
		sessionStorage.setItem('currentCustomerId', currentCustomerId);
		deleteCustomer(currentCustomerId);
		
	});
	
	function deleteCustomer(currentCustomerId){
		
		var finalURLForDeletingCustomers = "http://localhost:8080/api/customers/" + currentCustomerId;
		
		$.ajax({
            type: 'DELETE',
            contentType: 'application/json',
            url: finalURLForDeletingCustomers,
            success: function(data, textStatus, jqXHR){
            	
               console.log("Customer deleted");
               deleteAllCustomersCars(currentCustomerId);
                
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('delete error: ' + textStatus);
                console.log("error: " + textStatus);
            }
        });
		
	}
	
	function deleteAllCustomersCars(currentCustomerId){

		
		$.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: URLForGettingAllCars,
            success: function(data, textStatus, jqXHR){
            	
               for(i = 0; i<data.length; i++){
            	   if(data[i].ownerId == currentCustomerId){
            		   
            		   deleteCar(data[i].ownerId);
            		   
            	   }
            	   
               }
                
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('delete error: ' + textStatus);
                console.log("error: " + textStatus);
            }
        });
		
	}
	
	function deleteCar(carId){
		
		var URLForDeletingCar = URLForGettingAllCars + carId;
		
		$.ajax({
            type: 'DELETE',
            contentType: 'application/json',
            url: URLForDeletingCar,
            success: function(data, textStatus, jqXHR){
            	
               console.log("deleted car");
               deleteAllCarLogs(carId);
               
                
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('delete error: ' + textStatus);
                console.log("error: " + textStatus);
            }
        });

	}
	
	function deleteAllCarLogs(carId){
		
		var URLForGettingAllCarLogs = "http://localhost:8080/api/carlogs/";
		
		$.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: URLForGettingAllCarLogs,
            success: function(data, textStatus, jqXHR){
            	
               for(i = 0; i<data.length; i++){
            	   if(data[i].ownerCarId == carId){
            		   
            		   deleteCarLog(data[i].id);
            	   }
            	   
            	   
               }
                
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('delete error: ' + textStatus);
                console.log("error: " + textStatus);
            }
        });
		
	}
	
	function deleteCarLog(carLogId){
		
		var URLForDeletingCarLog = "http://localhost:8080/api/carlogs/" + carLogId;
		
		$.ajax({
            type: 'DELETE',
            contentType: 'application/json',
            url: URLForDeletingCarLog,
            success: function(data, textStatus, jqXHR){
            	
               console.log("Deleted Car Log");
               location.reload();
               
                
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('delete error: ' + textStatus);
                console.log("error: " + textStatus);
            }
        });
		
		
	}

	
});