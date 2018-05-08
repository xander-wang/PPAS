package com.idc.ppas;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Medical_event_brief_data {

    @Id
    @GeneratedValue
    private Integer id;

    private String healthCardNumber;

    private String medInstituteCode;

    private String patientTypeCode;

    private String visitDatetime;

    private String inhospitalDatetime;

    private String outhospitalDatetime;

    private String attackDatetime;

    private String MWMDiagnosisCode;

    // Constructor
    private Medical_event_brief_data() {
    }

    // Getter

    public Integer getId() {
        return id;
    }

    public String getHealthCardNumber() {
        return healthCardNumber;
    }

    public String getMedInstituteCode() {
        switch (medInstituteCode) {
            case "A":
                return "医院";
            case "B":
                return "社区卫生服务中心（站）";
            case "C":
                return "卫生院";
            case "D":
                return "诊所";
            default:
                return "急救中心";
        }
    }

    public String getPatientTypeCode() {
        switch (patientTypeCode) {
            case "1":
                return "门诊";
            case "2":
                return "急诊";
            case "3":
                return "住院";
            default:
                return "其他";
        }
    }

    public String getVisitDatetime() {
        return visitDatetime;
    }

    public String getInhospitalDatetime() {
        return inhospitalDatetime;
    }

    public String getOuthospitalDatetime() {
        return outhospitalDatetime;
    }

    public String getAttackDatetime() {
        return attackDatetime;
    }

    public String getMWMDiagnosisCode() {
        return MWMDiagnosisCode;
    }
}
