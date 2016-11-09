package com.example.carlcarworkshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.carlcarworkshop.models.CarModel;

public interface CarRepository extends JpaRepository<CarModel, Long> {

}
