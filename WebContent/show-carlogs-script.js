$(document).ready(function() {

					var currentCarModelId = sessionStorage.getItem('currentCarModelId');
					var URLForAllCars = 'http://localhost:8080/api/cars/';
					var URLForAllCarLogs = 'http://localhost:8080/api/carlogs/';
					var currentCarLogModelId;
					var finalizedCarList = [];
					var currentCarlog;
					
					getAllCarLogs();

					function getAllCarLogs() {

						$.ajax({
							type : 'GET',
							contentType : 'application/json',
							url : URLForAllCarLogs,
							success : function(data, textStatus, jqXHR) {

								for (i = 0; i < data.length; i++) {

									if (data[i].ownerCarId == currentCarModelId) {
										fillRepairLogTable(data[i]);
									}

								}
							},
							error : function(jqXHR, textStatus, errorThrown) {
								alert('addCustomer error: ' + textStatus);
								console.log("error: " + textStatus);
							}
						});

					}

					function fillRepairLogTable(carLogModel) {

						$("#tab_logic")
								.find('tbody')
								.append(
										$('<tr>').append(
												$('<td class="small-date">')
												.append($('<h5>')
																.text(
																		carLogModel.repairLogTitle)))
												.append(
														$('<td class="small-date">')
																.append($('<h5>')
																				.text(
																						carLogModel.repairDate)))
												.append(
														$('<td>')
																.append(
																		$('<h5>')
																				.text(carLogModel.repairLog)
																				.append(
																						$('<a href="#" class="newLink" id="newLink">')
																								.text("New")
																								.attr('id',carLogModel.id))
																				.append(
																						$('<a href="#" class="removeLink">')
																								.text("Remove")
																								.attr('id',carLogModel.id))
																				.append(
																						$('<a href="#" class="editLink">')
																								.text("Edit")
																								.attr('id',carLogModel.id)))));
					}
					
					$(document).on("click",".newLink",function() {

						sessionStorage.setItem('currentCarId',currentCarModelId);
						location.href = '../addCarLog/addCarLog.html';

					});
					
					$(document).on("click", ".editLink", function(){
						
						var currentCarLogModelId = $(this).attr('id');
						sessionStorage.setItem('currentCarLogModelId', currentCarLogModelId);
						sessionStorage.setItem('editCar', true);
						location.href = '../updateCarLog/updateCarLog.html';
						
					});
					
					$(document).on("click", ".removeLink", function(){
						
						var currentCarLogModelId = $(this).attr('id');
						sessionStorage.setItem('currentCarLogModelId', currentCarLogModelId);
						deleteCarLog(currentCarLogModelId);
						
					});
					
					function deleteCarLog(currentCarLogModelId){
						
						var finalURLForDeletingCarLog = URLForAllCarLogs + currentCarLogModelId;
						
						$.ajax({
							type : 'DELETE',
							contentType : 'application/json',
							url : finalURLForDeletingCarLog,
							success : function(data, textStatus, jqXHR) {

								alert('Car Log deleted successfully');
								
								location.reload();

							},
							error : function(jqXHR, textStatus, errorThrown) {
								alert('addCustomer error: ' + textStatus);
								console.log("error: " + textStatus);
							}
						});
						
					}
});