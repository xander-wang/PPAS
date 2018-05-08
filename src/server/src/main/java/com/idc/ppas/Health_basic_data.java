package com.idc.ppas;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Health_basic_data {

    @Id
    @GeneratedValue
    private Integer id;

    private String healthCardNumber;

    private String ABOBloodTypeCode;

    private String RhBloodTypeCode;

    private String infectiousDiseaseHistory;

    private String vaccinationHistory;

    private String operationHistory;

    private String transfusionHistory;

    private String allergyHistory;

    private String familyHistory;

    private String diseaseHistory;

    // Constructor
    private Health_basic_data(){
    }

    // Getter

    public Integer getId() {
        return id;
    }

    public String getHealthCardNumber() {
        return healthCardNumber;
    }

    public String getABOBloodTypeCode() {
        switch (ABOBloodTypeCode) {
            case "1":
                return "A";
            case "2":
                return "B";
            case "3":
                return "O";
            case "4":
                return "AB";
            default:
                return "不详";
        }
    }

    public String getRhBloodTypeCode() {
        switch (RhBloodTypeCode) {
            case "1":
                return "阴性";
            case "2":
                return "阳性";
            case "3":
                return "不详";
            default:
                return "未查";
        }
    }

    public String getInfectiousDiseaseHistory() {
        switch (infectiousDiseaseHistory) {
            case "1":
                return "有";
            default:
                return "无";
        }
    }

    public String getVaccinationHistory() {
        switch (vaccinationHistory) {
            case "1":
                return "有";
            default:
                return "无";
        }
    }

    public String getOperationHistory() {
        switch (operationHistory) {
            case "1":
                return "有";
            default:
                return "无";
        }
    }

    public String getTransfusionHistory() {
        switch (transfusionHistory) {
            case "1":
                return "有";
            default:
                return "无";
        }
    }

    public String getAllergyHistory() {
        switch (allergyHistory) {
            case "1":
                return "有";
            default:
                return "无";
        }
    }

    public String getFamilyHistory() {
        switch (familyHistory) {
            case "1":
                return "有";
            default:
                return "无";
        }
    }

    public String getDiseaseHistory() {
        return diseaseHistory;
    }
}
