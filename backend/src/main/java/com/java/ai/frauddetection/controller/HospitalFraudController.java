package com.java.ai.frauddetection.controller;

import com.java.ai.frauddetection.model.HospitalClaim;
import com.java.ai.frauddetection.service.HospitalFraudService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospital")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class HospitalFraudController {

    private final HospitalFraudService service;

    @PostMapping("/check")
    public ResponseEntity<HospitalClaim> checkFraud(@RequestBody HospitalClaim claim) {
        return ResponseEntity.ok(service.processClaim(claim));
    }

    @GetMapping("/claims")
    public ResponseEntity<List<HospitalClaim>> getAllClaims() {
        return ResponseEntity.ok(service.getAllClaims());
    }

    @GetMapping("/search")
    public ResponseEntity<List<HospitalClaim>> search(@RequestParam String patientName) {
        return ResponseEntity.ok(service.searchClaims(patientName));
    }
}
