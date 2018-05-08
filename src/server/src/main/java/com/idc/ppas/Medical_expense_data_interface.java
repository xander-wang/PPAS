package com.idc.ppas;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Medical_expense_data_interface extends JpaRepository<Medical_expense_data, Integer> {

    //Query by healthCardNumber
    public List<Medical_expense_data> findByHealthCardNumber(String healthCardNumber);

}

