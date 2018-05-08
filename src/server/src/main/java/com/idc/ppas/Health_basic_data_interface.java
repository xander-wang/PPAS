package com.idc.ppas;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Health_basic_data_interface extends JpaRepository<Health_basic_data, Integer> {

    //Query by healthCardNumber
    public List<Health_basic_data> findByHealthCardNumber(String healthCardNumber);

}

