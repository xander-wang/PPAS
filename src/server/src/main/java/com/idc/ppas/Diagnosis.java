package com.idc.ppas;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Diagnosis {

    @Id
    @GeneratedValue
    public Integer id;

    public String diagnosis0;

    public String diagnosis1;


    // Constructor
    public Diagnosis(){

    }

    // Getter

    public Integer getId() {
        return id;
    }

    public String getDiagnosis0() {
        return diagnosis0;
    }

    public String getDiagnosis1() {
        return diagnosis1;
    }
}
