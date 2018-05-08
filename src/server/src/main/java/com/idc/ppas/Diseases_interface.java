package com.idc.ppas;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Diseases_interface extends JpaRepository<Diseases, Integer> {

    //Query by healthCardNumber
    public List<Diseases> findByIcdCode(String icdCode);
}
