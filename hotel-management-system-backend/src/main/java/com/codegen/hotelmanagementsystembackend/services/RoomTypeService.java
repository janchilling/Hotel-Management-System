package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.RoomTypeRequestDTO;

import java.util.List;

public interface RoomTypeService {

    String createRoomType(List<RoomTypeRequestDTO> roomTypeRequestDTOS);
}
