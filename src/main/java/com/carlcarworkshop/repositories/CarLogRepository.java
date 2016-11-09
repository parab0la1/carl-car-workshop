package com.example.carlcarworkshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.carlcarworkshop.models.CarLogModel;
import com.example.carlcarworkshop.models.CustomerModel;

public interface CarLogRepository extends JpaRepository<CarLogModel, Long> {

}
