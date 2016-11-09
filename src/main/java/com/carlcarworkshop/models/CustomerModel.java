package com.example.carlcarworkshop.models;

import java.io.Serializable;
import java.util.ArrayList;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@SuppressWarnings("serial")
@Entity
public class CustomerModel implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String firstName;
	private String lastName;
	private String isFemale;
	private String email;
	private String phoneNumber;
	private Integer age;
	private ArrayList<CarModel> listOfCars;

	public CustomerModel() {
	}

	@OneToMany(cascade = CascadeType.ALL)
	public ArrayList<CarModel> getListOfCars() {
		return listOfCars;
	}

	public void setListOfCars(ArrayList<CarModel> listOfCars) {
		this.listOfCars = listOfCars;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getIsFemale() {
		return isFemale;
	}

	public void setIsFemale(String isFemale) {
		this.isFemale = isFemale;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Long getId() {
		return id;
	}

}
