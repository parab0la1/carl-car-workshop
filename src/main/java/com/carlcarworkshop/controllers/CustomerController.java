package com.example.carlcarworkshop.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.carlcarworkshop.models.CarModel;
import com.example.carlcarworkshop.models.CustomerModel;
import com.example.carlcarworkshop.services.CustomerService;

import antlr.collections.List;

@RestController
public class CustomerController {
	@Autowired
	private CustomerService customerService;

	@CrossOrigin
	@RequestMapping(value = "/customers/", method = RequestMethod.POST)
	public ResponseEntity<CustomerModel> saveCustomerToDataBase(@RequestBody CustomerModel customerModel) {
		customerService.saveCustomerToDataBase(customerModel);
		return new ResponseEntity<CustomerModel>(customerService.readCustomerFromDataBase(customerModel.getId()),
				HttpStatus.OK);

	}

	@CrossOrigin
	@RequestMapping(value = "/customers/{id}", method = RequestMethod.GET)
	public ResponseEntity<CustomerModel> readCustomerFromDataBase(@PathVariable Long id) {
		return new ResponseEntity<CustomerModel>(customerService.readCustomerFromDataBase(id), HttpStatus.OK);
	}

	@CrossOrigin
	@RequestMapping(value = "/customers/{id}", method = RequestMethod.PUT)
	public void updateCustomerToDatabase(@PathVariable Long id, @RequestBody CustomerModel customerModel) {
		customerService.updateCustomerToDatabase(id, customerModel);
	}

	@CrossOrigin
	@RequestMapping(value = "/customers/", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<CustomerModel>> getAllCustomersFromDataBase() {
		return new ResponseEntity<ArrayList<CustomerModel>>(customerService.getAllCustomersFromDataBase(),
				HttpStatus.OK);
	}

	@CrossOrigin
	@RequestMapping(value = "/customers/{id}", method = RequestMethod.DELETE)
	public void removeCustomerFromDataBase(@PathVariable Long id) {
		customerService.removerCustomerFromDataBase(id);
	}
}
