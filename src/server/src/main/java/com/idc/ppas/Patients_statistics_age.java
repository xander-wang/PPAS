package com.idc.ppas;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Patients_statistics_age {

    @Id
    @GeneratedValue
    public Integer id;

    public String _0to10;

    public String _10to20;

    public String _20to30;

    public String _30to40;

    public String _40to50;

    public String _50to60;

    public String _60to70;

    public String _70to80;

    public String _80to90;

    public String _90to100;

    public String _100to110;

    public String _110to120;

    // Constructor
    public Patients_statistics_age(){

    }

    // Getter

    public Integer getId() {
        return id;
    }

    public String get_0to10() {
        return _0to10;
    }

    public String get_10to20() {
        return _10to20;
    }

    public String get_20to30() {
        return _20to30;
    }

    public String get_30to40() {
        return _30to40;
    }

    public String get_40to50() {
        return _40to50;
    }

    public String get_50to60() {
        return _50to60;
    }

    public String get_60to70() {
        return _60to70;
    }

    public String get_70to80() {
        return _70to80;
    }

    public String get_80to90() {
        return _80to90;
    }

    public String get_90to100() {
        return _90to100;
    }

    public String get_100to110() {
        return _100to110;
    }

    public String get_110to120() {
        return _110to120;
    }
}
