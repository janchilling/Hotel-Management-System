package com.codegen.hotelmanagementsystembackend.repository;

import com.codegen.hotelmanagementsystembackend.entities.Contract;
import com.codegen.hotelmanagementsystembackend.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.List;

public interface ContractRepository extends JpaRepository<Contract, Integer> {
    boolean existsByHotelHotelIdAndContractStatus(Integer hotelId, String active);

    List<Contract> findAllContractsByHotelHotelId(Integer hotelId);

    boolean existsByHotelHotelIdAndStartDateBeforeAndEndDateAfter(Integer hotelId, Date endDate, Date startDate);
}

