package com.idc.ppas;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Diseases_relations {

    @Id
    @GeneratedValue
    public Integer id;

    public String diseaseCombo;

    public String comboQuantity;

    public String relatedDiseaseCombo;

    public String relatedDiseaseComboConf;

    public String miniConf;

    // Constructor
    public Diseases_relations(){

    }

    // Getter


    public Integer getId() {
        return id;
    }

    public String getDiseaseCombo() {
        return diseaseCombo;
    }

    public String getComboQuantity() {
        return comboQuantity;
    }

    public String getRelatedDiseaseCombo() {
        return relatedDiseaseCombo;
    }

    public String getRelatedDiseaseComboConf() {
        return relatedDiseaseComboConf;
    }

    public String getMiniConf() {
        return miniConf;
    }
}
