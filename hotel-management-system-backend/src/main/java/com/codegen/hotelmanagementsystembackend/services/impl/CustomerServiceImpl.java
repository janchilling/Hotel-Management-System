package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.BookingClashResponseDTO;
import com.codegen.hotelmanagementsystembackend.dto.CustomerResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Booking;
import com.codegen.hotelmanagementsystembackend.entities.Customer;
import com.codegen.hotelmanagementsystembackend.exception.ResourceAlreadyExistsException;
import com.codegen.hotelmanagementsystembackend.repository.BookingRepository;
import com.codegen.hotelmanagementsystembackend.services.CustomerService;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final UtilityMethods utilityMethods;
    private final ModelMapper modelMapper;
    private final BookingRepository bookingRepository;
    @Override
    public StandardResponse<CustomerResponseDTO> getCustomerById(Long userId) {
        try{
            Customer customer = utilityMethods.getCustomer(userId);
            if(customer == null){
                return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), "Customer not found", null);
            }
            return new StandardResponse<>(HttpStatus.OK.value(), "Success", modelMapper.map(customer, CustomerResponseDTO.class));
        }catch (Exception e){
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error", null);
        }
    }

    @Override
    public StandardResponse<BookingClashResponseDTO> checkUserHasBooking(Long userId, Date checkInDate, Date checkOutDate) {
        try {
            List<Booking> bookings = bookingRepository.findByCustomerUserId(userId);
            BookingClashResponseDTO clashResponse = new BookingClashResponseDTO();
            clashResponse.setIsClash(false);

            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

            for (Booking booking : bookings) {
                // Convert string dates to Date objects
                Date bookingCheckInDate = Date.valueOf(booking.getCheckInDate());
                Date bookingCheckOutDate = Date.valueOf(booking.getCheckOutDate());

                if (checkDatesClash(checkInDate, checkOutDate, bookingCheckInDate, bookingCheckOutDate)) {
                    clashResponse.setIsClash(true);
                    clashResponse.setHotelName(booking.getHotel().getHotelName());
                    clashResponse.setCheckIn(String.valueOf(bookingCheckInDate));
                    clashResponse.setCheckOut(String.valueOf(bookingCheckOutDate));
                    clashResponse.setBookingId(booking.getBookingId());
                    return new StandardResponse<>(HttpStatus.CONFLICT.value(), "Booking Already exists for the dates", clashResponse);
                }
            }
            return new StandardResponse<>(HttpStatus.OK.value(), "Success", clashResponse);
        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error", null);
        }
    }

    // Helper method to check if two date ranges overlap
    private boolean checkDatesClash(Date start1, Date end1, Date start2, Date end2) {
        return start1.before(end2) && start2.before(end1);
    }
}
