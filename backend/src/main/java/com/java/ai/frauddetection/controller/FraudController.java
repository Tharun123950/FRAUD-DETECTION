package com.java.ai.frauddetection.controller;

import com.java.ai.frauddetection.model.BankTransaction;
import com.java.ai.frauddetection.model.HospitalClaim;
import com.java.ai.frauddetection.service.BankFraudService;
import com.java.ai.frauddetection.service.HospitalFraudService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FraudController {

    private final BankFraudService bankService;
    private final HospitalFraudService hospitalService;

    @PostMapping("/predict")
    public ResponseEntity<?> predict(@RequestBody Map<String, Object> data) {
        if (data.containsKey("accountNumber")) {
            BankTransaction transaction = new BankTransaction();
            transaction.setAccountNumber((String) data.get("accountNumber"));
            transaction.setAmount(Double.parseDouble(data.get("amount").toString()));
            transaction.setRiskScore(Integer.parseInt(data.get("riskScore").toString()));
            transaction.setCibilScore(Integer.parseInt(data.get("cibilScore").toString()));
            return ResponseEntity.ok(bankService.processTransaction(transaction));
        } else if (data.containsKey("patientName")) {
            HospitalClaim claim = new HospitalClaim();
            claim.setPatientName((String) data.get("patientName"));
            claim.setClaimAmount(Double.parseDouble(data.get("claimAmount").toString()));
            claim.setTreatmentType((String) data.get("treatmentType"));
            return ResponseEntity.ok(hospitalService.processClaim(claim));
        }
        return ResponseEntity.badRequest()
                .body(Map.of("error", "Invalid request data. Must provide either accountNumber or patientName."));
    }

    @GetMapping("/fraud")
    public ResponseEntity<?> getFraudRecords(@RequestParam(required = false) String accountNumber,
            @RequestParam(required = false) String patientName) {
        if (accountNumber != null) {
            return ResponseEntity.ok(bankService.searchTransactions(accountNumber));
        } else if (patientName != null) {
            return ResponseEntity.ok(hospitalService.searchClaims(patientName));
        }
        return ResponseEntity.badRequest().body(Map.of("error", "Provide accountNumber or patientName for search."));
    }
}
