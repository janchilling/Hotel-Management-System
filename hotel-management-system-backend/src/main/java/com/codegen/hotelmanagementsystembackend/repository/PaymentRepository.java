package com.codegen.hotelmanagementsystembackend.repository;

import com.codegen.hotelmanagementsystembackend.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}
