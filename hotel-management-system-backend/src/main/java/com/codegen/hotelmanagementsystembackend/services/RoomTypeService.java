package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.RoomTypeDTO;

import java.util.List;

public interface RoomTypeService {

    String createRoomType(List<RoomTypeDTO> roomTypeDTOS);
}
