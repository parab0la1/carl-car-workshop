package com.example.carlcarworkshop.controllers;

import java.util.List;

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
import com.example.carlcarworkshop.models.UserModel;
import com.example.carlcarworkshop.services.CarService;

@RestController
public class CarController {
	@Autowired
	private CarService carService;

	@CrossOrigin
	@RequestMapping(value = "/cars/", method = RequestMethod.POST)
	public ResponseEntity<CarModel> saveCarToDataBase(@RequestBody CarModel carModel) {
		carService.saveCarToDataBase(carModel);
		return new ResponseEntity<CarModel>(carService.readCarFromDataBase(carModel.getId()), HttpStatus.OK);
	}

	@CrossOrigin
	@RequestMapping(value = "/cars/{id}", method = RequestMethod.PUT)
	public void updateCarToDataBase(@PathVariable Long id, @RequestBody CarModel carModel) {
		carService.updateCarToDataBase(id, carModel);
	}

	@CrossOrigin
	@RequestMapping(value = "/cars/{id}", method = RequestMethod.GET)
	public ResponseEntity<CarModel> readCarFromDataBase(@PathVariable Long id) {
		return new ResponseEntity<CarModel>(carService.readCarFromDataBase(id), HttpStatus.OK);
	}

	@CrossOrigin
	@RequestMapping(value = "/cars/", method = RequestMethod.GET)
	public ResponseEntity<List<CarModel>> readAllCarsFromDataBase() {
		return new ResponseEntity<List<CarModel>>(carService.getAllCarsFromDataBase(), HttpStatus.OK);
	}

	@CrossOrigin
	@RequestMapping(value = "/cars/{id}", method = RequestMethod.DELETE)
	public void removeCarFromDataBase(@PathVariable Long id) {
		carService.removeCarFromDataBase(id);
	}
}
