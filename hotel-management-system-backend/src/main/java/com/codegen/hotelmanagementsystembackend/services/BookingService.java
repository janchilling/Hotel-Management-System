package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.BookingRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.BookingResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Booking;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;

import java.util.List;

public interface BookingService {

    StandardResponse<BookingResponseDTO> createBooking(BookingRequestDTO bookingRequestDTO);

    StandardResponse<BookingResponseDTO> getBookingById(Integer bookingId);

    StandardResponse<List<BookingResponseDTO>> getBookingByCustomer(Long userId);

    StandardResponse<Void> cancelBooking(Integer bookingId);
}
