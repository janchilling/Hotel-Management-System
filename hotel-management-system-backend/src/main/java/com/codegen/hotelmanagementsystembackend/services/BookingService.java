package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.BookingRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.BookingResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Booking;

public interface BookingService {

    Booking createBooking(BookingRequestDTO bookingRequestDTO);

    BookingResponseDTO getBookingById(Integer bookingId);

}
