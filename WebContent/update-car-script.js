$(document).ready(function(){
	
	var currentCarId = sessionStorage.getItem('currentCarModelId');	
	var URLForGettingCar = "http://localhost:8080/api/cars/" + currentCarId;
	var dropDownList = document.getElementById("dropDownList");
	var customerName;
	var customerId;
	
	$('#dropDownDiv').hide();
	fillForms();

	var currentCustomerId = sessionStorage.getItem("currentCustomerId");

	$("#dropDownList").click(function(){
		
		customerName = $("#dropDownList option:selected").text();	
		currentCustomerId = customerName.charAt(0);
		
	});
	
	function fillForms(){	
		
		$.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: URLForGettingCar,
            success: function(data, textStatus, jqXHR){
                
            	$('#carType').val(JSON.stringify(data.manufactorer).replace(/['"]+/g, '')),
            	$('#model').val(JSON.stringify(data.model).replace(/['"]+/g, '')),
            	$('#srlnum').val(JSON.stringify(data.serialNumber).replace(/['"]+/g, '')),
            	$('#year').val(JSON.stringify(data.productionYear).replace(/['"]+/g, ''))

            	
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('Fill forms error: ' + textStatus);
                console.log("error: " + textStatus);
            }
        });
		
	}
	
	
	
	function finalizeList(listLength){		
		
		for(i = 0; i < listLength; i++){
			
			var cust = list[i];
			var el = document.createElement("option");
			el.textContent = cust.id + " " + cust.firstName + " " + cust.lastName;
			el.value = cust.id + " " + cust.firstName + " " + cust.lastName;
			dropDownList.appendChild(el);
		}
	}
	
	$('#btnSubmit').click(function(){

			checkEmptyFields();
		
	});
	
	function updateCar(){
		
		$.ajax({
            type: 'PUT',
            contentType: 'application/json',
            url: URLForGettingCar,
            data: formToJSON(),
            success: function(data, textStatus, jqXHR){
            	       	
                alert('Car updated!');
                location.href = '../customerView/customerView.html';
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('addCar error: ' + textStatus);
                console.log("error: " + textStatus);
            }
        });
		
		editCar = false;
		
	}
	
	function checkEmptyFields() {
		var isFormEmpty;
		$('input').each(function() {
			
			var element = $(this);
			if (element.val() == "") {
				isFormEmpty = true;
				$(this).addClass("error");
			}
		});
		
		if(isFormEmpty){
			alert('Some fields are empty, please fill all fields');
			
		}else{
			updateCar();
		}
	}
	
	function addCar() {
        console.log('addCar');
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: rootURL,
            data: formToJSON(),
            success: function(data, textStatus, jqXHR){
                alert('Car created successfully');
                location.href = '../addCarLog/addCarLog.html';
                sessionStorage.setItem("currentCarId", data.id);
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('addCar error: ' + textStatus);
                console.log("error: " + textStatus);
            }
        });
	}
	
	function formToJSON() {
		
		var carObj = JSON.stringify({
			"manufactorer": $('#carType').val(),
			"model": $('#model').val(),
			"serialNumber": $('#srlnum').val(),
			"productionYear": $('#year').val(),
			"ownerId": currentCustomerId
			
		});
		
		return carObj;
		
	}
});