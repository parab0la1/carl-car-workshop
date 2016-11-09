$(document).ready(function() {

					var URLForCustomers = "http://localhost:8080/api/customers/";
					var URLForAllCars = "http://localhost:8080/api/cars/";
					var URLForGettingAllCarLogs = "http://localhost:8080/api/carlogs/";
					var finalizedCarList = new Array();
					var dropDownList = document.getElementById("dropDownList");
					
					var customerName;
					var currentCustomerId = sessionStorage.getItem("currentCustomerId");
					var isCurrentUserAdmin = sessionStorage.getItem("isCurrentUserAdmin");

					
					if(isCurrentUserAdmin == false){
						
						$('#navbar').hide();
						
					}
					
//					document.getElementById("editLink").hide();
					
//					checkIfUserIsAdmin(){
//						
////						if(isCurrentUserAdmin == false){
////							
////							$('.linkInfo').hide();
////							
////						}
//						
//					}
					
					getCurrentCustomersCars();
					fillCustomersList();

					$("#btnChangeUser").click(function() {

										$("#carBody").empty();
										customerName = $("#dropDownList option:selected").text()
										currentCustomerId = customerName.charAt(0);
										getCurrentCustomersCars();
										

									});

					function fillCarTable(carmodel) {

						$("#tab_logic")
								.find('tbody')
								.append(
										$('<tr>')
												.append(
														$('<td>')
																.append(
																		$('<h5>')
																				.text(carmodel.id)))
												.append(
														$('<td>')
																.append(
																		$('<h5>')
																				.text(carmodel.manufactorer)
																				
																				.append(
																						$('<a href="#" class="editLink" id="editLink">')
																								.text("Edit")
																								.attr('id',carmodel.id))
																				.append(
																						$('<a href="#" class="removeLink">')
																								.text("Remove")
																								.attr('id',carmodel.id))))
																				
												.append(
														$('<td>')
																.append(
																		$('<h5>')
																				.text(carmodel.model)))
												.append(
														$('<td>')
																.append(
																		$('<h5>')
																				.text(carmodel.productionYear)))
												.append(
														$('<td>')
																.append(
																		$('<h5>')
																				.text(carmodel.serialNumber)))
												.append(
														$('<td>')
																.append(
																		$('<h5>')
																				.append(
																						$('<a href="#" class="linkInfo">')
																								.attr('id',carmodel.id)
																								.text("Repair Log")

																				))));
					}
					
					function fillCarTableRestricted(carmodel) {

						$("#tab_logic")
								.find('tbody')
								.append(
										$('<tr>')
												.append(
														$('<td>')
																.append(
																		$('<h5>')
																				.text(carmodel.id)))
												.append(
														$('<td>')
																.append(
																		$('<h5>')
																				.text(carmodel.manufactorer)
																				
																				.append(
																						$('<a href="#" class="editLink" id="editLink">')
																								.text("")
																								.attr('id',carmodel.id))
																				.append(
																						$('<a href="#" class="removeLink">')
																								.text("")
																								.attr('id',carmodel.id))))
																				
												.append(
														$('<td>')
																.append(
																		$('<h5>')
																				.text(carmodel.model)))
												.append(
														$('<td>')
																.append(
																		$('<h5>')
																				.text(carmodel.productionYear)))
												.append(
														$('<td>')
																.append(
																		$('<h5>')
																				.text(carmodel.serialNumber)))
												.append(
														$('<td>')
																.append(
																		$('<h5>')
																				.append(
																						$('<a href="#" class="linkInfo">')
																								.attr('id',carmodel.id)
																								.text("")

																				))));
					}
					
					
					

					
					
					$(document).on("click",".linkInfo",function() {

										console.log($(this).attr('id'));
										var currentCarModelId = $(this).attr('id');
										sessionStorage.setItem('currentCarModelId',currentCarModelId);
										location.href = '../showCarLogs/showCarLogs.html';

									});

					$(document).on("click",".editLink",function() {

								console.log($(this).attr('id'));
								var currentCarModelId = $(this).attr('id');
								sessionStorage.setItem('currentCarModelId',currentCarModelId);
								sessionStorage.setItem('editCar', true);
								console.log(currentCustomerId);
								location.href = '../updateCar/updateCar.html';

							});

					$(document).on("click",".removeLink",function() {

								console.log($(this).attr('id'));
								var currentCarModelId = $(this).attr('id');
								sessionStorage.setItem('currentCarModelId',currentCarModelId);
								console.log(currentCustomerId);
								deleteCar(currentCarModelId);

							});

					function deleteCar(currentCarModelId) {

						var finalURLForDeletingCar = URLForAllCars + currentCarModelId;

						$.ajax({
							type : 'DELETE',
							contentType : 'application/json',
							url : finalURLForDeletingCar,
							success : function(data, textStatus, jqXHR) {
								deleteAllCarLogs(currentCarModelId)

							},
							error : function(jqXHR, textStatus, errorThrown) {
								alert('addCustomer error: ' + textStatus);
								console.log("error: " + textStatus);
							}
						});

					}
					
					function deleteAllCarLogs(currentCarModelId){
						
						$.ajax({
							type : 'GET',
							contentType : 'application/json',
							url : URLForGettingAllCarLogs,
							success : function(data, textStatus, jqXHR) {

								for(i = 0; i<data.length; i++){
									if(currentCarModelId == data[i].ownerCarId){
										console.log(data[i].ownerCarId);
										deleteCarLog(data[i].id);
										
									}
									
								}

							},
							error : function(jqXHR, textStatus, errorThrown) {
								alert('addCustomer error: ' + textStatus);
								console.log("error: " + textStatus);
							}
						});
						
					}
					
					function deleteCarLog(carLogId){
						
						var URLForDeletingCarLog = "http://localhost:8080/api/carlogs/" + carLogId;
						
						$.ajax({
							type : 'DELETE',
							contentType : 'application/json',
							url : URLForDeletingCarLog,
							success : function(data, textStatus, jqXHR) {
								
								alert('Car Deleted!');
								
								location.reload();

							},
							error : function(jqXHR, textStatus, errorThrown) {
								alert('addCustomer error: ' + textStatus);
								console.log("error: " + textStatus);
							}
						});
						
						
					}

					function getCurrentCustomersCars() {

						$
								.ajax({
									type : 'GET',
									contentType : 'application/json',
									url : URLForAllCars,
									success : function(data, textStatus, jqXHR) {

										for (i = 0; i < data.length; i++) {

											if (data[i].ownerId == currentCustomerId) {
												finalizedCarList.push(data[i]);
												if(isCurrentUserAdmin == true){
												fillCarTable(data[i]);
												}else{
													fillCarTableRestricted(data[i]);
												}
											}
										}
									},
									error : function(jqXHR, textStatus,errorThrown) {
										alert('addCustomer error: ' + textStatus);
										console.log("error: " + textStatus);
									}
								});

					}

					function fillCustomersList() {
						$.ajax({
							type : 'GET',
							contentType : 'application/json',
							url : URLForCustomers,
							success : function(data, textStatus, jqXHR) {

								list = data;
								listLength = list.length;

								finalizeList(listLength);

							},
							error : function(jqXHR, textStatus, errorThrown) {
								alert('addCustomer error: ' + textStatus);
								console.log("error: " + textStatus);
							}
						});
					}

					function finalizeList(listLength) {

						for (i = 0; i < listLength; i++) {

							var cust = list[i];
							var el = document.createElement("option");
							el.textContent = cust.id + " " + cust.firstName	+ " " + cust.lastName;
							el.value = cust.id + " " + cust.firstName + " "	+ cust.lastName;
							dropDownList.appendChild(el);
						}
					}

				});