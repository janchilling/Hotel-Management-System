package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.BookingClashResponseDTO;
import com.codegen.hotelmanagementsystembackend.dto.CustomerResponseDTO;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import org.springframework.web.bind.annotation.PathVariable;

import java.sql.Date;

public interface CustomerService {

    StandardResponse<CustomerResponseDTO> getCustomerById(Long userId);

    StandardResponse<BookingClashResponseDTO> checkUserHasBooking(Long userId, Date checkInDate, Date checkOutDate);
}
