package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.BookingRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.ContractRequestDTO;
import com.codegen.hotelmanagementsystembackend.entities.Booking;
import com.codegen.hotelmanagementsystembackend.entities.Contract;
import com.codegen.hotelmanagementsystembackend.services.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    @PostMapping("/addBooking")
    public ResponseEntity<Booking>createBooking(@RequestBody BookingRequestDTO bookingRequestDTO) {
        return ResponseEntity.ok(bookingService.createBooking(bookingRequestDTO));
    }
}
