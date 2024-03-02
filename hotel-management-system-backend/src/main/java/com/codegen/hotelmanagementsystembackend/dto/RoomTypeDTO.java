package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.util.Set;

@Data
public class RoomTypeDTO {

    private Integer roomTypeId;
    private String roomTypeName;
    private String roomDimensions;
    private Double roomTypePrice;
    private Integer numberOfRooms;
    private Integer maxAdults;
    private Set<SeasonRoomTypeDTO> supplementsRoomtype;
}
