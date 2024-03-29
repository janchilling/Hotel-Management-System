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
    public ResponseEntity<List<RoomType>> createRoomType(@RequestBody List<RoomTypeRequestDTO> roomTypeRequestDTOS){
        return ResponseEntity.ok(roomTypeService.createRoomType(roomTypeRequestDTOS));
    }

    @GetMapping("/{roomTypeId}/availableNoOfRooms/{checkInDate}/{checkOutDate}/{seasonId}")
    public StandardResponse<Integer> availableNoOfRooms(@PathVariable Integer roomTypeId,
                                                        @PathVariable Date checkInDate,
                                                        @PathVariable Date checkOutDate,
                                                        @PathVariable Integer seasonId) {
        return roomTypeService.getAvailableRoomTypeCount(roomTypeId, checkInDate, checkOutDate, seasonId);
    }

    @GetMapping("/getRoomTypeById/{roomTypeId}")
    public ResponseEntity<StandardResponse<RoomTypeResponseDTO>> getRoomTypeById(@PathVariable Integer roomTypeId) {
        try {
            RoomTypeResponseDTO roomTypeResponseDTO = roomTypeService.getRoomTypeById(roomTypeId);
            return ResponseEntity.ok(new StandardResponse<>(200, "Success", roomTypeResponseDTO));
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new StandardResponse<>(404, ex.getMessage(), null));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new StandardResponse<>(500, "Internal Server Error", null));
        }
    }

    @GetMapping("/getRoomTypeByContract/{contractId}")
    public ResponseEntity<StandardResponse<List<RoomTypeResponseDTO>>> getRoomTypeByContract(@PathVariable Integer contractId) {
        try {
            List<RoomTypeResponseDTO> roomTypeResponseDTOList = roomTypeService.getRoomTypeByContract(contractId);
            return ResponseEntity.ok(new StandardResponse<>(200, "Success", roomTypeResponseDTOList));
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new StandardResponse<>(404, ex.getMessage(), null));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new StandardResponse<>(500, "Internal Server Error", null));
        }
    }
//    @GetMapping("/getRoomTypeById/{roomTypeId}")
//    public ResponseEntity<StandardResponse<RoomTypeResponseDTO>> getRoomTypeById(@PathVariable Integer roomTypeId) {
//        try {
//            RoomTypeResponseDTO roomTypeResponseDTO = roomTypeService.getRoomTypeById(roomTypeId);
//            return ResponseEntity.ok(new StandardResponse<>(200, "Success", roomTypeResponseDTO));
//        } catch (ResourceNotFoundException ex) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                    .body(new StandardResponse<>(404, ex.getMessage(), null));
//        } catch (Exception ex) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new StandardResponse<>(500, "Internal Server Error", null));
//        }
//    }
//    @GetMapping("/getRoomTypeByContract/{contractId}")
//    public ResponseEntity<List<RoomTypeResponseDTO>> getRoomTypeByContract(@PathVariable Integer contractId) {
//        return ResponseEntity.ok(roomTypeService.getRoomTypeByContract(contractId));
//    }

    @GetMapping("/getRoomTypeByHotel/{hotelId}")
    public ResponseEntity<List<List<RoomTypeResponseDTO>>> getRoomTypeByHotel(@PathVariable Integer hotelId) {
        return ResponseEntity.ok(roomTypeService.getRoomTypeByHotel(hotelId));
    }
}
