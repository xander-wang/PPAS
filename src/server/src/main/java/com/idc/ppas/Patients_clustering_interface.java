package com.idc.ppas;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Patients_clustering_interface extends JpaRepository<Patients_clustering, Integer> {
    public List<Patients_clustering> findByCombo(String combo);
}
