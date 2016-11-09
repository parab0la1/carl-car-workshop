$(document).ready(function(){
	
	var urlForAllCustomers = "http://localhost:8080/api/customers/";
	var urlForAllCars = "http://localhost:8080/api/cars/";
	var urlForAllCarLogs = "http://localhost:8080/api/carlogs/";
	var personWithMostCars;
	var foundCar;
	var biggestCarCount = 0;
	var averageAgeOnCustomers;
	var totalAge = 0;
	
	var totalCustomers;
	var totalFemales = 0;
	var totalMales = 0;
	
	var totalCarsInWorkShop = 0;
	var carOwnagePercentage;
	
	var totalNewCars = 0;
	var totalOldCars = 0;
	var valueForNewCar = 2006;
	
	checkCustomerWithMostCars();
	
	checkAverageAgeOnCustomers();
	
	checkGenderSpreadOnCustomers();
	
	checkCarStatistics();
	
	function checkCarStatistics(){
		
		$.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: urlForAllCars,
            success: function(data, textStatus, jqXHR){
            	
            	totalCarsInWorkShop = data.length;
            	
            	for(i = 0; i<data.length; i++){
            		if(data.productionYear > valueForNewCar){
            			totalNewCars++;
            		}else{
            			totalOldCars++;
            		}
            	}            	
            	
            	var newCarPercentage = (totalNewCars / totalCarsInWorkShop) * 100;
            	var oldCarPercentage = (totalOldCars / totalCarsInWorkShop) * 100;
            	
            	fillCarStatisticsTable(newCarPercentage, oldCarPercentage);
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('addCustomer error: ' + textStatus);
                console.log("error: " + textStatus);
            }
        });
		
	}
	
	function fillCarStatisticsTable(newCarPercentage, oldCarPercentage){
		
		$('#newCarDiv').find('#newCarDivBody').text(newCarPercentage + '% of all cars are considered "new"');
		$('#oldCarDiv').find('#oldCarDivBody').text(oldCarPercentage + '% of all cars are considered "old"');
		
	}
	
	function checkGenderSpreadOnCustomers(){
		
		$.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: urlForAllCustomers,
            success: function(data, textStatus, jqXHR){
                
            	totalCustomers = data.length;
            	
            	for(i = 0; i <data.length; i++){
            		
            		if(data[i].isFemale == true){
            			totalFemales++;
            			
            		}else{
            			totalMales++;
            		}
            	}
            	
            	finalizeGenderSpread(totalCustomers, totalFemales, totalMales);
             
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('addCustomer error: ' + textStatus);
                console.log("error: " + textStatus);
            }
        });
		
	}
	
	function finalizeGenderSpread(totalCustomers, totalFemales, totalMales){
		
		var malePercentage;
		var femalePercentage;
		
		malePercentage = (totalMales / totalCustomers) * 100;
		femalePercentage = (totalFemales / totalCustomers) * 100;
		
		fillGenderSpreadTable(malePercentage, femalePercentage);
		
	}
	
	function fillGenderSpreadTable(malePercentage, femalePercentage){
		
		var formattedString = malePercentage + "% Male";
		var formattedStrings = femalePercentage + "% Female";
		
		$('#maleDiv').find('#maleDivBody').text(formattedString);
		$('#femaleDiv').find('#femaleDivBody').text(formattedStrings);
		
		
	}
	
	function checkAverageAgeOnCustomers() {
		
		console.log("checkAverageAgeOnCustomers");
		
		$.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: urlForAllCustomers,
            success: function(data, textStatus, jqXHR){
                
                for(i = 0; i< data.length; i++){
                	
                	totalAge += data[i].age;
        	
                }      
                
                averageAgeOnCustomers = totalAge / data.length;
                fillTableForAverageCustomerAge(averageAgeOnCustomers);
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('addCustomer error: ' + textStatus);
                console.log("error: " + textStatus);
            }
        });
	}
	
	
	function fillTableForAverageCustomerAge(averageAgeOnCustomers){
		
		$('#oldestCustomerDiv').find('#oldestCustomerDivHeader').text(averageAgeOnCustomers + " years");
	}
	
	function checkCustomerWithMostCars() {
		
		$.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: urlForAllCustomers,
            success: function(data, textStatus, jqXHR){
                
                for(i = 0; i< data.length; i++){
                	
                	checkHowManyCars(data[i]);
                }
                
                
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('addCustomer error: ' + textStatus);
                console.log("error: " + textStatus);
            }
        });

	}
	
	function checkHowManyCars(customerModel){
		
		foundCar = 0;
		
		$.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: urlForAllCars,
            success: function(data, textStatus, jqXHR){
            	
            	totalCarsInWorkShop = data.length;	

            	for(i = 0; i<data.length; i++){    		
            		if(customerModel.id == data[i].ownerId){

            			foundCar++;

            		}      		
            	}
            	
             
                if(foundCar > biggestCarCount){   	
                	
                	carOwnagePercentage = (foundCar / totalCarsInWorkShop) * 100;
                	
                	biggestCarCount = foundCar;
                	fillMostCarPanel(customerModel, biggestCarCount, carOwnagePercentage);

                	
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('addCustomer error: ' + textStatus);
                console.log("error: " + textStatus);
            }
        });
		
	}
	
	function fillMostCarPanel(customerModel, biggestCarCount, carOwnagePercentage){
		
		$('#mostCarDiv').find('#mostCarDivHeader').text(customerModel.firstName + " (" + biggestCarCount + " cars)");
		$('#percentageDiv').find('#percentageDivBody').text("that is " + carOwnagePercentage + "% of all cars on your workshop");
	}
	
});