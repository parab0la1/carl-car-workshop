package com.example.carlcarworkshop.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.carlcarworkshop.models.UserModel;
import com.example.carlcarworkshop.repositories.UserRepository;

import antlr.collections.List;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public void saveUserToDataBase(UserModel userModel) {
		userRepository.saveAndFlush(userModel);
	}

	public UserModel readUserFromDataBase(Long id) {

		return (UserModel) userRepository.getOne(id);
	}

	public ArrayList<UserModel> getAllUsersFromDataBase() {
		return (ArrayList<UserModel>) userRepository.findAll();
	}

	public void removerUserFromDataBase(Long id) {
		userRepository.delete(id);
	}
}
