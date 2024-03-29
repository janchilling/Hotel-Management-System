package com.codegen.hotelmanagementsystembackend.repository;

import com.codegen.hotelmanagementsystembackend.entities.RoomType;
import com.codegen.hotelmanagementsystembackend.entities.Season;
import com.codegen.hotelmanagementsystembackend.entities.SeasonRoomType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeasonRoomTypeRepository extends JpaRepository<SeasonRoomType, Integer> {
    SeasonRoomType findSeasonRoomTypeBySeasonAndRoomType(Season season, RoomType roomType);
}
