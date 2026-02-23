package com.java.ai.frauddetection.repository;

import com.java.ai.frauddetection.model.HospitalClaim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HospitalClaimRepository extends JpaRepository<HospitalClaim, Long> {
    Optional<HospitalClaim> findByPatientNameAndClaimAmount(String patientName, double claimAmount);

    List<HospitalClaim> findByPatientName(String patientName);
}
