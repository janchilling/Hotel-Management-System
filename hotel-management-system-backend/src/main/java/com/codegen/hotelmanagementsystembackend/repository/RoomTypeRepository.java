package com.codegen.hotelmanagementsystembackend.repository;

import com.codegen.hotelmanagementsystembackend.entities.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.List;

public interface RoomTypeRepository extends JpaRepository<RoomType, Integer> {
    List<RoomType> findAllRoomTypesByContractContractId(Integer contractId);

}
