package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.ContractResponseDTO;
import com.codegen.hotelmanagementsystembackend.dto.HotelImageDTO;
import com.codegen.hotelmanagementsystembackend.dto.HotelRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.HotelResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Hotel;
import com.codegen.hotelmanagementsystembackend.services.ContractService;
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
    private final ContractService contractService;

    @PostMapping("/")
    public StandardResponse<Hotel> createHotel(@RequestBody HotelRequestDTO hotelRequestDTO){
        return hotelService.createHotel(hotelRequestDTO);
    }

    @PutMapping("/{hotelId}")
    public StandardResponse<Hotel> updateHotel(@PathVariable Integer hotelId, @RequestBody HotelRequestDTO hotelRequestDTO){
        return hotelService.updateHotel(hotelId, hotelRequestDTO);
    }

    @GetMapping("/{hotelId}")
    public StandardResponse<HotelResponseDTO> getHotelById(@PathVariable Integer hotelId){
        return hotelService.getHotelById(hotelId);
    }

    @GetMapping("/{hotelId}/images")
    public StandardResponse<List<HotelImageDTO>> getHotelImagesByHotelId(@PathVariable Integer hotelId){
        return hotelService.getHotelImagesByHotelId(hotelId);
    }

    @GetMapping("/{hotelId}/contracts")
    public StandardResponse<List<ContractResponseDTO>> getContractsByHotelId(@PathVariable Integer hotelId){
        return contractService.getContractsByHotelId(hotelId);
    }
}
