package com.idc.ppas;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Patient_basic_data {

    @Id
    @GeneratedValue
    private Integer id;

    private String healthProfileId;

    private String patientId;

    private String healthCardNumber;

    private String medInsuranceTypeCode;

    private String patientName;

    private Integer dateOfBirth;

    private String genderCode;

    private String marriageStatusCode;

    private String ethnicityCode;

    private String jobTypeCode;

    private String addressProvince;

    private String patientTel;

    // Constructor
    public Patient_basic_data(){
    }

    // Getter

    public Integer getId() {
        return id;
    }

    public String getHealthProfileId() {
        return healthProfileId;
    }

    public String getPatientId() {
        return patientId;
    }

    public String getHealthCardNumber() {
        return healthCardNumber;
    }

    public String getMedInsuranceTypeCode() {
        switch (medInsuranceTypeCode) {
            case "01":
                return "城镇职工基本医疗保险";
            case "02":
                return "城镇居民基本医疗保险";
            case "03":
                return "新型农村合作医疗";
            case "04":
                return "公务员医疗补助";
            case "05":
                return "企业补充医疗保险";
            case "06":
                return "大额补充医疗保险";
            case "07":
                return "商业医疗保险";
            default:
                return "其他";
        }
    }

    public String getPatientName() {
        return patientName;
    }

    public Integer getDateOfBirth() {
        return dateOfBirth;
    }

    public String getGenderCode() {
        return genderCode;
    }

    public String getMarriageStatusCode() {
        switch (marriageStatusCode) {
            case "10":
                return "未婚";
            case "20":
                return "已婚";
            case "21":
                return "初婚";
            case "22":
                return "再婚";
            case "23":
                return "复婚";
            case "30":
                return "丧偶";
            case "40":
                return "离婚";
            default:
                return "未知";
        }
    }

    public String getEthnicityCode() {
        switch (ethnicityCode) {
            case "01":
                return "汉族";
            case "02":
                return "蒙古族";
            default:
                return "回族";
        }
    }

    public String getJobTypeCode() {
        switch (jobTypeCode) {
            case "11":
                return "国家公务员";
            case "13":
                return "专业技术人员";
            case "17":
                return "职员";
            case "21":
                return "企业管理人员";
            case "24":
                return "工人";
            case "27":
                return "农民";
            case "31":
                return "学生";
            case "37":
                return "现役军人";
            case "51":
                return "自由职业者";
            case "54":
                return "个体经营者";
            case "70":
                return "无业人员";
            case "80":
                return "退（离）休人员";
            default:
                return "其他";
        }
    }

    public String getAddressProvince() {
        return addressProvince;
    }

    public String getPatientTel() {
        return patientTel;
    }
}
