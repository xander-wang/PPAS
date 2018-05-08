package com.idc.ppas;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Patients_clustering {

    @Id
    @GeneratedValue
    public Integer id;

    public String combo;

    public String twoDcentro1;

    public String twoDscatter1;

    public String twoDcentro2;

    public String twoDscatter2;

    public String twoDcentro3;

    public String twoDscatter3;

    public String threeDcentro1;

    public String threeDscatter1;

    public String threeDcentro2;

    public String threeDscatter2;

    public String threeDcentro3;

    public String threeDscatter3;

    // Constructor
    public Patients_clustering(){

    }

    // Getter


    public Integer getId() {
        return id;
    }

    public String getCombo() {
        return combo;
    }

    public String getTwoDcentro1() {
        return twoDcentro1;
    }

    public String getTwoDscatter1() {
        return twoDscatter1;
    }

    public String getTwoDcentro2() {
        return twoDcentro2;
    }

    public String getTwoDscatter2() {
        return twoDscatter2;
    }

    public String getTwoDcentro3() {
        return twoDcentro3;
    }

    public String getTwoDscatter3() {
        return twoDscatter3;
    }

    public String getThreeDcentro1() {
        return threeDcentro1;
    }

    public String getThreeDscatter1() {
        return threeDscatter1;
    }

    public String getThreeDcentro2() {
        return threeDcentro2;
    }

    public String getThreeDscatter2() {
        return threeDscatter2;
    }

    public String getThreeDcentro3() {
        return threeDcentro3;
    }

    public String getThreeDscatter3() {
        return threeDscatter3;
    }
}
