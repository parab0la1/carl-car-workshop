package com.example.carlcarworkshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.JpaRepositoryConfigExtension;

import com.example.carlcarworkshop.models.CustomerModel;
import com.example.carlcarworkshop.models.UserModel;

public interface CustomerRepository extends JpaRepository<CustomerModel, Long> {

}
