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

import com.example.carlcarworkshop.models.CarLogModel;
import com.example.carlcarworkshop.models.CustomerModel;
import com.example.carlcarworkshop.services.CarLogService;

import antlr.collections.List;

@RestController
public class CarLogController {

	@Autowired
	private CarLogService carLogService;

	@CrossOrigin
	@RequestMapping(value = "/carlogs/", method = RequestMethod.POST)
	public void saveCarLogToDataBase(@RequestBody CarLogModel carLogModel) {
		carLogService.saveCarLogToDataBase(carLogModel);
	}

	@CrossOrigin
	@RequestMapping(value = "/carlogs/{id}", method = RequestMethod.PUT)
	public void updateCarLogToDataBase(@PathVariable Long id, @RequestBody CarLogModel carLogModel) {
		carLogService.updateCarLogToDataBase(id, carLogModel);
	}

	@CrossOrigin
	@RequestMapping(value = "/carlogs/{id}", method = RequestMethod.GET)
	public ResponseEntity<CarLogModel> readCarLogFromDataBase(@PathVariable Long id) {
		return new ResponseEntity<CarLogModel>(carLogService.readCarLogFromDataBase(id), HttpStatus.OK);
	}

	@CrossOrigin
	@RequestMapping(value = "/carlogs/", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<CarLogModel>> readAllCarLogsFromDataBase() {
		return new ResponseEntity<ArrayList<CarLogModel>>(carLogService.getAllCarLogsFromDataBase(), HttpStatus.OK);
	}

	@CrossOrigin
	@RequestMapping(value = "/carlogs/{id}", method = RequestMethod.DELETE)
	public void removeCarLogFromDataBase(@PathVariable Long id) {
		carLogService.removeCarLogFromDataBase(id);
	}
}
