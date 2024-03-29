package com.codegen.hotelmanagementsystembackend.repository;

import com.codegen.hotelmanagementsystembackend.entities.BookingRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;

public interface BookingRoomRepository extends JpaRepository<BookingRoom, Integer> {

    @Query("SELECT SUM(br.noOfRooms) FROM BookingRoom br WHERE br.roomType.roomTypeId = :roomTypeId " +
            "AND br.checkInDate <= :checkOutDate AND br.checkOutDate >= :checkInDate")
    Integer countBookedRooms(@Param("roomTypeId") Integer roomTypeId,
                             @Param("checkInDate") Date checkInDate,
                             @Param("checkOutDate") Date checkOutDate);

}
