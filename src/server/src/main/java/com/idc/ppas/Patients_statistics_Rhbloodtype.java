package com.idc.ppas;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Patients_statistics_Rhbloodtype {

    @Id
    @GeneratedValue
    public Integer id;

    public String negative;

    public String positive;

    private String unchecked;

    private String unknown;

    // Constructor
    public Patients_statistics_Rhbloodtype(){

    }

    // Getter

    public Integer getId() {
        return id;
    }

    public String getNegative() {
        return negative;
    }

    public String getPositive() {
        return positive;
    }

    public String getUnchecked() {
        return unchecked;
    }

    public String getUnknown() {
        return unknown;
    }
}
