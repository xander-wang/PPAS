package com.idc.ppas;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Diseases {

    @Id
    @GeneratedValue
    public Integer id;

    public String icdCode;

    public String diseaseName;

    public String patientQuantity;

    // Constructor
    public Diseases(){

    }

    // Getter

    public Integer getId() {
        return id;
    }

    public String getIcdCode() {
        return icdCode;
    }

    public String getDiseaseName() {
        return diseaseName;
    }

    public String getPatientQuantity() {
        return patientQuantity;
    }
}
