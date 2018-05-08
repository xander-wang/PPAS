package com.idc.ppas;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Patients_statistics_expense_interface extends JpaRepository<Patients_statistics_expense, Integer> {

    //Query by healthCardNumber
    public List<Patients_statistics_expense> findByHealthCardNumber(String healthCardNumber);
}
