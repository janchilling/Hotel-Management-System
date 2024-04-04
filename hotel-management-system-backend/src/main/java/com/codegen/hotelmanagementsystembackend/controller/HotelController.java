package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.HotelImageDTO;
import com.codegen.hotelmanagementsystembackend.dto.HotelRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.HotelResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Hotel;
import com.codegen.hotelmanagementsystembackend.services.HotelService;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/hotels")
@RequiredArgsConstructor
public class HotelController {

    private final HotelService hotelService;

    @PostMapping("/")
    public StandardResponse<Hotel> createHotel(@RequestBody HotelRequestDTO hotelRequestDTO){
        return hotelService.createHotel(hotelRequestDTO);
    }

    @GetMapping("/{hotelId}")
    public ResponseEntity<HotelResponseDTO> getHotelById(@PathVariable Integer hotelId){
        return ResponseEntity.ok(hotelService.getHotelById(hotelId));
    }

    @GetMapping("/{hotelId}/images")
    public StandardResponse<List<HotelImageDTO>> getHotelImagesByHotelId(@PathVariable Integer hotelId){
        return hotelService.getHotelImagesByHotelId(hotelId);
    }
}
