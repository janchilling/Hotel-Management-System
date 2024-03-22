package com.codegen.hotelmanagementsystembackend.repository;

import com.codegen.hotelmanagementsystembackend.entities.Contract;
import com.codegen.hotelmanagementsystembackend.entities.Supplement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupplementRepository extends JpaRepository<Supplement, Integer> {
    Supplement findBySupplementNameAndContract(String supplementName, Contract contract);

    List<Supplement> findAllSupplementsByContractContractId(Integer contractId);
}
