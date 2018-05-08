package com.idc.ppas;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Medical_expense_data {

    @Id
    @GeneratedValue
    private Integer id;

    private String healthCardNumber;

    private String paymentMethodCode;

    private String outpatientExpense;

    private String inpatientExpense;

    private String personalExpense;

    // Constructor
    public Medical_expense_data(){
    }

    // Getter

    public Integer getId() {
        return id;
    }

    public String getHealthCardNumber() {
        return healthCardNumber;
    }

    public String getPaymentMethodCode() {
        switch (paymentMethodCode) {
            case "01":
                return "城镇职工基本医疗保险";
            case "02":
                return "城镇居民基本医疗保险";
            case "03":
                return "新型农村合作医疗";
            case "04":
                return "贫困救助";
            case "05":
                return "商业医疗保险";
            case "06":
                return "全公费";
            case "07":
                return "全自费";
            case "08":
                return "其他社会保险";
            default:
                return "其他";
        }
    }

    public String getOutpatientExpense() {
        return outpatientExpense;
    }

    public String getInpatientExpense() {
        return inpatientExpense;
    }

    public String getPersonalExpense() {
        return personalExpense;
    }
}
