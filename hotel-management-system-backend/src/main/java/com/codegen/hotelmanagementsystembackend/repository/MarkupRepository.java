package com.codegen.hotelmanagementsystembackend.repository;

import com.codegen.hotelmanagementsystembackend.entities.Markup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MarkupRepository extends JpaRepository<Markup, Integer> {
    List<Markup> findAllMarkupsByContractContractId(Integer contractId);
}
