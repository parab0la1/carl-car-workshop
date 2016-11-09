package com.example.carlcarworkshop.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.carlcarworkshop.models.CarModel;
import com.example.carlcarworkshop.models.CustomerModel;
import com.example.carlcarworkshop.repositories.CustomerRepository;

@Service
public class CustomerService {

	@Autowired
	private CustomerRepository customerRepository;

	public void saveCustomerToDataBase(CustomerModel customerModel) {
		CustomerModel customerModel2 = customerRepository.saveAndFlush(customerModel);
	}

	public void updateCustomerToDatabase(Long id, CustomerModel customerModel) {
		CustomerModel customerModelToSave = customerRepository.findOne(id);

		customerModelToSave.setFirstName(customerModel.getFirstName());
		customerModelToSave.setLastName(customerModel.getLastName());
		customerModelToSave.setEmail(customerModel.getEmail());
		customerModelToSave.setAge(customerModel.getAge());
		customerModelToSave.setPhoneNumber(customerModel.getPhoneNumber());
		customerModelToSave.setIsFemale(customerModel.getIsFemale());

		customerRepository.save(customerModelToSave);

	}

	public CustomerModel readCustomerFromDataBase(Long id) {
		return (CustomerModel) customerRepository.getOne(id);
	}

	public ArrayList<CustomerModel> getAllCustomersFromDataBase() {
		return (ArrayList<CustomerModel>) customerRepository.findAll();
	}

	public void removerCustomerFromDataBase(Long id) {
		customerRepository.delete(id);
	}
}
