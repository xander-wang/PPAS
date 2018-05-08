package com.idc.ppas;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Patients_statistics_gender {

    @Id
    @GeneratedValue
    public Integer id;

    public String male;

    public String female;

    // Constructor
    public Patients_statistics_gender(){
    }

    // Getter

    public Integer getId() {
        return id;
    }

    public String getMale() {
        return male;
    }

    public String getFemale() {
        return female;
    }
}

