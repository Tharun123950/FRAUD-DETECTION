package com.java.ai.frauddetection.controller;

import com.java.ai.frauddetection.model.BankTransaction;
import com.java.ai.frauddetection.service.BankFraudService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bank")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BankFraudController {

    private final BankFraudService service;

    @PostMapping("/check")
    public ResponseEntity<BankTransaction> checkFraud(@RequestBody BankTransaction transaction) {
        return ResponseEntity.ok(service.processTransaction(transaction));
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<BankTransaction>> getAllTransactions() {
        return ResponseEntity.ok(service.getAllTransactions());
    }

    @GetMapping("/search")
    public ResponseEntity<List<BankTransaction>> search(@RequestParam String accountNumber) {
        return ResponseEntity.ok(service.searchTransactions(accountNumber));
    }
}
