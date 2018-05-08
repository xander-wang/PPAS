package com.idc.ppas;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Diseases_statistics {

    @Id
    @GeneratedValue
    public Integer id;

    public String typicalDiseaseQuantity;

    public String typicalDiseaseCategory;

    // Constructor
    public Diseases_statistics(){

    }

    // Getter

    public Integer getId() {
        return id;
    }

    public String getTypicalDiseaseQuantity() {
        return typicalDiseaseQuantity;
    }

    public String getTypicalDiseaseCategory() {
        return typicalDiseaseCategory;
    }
}
