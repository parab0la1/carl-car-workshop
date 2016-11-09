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
public class CarModel implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String manufactorer;
	private String model;
	private Integer productionYear;
	private Integer serialNumber;
	private Integer ownerId;
	private ArrayList<CarLogModel> listOfCarLogs;

	public CarModel() {

	}

	@OneToMany(cascade = CascadeType.ALL)
	public ArrayList<CarLogModel> getListOfCarLogs() {
		return listOfCarLogs;
	}

	public void setListOfCarLogs(ArrayList<CarLogModel> listOfCarLogs) {
		this.listOfCarLogs = listOfCarLogs;
	}

	public Integer getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(Integer serialNumber) {
		this.serialNumber = serialNumber;
	}

	public Integer getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(Integer ownerId) {
		this.ownerId = ownerId;
	}

	public String getManufactorer() {
		return manufactorer;
	}

	public void setManufactorer(String manufactorer) {
		this.manufactorer = manufactorer;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public Integer getProductionYear() {
		return productionYear;
	}

	public void setProductionYear(Integer productionYear) {
		this.productionYear = productionYear;
	}

	public Long getId() {
		return id;
	}

}
