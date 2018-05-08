package com.idc.ppas;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Patients_geocoord {

    @Id
    @GeneratedValue
    public Integer id;

    public String healthCardNumber;

    public String coordinates;

    // Constructor
    public Patients_geocoord(){

    }

    // Getter

    public Integer getId() {
        return id;
    }

    public String getHealthCardNumber() {
        return healthCardNumber;
    }

    public String getCoordinates() {
        return coordinates;
    }
}
