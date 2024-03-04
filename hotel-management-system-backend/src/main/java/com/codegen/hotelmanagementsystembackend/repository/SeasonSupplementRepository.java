package com.codegen.hotelmanagementsystembackend.repository;

import com.codegen.hotelmanagementsystembackend.entities.SeasonSupplement;
import com.codegen.hotelmanagementsystembackend.entities.SeasonSupplementKey;
import com.codegen.hotelmanagementsystembackend.entities.Supplement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeasonSupplementRepository extends JpaRepository<SeasonSupplement, SeasonSupplementKey> {
}
