package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.BookingResponseDTO;
import com.codegen.hotelmanagementsystembackend.dto.CustomerResponseDTO;
import com.codegen.hotelmanagementsystembackend.services.BookingService;
import com.codegen.hotelmanagementsystembackend.services.CustomerService;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final BookingService bookingService;
    private final CustomerService customerService;

    @GetMapping("/{userId}/bookings/")
    public StandardResponse<List<BookingResponseDTO>> getBookingByCustomer(@PathVariable Long userId) {
        return bookingService.getBookingByCustomer(userId);
    }

    @GetMapping("/{userId}")
    public StandardResponse<CustomerResponseDTO> getCustomerById(@PathVariable Long userId) {
        return customerService.getCustomerById(userId);
    }
}
