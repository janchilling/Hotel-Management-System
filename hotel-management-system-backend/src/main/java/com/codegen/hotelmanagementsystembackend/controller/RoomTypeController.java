package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.RoomTypeRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.RoomTypeResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.RoomType;
import com.codegen.hotelmanagementsystembackend.services.RoomTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/roomTypes")
@RequiredArgsConstructor
public class RoomTypeController {

    private final RoomTypeService roomTypeService;

    @PostMapping("/addRoomType")
    public ResponseEntity<List<RoomType>> createRoomType(@RequestBody List<RoomTypeRequestDTO> roomTypeRequestDTOS){
        return ResponseEntity.ok(roomTypeService.createRoomType(roomTypeRequestDTOS));
    }

    @GetMapping("/getRoomTypeById/{roomTypeId}")
    public ResponseEntity<RoomTypeResponseDTO> getRoomTypeById(@PathVariable Integer roomTypeId){
        return ResponseEntity.ok(roomTypeService.getRoomTypeById(roomTypeId));
    }

    @GetMapping("/getRoomTypeByContract/{contractId}")
    public ResponseEntity<List<RoomTypeResponseDTO>> getRoomTypeByContract(@PathVariable Integer contractId) {
        return ResponseEntity.ok(roomTypeService.getRoomTypeByContract(contractId));
    }

    @GetMapping("/getRoomTypeByHotel/{hotelId}")
    public ResponseEntity<List<List<RoomTypeResponseDTO>>> getRoomTypeByHotel(@PathVariable Integer hotelId) {
        return ResponseEntity.ok(roomTypeService.getRoomTypeByHotel(hotelId));
    }
}
