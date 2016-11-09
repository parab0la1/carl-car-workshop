$(document).ready(function(){
		
	var list;
	var listLength;	
	var isUserNameCorrect;
	var isPassWordCorrect;	
	var typedUserName;
	var typedPassWord;	
	var userNameFromDb;
	var passWordFromDb;	
	var currentUser;
	var rootURL = "http://localhost:8080/api/users/";
	
	sessionStorage.setItem('editCustomer', false);
	
	$('#btnLogin').click(function(){
				
		tryLogin();
		
	});
	
	function tryLogin() {
		getUsers();
	}
	
	function getUsers() {
        $.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: rootURL,
            success: function(data, textStatus, jqXHR){
                
                list = data;
                listLength = list.length;
                
                var isLoginCorrect = validateLogin(listLength);
                var isUserAdmin = checkIfUserIsAdmin();
                
                if(isLoginCorrect){
                	alert('Success!');
                	if(isUserAdmin){
                		location.href = 'showCustomers/showCustomers.html';
                		sessionStorage.setItem("isCurrentUserAdmin", true);
                	}else{
                		location.href = 'customerView/customerView.html';
                		sessionStorage.setItem("isCurrentUserAdmin", false);
                	}
                }else{
                	alert('Incorrect login, try again!');
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('error: ' + textStatus);
                console.log("error: " + textStatus);
            }
        });
	}
	
	function checkIfUserIsAdmin(){
		
		if(currentUser.isAdmin === "true"){
			return true;
		}else{
			return false;
		}
		
	}
	
	 function validateLogin() {
		
		 typedUserName = $('#usrName').val();
	     typedPassWord = $('#pword').val();
	     
	     console.log(listLength + "I validate");
		 
		
	     for(i = 0; i < listLength; i++){
			
			userNameFromDb = list[i].userName;
			passWordFromDb = list[i].passWord;
			
			if(typedUserName === userNameFromDb && typedPassWord === passWordFromDb){
				currentUser = list[i];
				return true;
			}
			
		} 
	     return false;
		 

	} 
	
});