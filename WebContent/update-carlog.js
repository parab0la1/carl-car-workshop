$(document).ready(function(){
	
	var  rootURL = "http://localhost:8080/api/carlogs/";
	var currentCarLogModelId = sessionStorage.getItem("currentCarLogModelId");	
	
	fillForms();
	
	$('#btnSubmit').click(function(){
			updateCarLog();

		
	});
	
	$("#dropDownList").hide();
	
	function fillForms() {
		
		var finalURLForFillingForms = rootURL + currentCarLogModelId;
		
		$.ajax({
			type: 'GET',
			contentType: 'application/json',
			url: finalURLForFillingForms,
			success: function(data, textStatus, jqXHR){				
				
				$('#dateTimePicker').val(data.repairDate),
				$('#carRepairLog').val(JSON.stringify(data.repairLog).replace(/['"]+/g, '')),
				$('#carRepairLogTitle').val(JSON.stringify(data.repairLogTitle).replace(/['"]+/g, ''))

				
			},
			error: function(jqXHR, textStatus, errorThrown){
				alert('accCarLog error: ' + textStatus);
				console.log("error: " + textStatus);
			}
			
		});
		
	}

	function updateCarLog(){
		
		var finalURLForUpdatingCarLog = rootURL + currentCarLogModelId;
		
		$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: finalURLForUpdatingCarLog,
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			
			alert('Car Log Updated!');
			
			location.href= '../showCarLogs/showCarLogs.html';			
			
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
			"repairLogTitle": $('#carRepairLogTitle').val()
			
		});
		
		return carLogObj;
	}
});