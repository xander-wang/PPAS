package com.idc.ppas;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Patient_basic_data_interface extends JpaRepository<Patient_basic_data, Integer> {

    //Query by healthCardNumber
    public List<Patient_basic_data> findByHealthCardNumber(String healthCardNumber);

}

