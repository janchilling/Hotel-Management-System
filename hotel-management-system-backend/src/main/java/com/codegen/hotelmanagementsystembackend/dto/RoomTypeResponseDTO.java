package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.util.List;

@Data
public class RoomTypeResponseDTO {

    private Integer roomTypeId;
    private String roomTypeName;
    private String roomDimensions;
    private Integer maxAdults;
    private Integer contractId;
    private String contractStatus;
    private Integer hotelId;
    private String hotelName;
    private List<RoomTypeImagesResponseDTO> roomTypeImages;
    private List<SeasonRoomTypeResponseDTO> seasonRoomtype;

}
