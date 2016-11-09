package com.example.carlcarworkshop.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.carlcarworkshop.models.CarLogModel;
import com.example.carlcarworkshop.repositories.CarLogRepository;

@Service
public class CarLogService {

	@Autowired
	private CarLogRepository carLogRepository;

	public void saveCarLogToDataBase(CarLogModel carLogModel) {
		carLogRepository.saveAndFlush(carLogModel);
	}

	public void updateCarLogToDataBase(Long id, CarLogModel carLogModel) {

		CarLogModel carLogModelToSave = carLogRepository.findOne(id);

		carLogModelToSave.setRepairLog(carLogModel.getRepairLog());
		carLogModelToSave.setRepairDate(carLogModel.getRepairDate());
		carLogModelToSave.setRepairLogTitle(carLogModel.getRepairLogTitle());

		carLogRepository.save(carLogModelToSave);
	}

	public CarLogModel readCarLogFromDataBase(Long id) {
		return (CarLogModel) carLogRepository.getOne(id);
	}

	public ArrayList<CarLogModel> getAllCarLogsFromDataBase() {
		return (ArrayList<CarLogModel>) carLogRepository.findAll();
	}

	public void removeCarLogFromDataBase(Long id) {
		carLogRepository.delete(id);
	}

}
