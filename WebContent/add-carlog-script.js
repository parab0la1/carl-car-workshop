$(document).ready(function(){
	
	var  rootURL = "http://localhost:8080/api/carlogs/";
	var urlForCars = "http://localhost:8080/api/cars/";
	var dropDownList = document.getElementById("dropDownList");
	var customerName;
	var currentCarId = sessionStorage.getItem("currentCarId");
	
	fillCarList();
	
	$('#btnSubmit').click(function(){
		
		if (currentCarId == null){
		    alert('Car is not set for this repair log. Try again');
		}else{
			addCarLog();	
		}
		
	});
	
	$("#dropDownList").click(function(){
		
		customerName = $("#dropDownList option:selected").text();
		
		currentCarId = customerName.charAt(0);
		
	});
	
	function fillCarList() {
		$.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: urlForCars,
            success: function(data, textStatus, jqXHR){
                
                list = data;
                listLength = list.length;
                
                finalizeList(listLength);
                
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('fillCarList error: ' + textStatus);
                console.log("fillCarList error: " + textStatus);
            }
        });
	}
	
function finalizeList(listLength){
		
		
		for(i = 0; i < listLength; i++){
			
			var currentCar = list[i];
			var el = document.createElement("option");
			el.textContent = currentCar.id + " " + currentCar.manufactorer + " " + currentCar.model;
			el.value = currentCar.id + " " + currentCar.manufactorer + " " + currentCar.model;
			dropDownList.appendChild(el);
		}
	}
	
	function addCarLog() {
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: rootURL,
			data: formToJSON(),
			success: function(data, textStatus, jqXHR){
				alert('addCarLog success');
				
				
				location.href= '../showCustomers/showCustomers.html';
				
			},
			error: function(jqXHR, textStatus, errorThrown){
				alert('accCarLog error: ' + textStatus);
				console.log("error: " + textStatus);
			}
			
		});
		
	}
	
	function formToJSON(){
		
		var carLogObj = JSON.stringify({
			"repairDate": $('#dateTimePicker').val(),
			"repairLog": $('#carRepairLog').val(),
			"repairLogTitle": $('#carRepairLogTitle').val(),
			"ownerCarId": currentCarId
			
		});
		
		return carLogObj;
	}
});