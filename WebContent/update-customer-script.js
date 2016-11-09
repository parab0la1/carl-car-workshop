window.currentCustomerId = undefined;

$(document).ready(function(){
	var currentCustomerId = sessionStorage.getItem('currentCustomerId');
	var URLForGettingUser = "http://localhost:8080/api/customers/" + currentCustomerId;
	var isFemale;
	
	fillForms();
	
	$('#btnSubmit').click(function(){
		
			checkEmptyFields();
	});
	
	function fillForms(){		
		
		$.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: URLForGettingUser,
            success: function(data, textStatus, jqXHR){
                
            	if(data.isFemale === false){         		
            		
            		$("#radioFemale").attr('checked', 'checked');
            	}else{
            		
            		$("#radioMale").attr('checked', 'checked');      		
            	}
            	
            	$('#firstName').val(data.firstName.toString()),
            	$('#lastName').val(JSON.stringify(data.lastName).replace(/['"]+/g, '')),
            	$('#email').val(JSON.stringify(data.email).replace(/['"]+/g, '')),
            	$('#phoneNumber').val(JSON.stringify(data.phoneNumber).replace(/['"]+/g, '')),
            	$('#age').val(JSON.stringify(data.age))

            	
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log("error: " + textStatus);
            }
        });
		
	}
	
	function updateCustomer(){		
		
		$.ajax({
            type: 'PUT',
            contentType: 'application/json',
            url: URLForGettingUser,
            data: formToJSON(),
            success: function(data, textStatus, jqXHR){
                alert('Customer updated!');
                location.href = '../showCustomers/showCustomers.html';
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('addCustomer error: ' + textStatus);
                console.log("error: " + textStatus);
            }
        });
		
		sessionStorage.setItem('editCustomer', false);
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
			isFemale = checkGenderOnCustomer();
			updateCustomer();
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
	
	function formToJSON() {		
		
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