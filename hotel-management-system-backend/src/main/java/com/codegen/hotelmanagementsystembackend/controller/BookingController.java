package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.BookingRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.BookingResponseDTO;
import com.codegen.hotelmanagementsystembackend.dto.ContractRequestDTO;
import com.codegen.hotelmanagementsystembackend.entities.Booking;
import com.codegen.hotelmanagementsystembackend.entities.Contract;
import com.codegen.hotelmanagementsystembackend.services.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    @PostMapping("/")
    public ResponseEntity<BookingResponseDTO>createBooking(@RequestBody BookingRequestDTO bookingRequestDTO) {
        return ResponseEntity.ok(bookingService.createBooking(bookingRequestDTO));
    }

    @GetMapping("/getBookingById/{bookingId}")
    public ResponseEntity<BookingResponseDTO>getBookingById(@PathVariable Integer bookingId) {
        return ResponseEntity.ok(bookingService.getBookingById(bookingId));
    }

    @PutMapping("/updateBookingById/{bookingId}")
    public ResponseEntity<Booking>updateBookingById(@PathVariable Integer bookingId, @RequestBody BookingRequestDTO bookingRequestDTO) {
        return ResponseEntity.ok(bookingService.updateBookingById(bookingId, bookingRequestDTO));
    }
}
