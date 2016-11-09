package com.example.carlcarworkshop.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.carlcarworkshop.models.CarModel;
import com.example.carlcarworkshop.repositories.CarRepository;

@Service
public class CarService {

	@Autowired
	private CarRepository carRepository;

	public void saveCarToDataBase(CarModel carModel) {
		carRepository.saveAndFlush(carModel);
	}

	public void updateCarToDataBase(Long id, CarModel carModel) {
		CarModel carModelToSave = carRepository.findOne(id);

		carModelToSave.setManufactorer(carModel.getManufactorer());
		carModelToSave.setModel(carModel.getModel());
		carModelToSave.setProductionYear(carModel.getProductionYear());
		carModelToSave.setSerialNumber(carModel.getSerialNumber());

		carRepository.save(carModelToSave);
	}

	public CarModel readCarFromDataBase(Long id) {

		return (CarModel) carRepository.getOne(id);
	}

	public ArrayList<CarModel> getAllCarsFromDataBase() {
		return (ArrayList<CarModel>) carRepository.findAll();
	}

	public void removeCarFromDataBase(Long id) {
		carRepository.delete(id);
	}
}
