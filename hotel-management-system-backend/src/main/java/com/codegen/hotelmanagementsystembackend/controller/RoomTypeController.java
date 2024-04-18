package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.RoomTypeRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.RoomTypeResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.RoomType;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.services.RoomTypeService;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/roomTypes")
@RequiredArgsConstructor
public class RoomTypeController {

    private final RoomTypeService roomTypeService;

    @PostMapping("/")
    public StandardResponse<List<RoomType>> createRoomType(@RequestBody List<RoomTypeRequestDTO> roomTypeRequestDTOS){
        return roomTypeService.createRoomType(roomTypeRequestDTOS);
    }

    @GetMapping("/{roomTypeId}/availability")
    public StandardResponse<Integer> availableNoOfRooms(
            @PathVariable Integer roomTypeId,
            @RequestParam(required = false) Date checkInDate,
            @RequestParam(required = false) Date checkOutDate,
            @RequestParam(required = false) Integer seasonId) {
        return roomTypeService.getAvailableRoomTypeCount(roomTypeId, checkInDate, checkOutDate, seasonId);
    }

    @GetMapping("/getRoomTypeById/{roomTypeId}")
    public StandardResponse<RoomTypeResponseDTO> getRoomTypeById(@PathVariable Integer roomTypeId) {
       return roomTypeService.getRoomTypeById(roomTypeId);
    }

    @PutMapping("/batch")
    public StandardResponse<List<RoomType>> updateRoomTypes(@RequestBody List<RoomTypeRequestDTO> roomTypeRequestDTOS) {
        return roomTypeService.updateRoomTypes(roomTypeRequestDTOS);
    }
}
