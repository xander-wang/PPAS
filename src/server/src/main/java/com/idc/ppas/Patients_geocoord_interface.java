package com.idc.ppas;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Patients_geocoord_interface extends JpaRepository<Patients_geocoord, Integer> {

    //Query by healthCardNumber
    public List<Patients_geocoord> findByHealthCardNumber(String healthCardNumber);
}
