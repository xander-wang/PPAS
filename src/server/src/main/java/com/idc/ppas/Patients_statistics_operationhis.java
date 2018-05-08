package com.idc.ppas;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Patients_statistics_operationhis {

    @Id
    @GeneratedValue
    public Integer id;

    public String p1;

    public String n0;

    // Constructor
    public Patients_statistics_operationhis(){

    }

    // Getter

    public Integer getId() {
        return id;
    }

    public String getP1() {
        return p1;
    }

    public String getN0() {
        return n0;
    }
}
