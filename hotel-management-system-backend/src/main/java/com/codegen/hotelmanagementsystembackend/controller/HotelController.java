package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.HotelRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.HotelResponseDTO;
import com.codegen.hotelmanagementsystembackend.services.HotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/hotels")
@RequiredArgsConstructor
public class HotelController {

    private final HotelService hotelService;

    @PostMapping("/addHotel")
    public ResponseEntity<?> createHotel(@RequestBody HotelRequestDTO hotelRequestDTO){
        return ResponseEntity.ok(hotelService.createHotel(hotelRequestDTO));
    }

    @GetMapping("/getHotel/{hotelId}")
    public ResponseEntity<HotelResponseDTO> getHotelById(@PathVariable Integer hotelId){
        return ResponseEntity.ok(hotelService.getHotelById(hotelId));
    }
}
