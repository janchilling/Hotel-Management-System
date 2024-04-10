package com.codegen.hotelmanagementsystembackend.repository;

import com.codegen.hotelmanagementsystembackend.entities.Contract;
import com.codegen.hotelmanagementsystembackend.entities.Season;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface SeasonRepository extends JpaRepository<Season, Integer> {

    List<Season> findAllSeasonsByContractContractId(Integer contractId);

    Integer getSeasonIdByContractContractIdAndStartDateAndEndDate(Integer contractId, Date checkInDate, Date checkOutDate);
}
