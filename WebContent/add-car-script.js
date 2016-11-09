$(document).ready(function(){
	
	var currentCarId = sessionStorage.getItem('currentCarModelId');
	
	var rootURL = "http://localhost:8080/api/cars/";
	var URLForCustomers = "http://localhost:8080/api/customers/";
	var URLForGettingCar = "http://localhost:8080/api/cars/" + currentCarId;
	var dropDownList = document.getElementById("dropDownList");;
	var customerName;
	var customerId;

	var currentCustomerId = sessionStorage.getItem("currentCustomerId");

	
	fillCustomersList();

	$("#dropDownList").click(function(){
		
		customerName = $("#dropDownList option:selected").text();
		
		currentCustomerId = customerName.charAt(0);
		
	});

	
	function fillCustomersList() {
        $.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: URLForCustomers,
            success: function(data, textStatus, jqXHR){
                
                list = data;
                listLength = list.length;
                
                finalizeList(listLength);
                
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('addCustomer error: ' + textStatus);
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
			addCar();
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