package com.java.ai.frauddetection.repository;

import com.java.ai.frauddetection.model.BankTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BankTransactionRepository extends JpaRepository<BankTransaction, Long> {
    List<BankTransaction> findByAccountNumber(String accountNumber);
}
