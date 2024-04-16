package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.HotelResponseDTO;
import com.codegen.hotelmanagementsystembackend.dto.SearchResponseDTO;
import com.codegen.hotelmanagementsystembackend.services.HotelService;
import com.codegen.hotelmanagementsystembackend.services.ProductService;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import lombok.RequiredArgsConstructor;
import org.hibernate.sql.ast.tree.predicate.BooleanExpressionPredicate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductsController {

    private final ProductService productService;

    @GetMapping("")
    public StandardResponse<List<SearchResponseDTO>> searchHotels(
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) Integer noOfRooms,
            @RequestParam(required = false) Date checkIn,
            @RequestParam(required = false) Date checkOut) {
        try {
            return productService.searchHotels(destination, noOfRooms, checkIn, checkOut);
        } catch (Exception e) {
            // Log the exception
            // logger.error("An error occurred while searching hotels", e);
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error", null);
        }
    }

    @GetMapping("/admin")
    public StandardResponse<List<SearchResponseDTO>> adminSearchHotels(
            @RequestParam(required = false) String hotel) {
        try {
            return productService.adminSearchHotels(hotel);
        } catch (Exception e) {
            // Log the exception
            // logger.error("An error occurred while searching hotels", e);
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error", null);
        }
    }

    @GetMapping("/{hotelId}")
    public StandardResponse<SearchResponseDTO> getHotelByIdActive(@PathVariable Integer hotelId) {
        try {
            return productService.getHotelByIdActive(hotelId);
        } catch (Exception e) {
            // Log the exception
            // logger.error("An error occurred while searching hotels", e);
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error", null);
        }
    }

    @GetMapping("/{hotelId}/availability")
    public StandardResponse<Boolean> checkAvailabilityByHotelId(
            @PathVariable Integer hotelId,
            @RequestParam(required = false) Integer noOfRooms,
            @RequestParam(required = false) Date checkIn,
            @RequestParam(required = false) Date checkOut)  {
        try {
            return productService.checkAvailabilityByHotelId(hotelId, noOfRooms, checkIn, checkOut);
        } catch (Exception e) {
            // Log the exception
            // logger.error("An error occurred while searching hotels", e);
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error", null);
        }
    }

}
