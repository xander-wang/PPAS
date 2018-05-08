package com.idc.ppas;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Medical_event_brief_data_interface extends JpaRepository<Medical_event_brief_data, Integer> {

    //Query by healthCardNumber
    public List<Medical_event_brief_data> findByHealthCardNumber(String healthCardNumber);

}

