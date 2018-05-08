package com.idc.ppas;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Diagnosis_interface extends JpaRepository<Diagnosis, Integer> {

    //Query by healthCardNumber
    public List<Diagnosis> findById(Integer id);

}
