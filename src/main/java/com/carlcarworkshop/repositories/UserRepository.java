package com.example.carlcarworkshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.carlcarworkshop.models.CarModel;
import com.example.carlcarworkshop.models.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Long> {

}
