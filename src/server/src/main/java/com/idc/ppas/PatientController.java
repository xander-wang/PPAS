package com.idc.ppas;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.annotation.MultipartConfig;
import java.util.List;

@RestController
@RequestMapping("/patients")
@CrossOrigin
public class PatientController {

    @Autowired
    private Patient_basic_data_interface basic;
    @Autowired
    private Medical_expense_data_interface expense;
    @Autowired
    private Medical_event_brief_data_interface event;
    @Autowired
    private Health_basic_data_interface health;
    @Autowired
    private Patients_statistics_expense_interface pat_sta_expense;
    @Autowired
    private Patients_statistics_gender_interface pat_sta_gender;
    @Autowired
    private Patients_statistics_age_interface pat_sta_age;
    @Autowired
    private Patients_statistics_ABObloodtype_interface pat_sta_ABO;
    @Autowired
    private Patients_statistics_Rhbloodtype_interface pat_sta_Rh;
    @Autowired
    private Patients_statistics_infdiseasehis_interface pat_sta_inf;
    @Autowired
    private Patients_statistics_vacchis_interface pat_sta_vac;
    @Autowired
    private Patients_statistics_operationhis_interface pat_sta_ope;
    @Autowired
    private Patients_statistics_transfusionhis_interface pat_sta_tra;
    @Autowired
    private Patients_statistics_allergyhis_interface pat_sta_all;
    @Autowired
    private Patients_statistics_familyhis_interface pat_sta_fam;
    @Autowired
    private Patients_geocoord_interface pat_geo;
    @Autowired
    private Diseases_statistics_interface dis_sta;
    @Autowired
    private Diseases_interface dis;
    @Autowired
    private Patients_clustering_interface pat_clu;
    @Autowired
    private Diseases_relations_interface dis_rel;
    @Autowired
    private Diagnosis_interface dia;




    @PostMapping(value = "/basic")
    public List<Patient_basic_data> patient_basic_data_QueryByHealthCardNumber(@RequestParam("id") String id) {
        return basic.findByHealthCardNumber(id);
    }

    @PostMapping(value = "/expense")
    public List<Medical_expense_data> medical_expense_data_QueryByHealthCardNumber(@RequestParam("id") String id) {
        return expense.findByHealthCardNumber(id);
    }

    @PostMapping(value = "/event")
    public List<Medical_event_brief_data> medical_event_brief_data_QueryByHealthCardNumber(@RequestParam("id") String id) {
        return event.findByHealthCardNumber(id);
    }

    @PostMapping(value = "/health")
    public List<Health_basic_data> health_basic_data_QueryByHealthCardNumber(@RequestParam("id") String id) {
        return health.findByHealthCardNumber(id);
    }

    @PostMapping(value = "/statistics/expense")
    public List<Patients_statistics_expense> patients_statistics_expenses_QueryByHealthCardNumber(@RequestParam("id") String id){
        return pat_sta_expense.findByHealthCardNumber(id);
    }

    @PostMapping(value = "/statistics/gender")
    public List<Patients_statistics_gender> patients_statistics_gender_Query(@RequestParam("pwd") String pwd){
        if (pwd.equals("jimengo")){
            return pat_sta_gender.findAll();
        }
        return null;
    }

    @PostMapping(value = "/statistics/age")
    public List<Patients_statistics_age> patients_statistics_age_Query(@RequestParam("pwd") String pwd){
        if (pwd.equals("jimengo")){
            return pat_sta_age.findAll();
        }
        return null;
    }

    @PostMapping(value = "/statistics/ABObloodtype")
    public List<Patients_statistics_ABObloodtype> patients_statistics_abObloodtype_Query(@RequestParam("pwd") String pwd){
        if(pwd.equals("jimengo")){
            return pat_sta_ABO.findAll();
        }
        return null;
    }

    @PostMapping(value = "/statistics/Rhbloodtype")
    public List<Patients_statistics_Rhbloodtype> patients_statistics_rhbloodtype_Query(@RequestParam("pwd") String pwd){
        if(pwd.equals("jimengo")){
            return pat_sta_Rh.findAll();
        }
        return null;
    }

    @PostMapping(value = "/statistics/infdiseasehis")
    public List<Patients_statistics_infdiseasehis> patients_statistics_infdiseasehis_Query(@RequestParam("pwd") String pwd) {
        if (pwd.equals("jimengo")) {
            return pat_sta_inf.findAll();
        }
        return null;
    }

    @PostMapping(value = "/statistics/vacchis")
    public List<Patients_statistics_vacchis> patients_statistics_vacchis_Query(@RequestParam("pwd") String pwd){
        if(pwd.equals("jimengo")){
            return pat_sta_vac.findAll();
        }
        return null;
    }

    @PostMapping(value = "/statistics/operationhis")
    public List<Patients_statistics_operationhis> patients_statistics_operationhis_Query(@RequestParam("pwd") String pwd){
        if(pwd.equals("jimengo")){
            return pat_sta_ope.findAll();
        }
        return null;
    }

    @PostMapping(value = "/statistics/transfusionhis")
    public List<Patients_statistics_transfusionhis> patients_statistics_transfusionhis_Query(@RequestParam("pwd") String pwd){
        if(pwd.equals(("jimengo"))){
            return pat_sta_tra.findAll();
        }
        return null;
    }

    @PostMapping(value = "/statistics/allergyhis")
    public List<Patients_statistics_allergyhis> patients_statistics_allergyhis_Query(@RequestParam("pwd") String pwd){
        if(pwd.equals("jimengo")){
            return pat_sta_all.findAll();
        }
        return null;
    }

    @PostMapping(value = "/statistics/familyhis")
    public List<Patients_statistics_familyhis> patients_statistics_familyhis_Query(@RequestParam("pwd") String pwd){
        if(pwd.equals("jimengo")){
            return pat_sta_fam.findAll();
        }
        return null;
    }

    @PostMapping(value = "/geocoord")
    public List<Patients_geocoord> patients_geocoord_Query(@RequestParam("pwd") String pwd){
        if(pwd.equals("jimengo")){
            return pat_geo.findAll();
        }
        return null;
    }

    @PostMapping(value = "/diseases/statistics")
    public List<Diseases_statistics> diseases_statistics_Query(@RequestParam("pwd") String pwd){
        if(pwd.equals("jimengo")){
            return dis_sta.findAll();
        }
        return null;
    }

    @PostMapping(value = "/diseases")
    public List<Diseases> diseases_Query(@RequestParam("icd") String icd){
        return dis.findByIcdCode(icd);
    }


    @PostMapping(value = "/clustering")
    public List<Patients_clustering> patients_clustering_Query(@RequestParam("combo") String combo) {
        return pat_clu.findByCombo(combo);
    }

    @PostMapping(value = "/diseases/relations")
    public List<Diseases_relations> diseases_relations_Query(@RequestParam("pwd") String pwd){
        if (pwd.equals("jimengo")){
            return dis_rel.findAll();
        }
        return null;
    }

    @PostMapping(value = "/diagnosis")
    public List<Diagnosis> diagnoses_Query(@RequestParam("id") Integer id){
        return dia.findById(id);
    }

}