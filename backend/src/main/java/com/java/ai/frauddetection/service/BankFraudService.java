package com.java.ai.frauddetection.service;

import com.java.ai.frauddetection.model.BankTransaction;
import com.java.ai.frauddetection.repository.BankTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BankFraudService {

    private final BankTransactionRepository repository;

    public BankTransaction processTransaction(BankTransaction transaction) {
        int score = 0;

        // Amount Risk
        if (transaction.getAmount() > 100000)
            score += 30;
        if (transaction.getAmount() > 200000)
            score += 50;

        // Risk Engine Score
        if (transaction.getRiskScore() > 70)
            score += 30;
        if (transaction.getRiskScore() > 85)
            score += 50;

        // CIBIL Score (300-900)
        if (transaction.getCibilScore() < 650 && transaction.getCibilScore() >= 300)
            score += 40;
        if (transaction.getCibilScore() < 550 && transaction.getCibilScore() >= 300)
            score += 60;
        if (transaction.getCibilScore() > 750)
            score -= 20;

        // Combined High Risk Condition
        if (transaction.getCibilScore() < 600 && transaction.getAmount() > 150000) {
            score += 50;
        }

        transaction.setCalculatedScore(score);

        if (score >= 70) {
            transaction.setStatus("FRAUD");
        } else {
            transaction.setStatus("SAFE");
        }
        return repository.save(transaction);
    }

    public List<BankTransaction> getAllTransactions() {
        return repository.findAll();
    }

    public List<BankTransaction> searchTransactions(String accountNumber) {
        return repository.findByAccountNumber(accountNumber);
    }
}
