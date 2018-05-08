package com.idc.ppas;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Patients_statistics_ABObloodtype {

    @Id
    @GeneratedValue
    public Integer id;

    public String A;

    public String B;

    public String O;

    public String AB;

    public String unknown;

    // Constructor
    public Patients_statistics_ABObloodtype(){

    }

    // Getter

    public Integer getId() {
        return id;
    }

    public String getA() {
        return A;
    }

    public String getB() {
        return B;
    }

    public String getO() {
        return O;
    }

    public String getAB() {
        return AB;
    }

    public String getUnknown() {
        return unknown;
    }
}
