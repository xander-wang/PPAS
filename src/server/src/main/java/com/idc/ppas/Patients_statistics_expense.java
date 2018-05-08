package com.idc.ppas;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Patients_statistics_expense {

    @Id
    @GeneratedValue
    private Integer id;

    private String healthCardNumber;

    private String outpatientExpenseProp;

    private String inpatientExpenseProp;

    private String personalExpenseProp;

    // Constructor
    public Patients_statistics_expense(){
    }

    // Getter

    public Integer getId() {
        return id;
    }

    public String getHealthCardNumber() {
        return healthCardNumber;
    }

    public String getOutpatientExpenseProp() {
        return outpatientExpenseProp;
    }

    public String getInpatientExpenseProp() {
        return inpatientExpenseProp;
    }

    public String getPersonalExpenseProp() {
        return personalExpenseProp;
    }
}