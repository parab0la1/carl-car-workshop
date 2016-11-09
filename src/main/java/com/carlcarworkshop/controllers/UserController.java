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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.carlcarworkshop.models.UserModel;
import com.example.carlcarworkshop.services.UserService;
import com.fasterxml.jackson.databind.util.JSONPObject;

@RestController
public class UserController {
	@Autowired
	private UserService userService;

	@CrossOrigin
	@RequestMapping(value = "/users/", method = RequestMethod.POST)
	public void saveUserToDataBase(@RequestBody UserModel userModel) {
		userService.saveUserToDataBase(userModel);
	}

	@CrossOrigin
	@RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
	public ResponseEntity<UserModel> readUserFromDataBase(@PathVariable Long id) {
		return new ResponseEntity<UserModel>(userService.readUserFromDataBase(id), HttpStatus.OK);
	}

	@CrossOrigin
	@RequestMapping(value = "/users/", method = RequestMethod.GET)
	public ResponseEntity<List<UserModel>> getAllUsersFromDataBase() {
		return new ResponseEntity<List<UserModel>>(userService.getAllUsersFromDataBase(), HttpStatus.OK);
	}

	@CrossOrigin
	@RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
	public void removeUserFromDataBase(@PathVariable Long id) {
		userService.removerUserFromDataBase(id);
	}

}
