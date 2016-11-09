$(document).ready(function(){
	
	var userName;
	var passWord;
	var isAdmin;
	var rootURL = "http://localhost:8080/api/users/";
	
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
			
			checkIfUserIsAdmin();
			isAdmin = checkIfUserIsAdmin();
			console.log(isAdmin);
			addUser();
		}
	}
	
	function checkIfUserIsAdmin(){
		if($('#adminCheck').is(":checked")){
			return "true";
		}else{
			return "false";
		}
	}
	
	function addUser() {
        console.log('addUser');
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: rootURL,
            data: formToJSON(),
            success: function(data, textStatus, jqXHR){
                alert('User created successfully');
                location.href = '../index.html';
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('addUser error: ' + textStatus);
                console.log("error: " + textStatus);
            }
        });
	}
	
	function formToJSON() {
		
		var test = JSON.stringify({
			"userName": $('#userName').val(),
			"passWord": $('#passWord').val(),
			"isAdmin": isAdmin		
		});
		
		return test;
		
	}
});