package com.java.ai.frauddetection.service;

import com.java.ai.frauddetection.model.HospitalClaim;
import com.java.ai.frauddetection.repository.HospitalClaimRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HospitalFraudService {

    private final HospitalClaimRepository repository;

    public HospitalClaim processClaim(HospitalClaim claim) {
        // Check for duplicate claim (same patient name and amount)
        Optional<HospitalClaim> existing = repository.findByPatientNameAndClaimAmount(
                claim.getPatientName(), claim.getClaimAmount());

        int score = 0;
        if (claim.getClaimAmount() > 50000)
            score += 40;
        if (claim.getClaimAmount() > 100000)
            score += 60;
        if ("Emergency".equalsIgnoreCase(claim.getTreatmentType()))
            score += 30;

        claim.setCalculatedScore(score);

        if (score >= 70 || existing.isPresent()) {
            claim.setStatus("FRAUD");
            if (existing.isPresent()) {
                claim.setDuplicate(true);
            }
        } else {
            claim.setStatus("SAFE");
        }
        return repository.save(claim);
    }

    public List<HospitalClaim> getAllClaims() {
        return repository.findAll();
    }

    public List<HospitalClaim> searchClaims(String patientName) {
        return repository.findByPatientName(patientName);
    }
}
