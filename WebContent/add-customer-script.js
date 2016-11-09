window.currentCustomerId = undefined;

$(document).ready(function(){
	
	var rootURL = "http://localhost:8080/api/customers/";
	var currentCustomerId = sessionStorage.getItem('currentCustomerId');
	var URLForGettingUser = "http://localhost:8080/api/customers/" + currentCustomerId;
	var isFemale;

	
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
			isFemale = checkGenderOnCustomer();
			addCustomer();
		}
	}
	
	$('[name="ageColumn"]').keyup(function(){
		  if(parseInt($(this).val()) < 1)
		  {
		    $('#div1').html('value cannot be lower than 1');
		    $(this).val('');
		  }
		  else
		  { $('#div1').html(''); }
		});
	
	function checkGenderOnCustomer() {
		
		if($('#radioFemale').is(":checked")){
			return "true";
		}else{
			return "false";
		}
		
	}
	
	function addCustomer() {
        console.log('addCustomer');
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: rootURL,
            data: formToJSON(),
            success: function(data, textStatus, jqXHR){
                alert('Customer created successfully');
                sessionStorage.setItem("currentCustomerId", data.id);
                location.href = '../addCar/addCar.html';
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('addCustomer error: ' + textStatus);
                console.log("error: " + textStatus);
            }
        });
	}
	
	function formToJSON() {
		
		console.log(isFemale + " i FORM TO JSON");
		
		var test = JSON.stringify({
			"firstName": $('#firstName').val(),
			"lastName": $('#lastName').val(),
			"email": $('#email').val(),
			"phoneNumber": $('#phoneNumber').val(),
			"age": $('#age').val(),
			"isFemale": isFemale
			
		});
		
		return test;
		
	}
});