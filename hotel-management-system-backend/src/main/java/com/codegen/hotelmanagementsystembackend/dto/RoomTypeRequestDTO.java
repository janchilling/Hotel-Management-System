package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
public class RoomTypeRequestDTO {

    private Integer roomTypeId;
    private String roomTypeName;
    private String roomDimensions;
    private Integer maxAdults;
    private Set<SeasonRoomTypeDTO> seasonRoomTypes = new HashSet<>();
    private List<RoomTypeImagesDTO> roomTypeImages = new ArrayList<>();
    private Integer contractId;

}
