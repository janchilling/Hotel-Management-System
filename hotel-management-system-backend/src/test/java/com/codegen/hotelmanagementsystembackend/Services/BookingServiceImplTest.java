//package com.codegen.hotelmanagementsystembackend.Services;
//
//import com.codegen.hotelmanagementsystembackend.dto.*;
//import com.codegen.hotelmanagementsystembackend.entities.*;
//import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
//import com.codegen.hotelmanagementsystembackend.repository.BookingDiscountRepository;
//import com.codegen.hotelmanagementsystembackend.repository.BookingRepository;
//import com.codegen.hotelmanagementsystembackend.repository.BookingRoomRepository;
//import com.codegen.hotelmanagementsystembackend.repository.BookingSupplementsRepository;
//import com.codegen.hotelmanagementsystembackend.services.BookingService;
//import com.codegen.hotelmanagementsystembackend.services.impl.BookingServiceImpl;
//import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
//import org.apache.logging.log4j.Logger;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.http.HttpStatus;
//
//import java.sql.Date;
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//
//@ExtendWith(MockitoExtension.class)
//public class BookingServiceImplTest {
//
//    @InjectMocks
//    private BookingServiceImpl bookingService;
//
//    @Mock
//    Logger logger;
//
//    @Test
//    public void test_create_booking_successfully() {
//        // Arrange
//        BookingRequestDTO bookingRequestDTO = new BookingRequestDTO();
//        // Set up booking request data
//
//        // Set up booking request data
//        // Set customer ID
//        bookingRequestDTO.setCustomerCustomerId(1L);
//        // Set hotel ID
//        bookingRequestDTO.setHotelHotelId(1);
//
//        // Set payment details
//        PaymentRequestDTO paymentRequestDTO = new PaymentRequestDTO();
//        paymentRequestDTO.setPaymentDate("2022-01-01");
//        paymentRequestDTO.setPaymentAmount(100.0);
//        paymentRequestDTO.setPaymentType("Credit Card");
//        bookingRequestDTO.setPayment(paymentRequestDTO);
//
//        // Set booking room details
//        BookingRoomDTO bookingRoomRequestDTO = new BookingRoomDTO();
//        bookingRoomRequestDTO.setNoOfRooms(2);
//        bookingRoomRequestDTO.setRoomTypeId(1);
//        bookingRoomRequestDTO.setCheckInDate(Date.valueOf("2022-01-01"));
//        bookingRoomRequestDTO.setCheckOutDate(Date.valueOf("2022-01-03"));
//        bookingRoomRequestDTO.setBookedPrice(200.0);
//        List<BookingRoomDTO> bookingRooms = new ArrayList<>();
//        bookingRooms.add(bookingRoomRequestDTO);
//        bookingRequestDTO.setBookingRooms(bookingRooms);
//
//        // Set booking discount details
//        BookingDiscountDTO bookingDiscountDTO = new BookingDiscountDTO();
//        bookingDiscountDTO.setDiscountCode("DISCOUNT123");
//        bookingDiscountDTO.setDiscountedAmount(50.0);
//        bookingDiscountDTO.setDiscountId(1);
//        List<BookingDiscountDTO> bookingDiscounts = new ArrayList<>();
//        bookingDiscounts.add(bookingDiscountDTO);
//        bookingRequestDTO.setBookingDiscounts(bookingDiscounts);
//
//        // Set booking supplement details
//        BookingSupplementDTO bookingSupplementRequestDTO = new BookingSupplementDTO();
//        bookingSupplementRequestDTO.setNoOfRooms(1);
//        bookingSupplementRequestDTO.setSupplementPrice(50L);
//        bookingSupplementRequestDTO.setSupplementName("Breakfast");
//        bookingSupplementRequestDTO.setRoomTypeId(1);
//        List<BookingSupplementDTO> bookingSupplements = new ArrayList<>();
//        bookingSupplements.add(bookingSupplementRequestDTO);
//        bookingRequestDTO.setBookingSupplements(bookingSupplements);
//
//        // Act
//        StandardResponse<BookingResponseDTO> response = null;
//        try {
//            response = bookingService.createBooking(bookingRequestDTO);
//        } catch (NullPointerException e) {
//            this.logger.error("Failed to create booking: ", e);
//        }
//
//        // Assert
//        assertEquals(HttpStatus.CREATED.value(), response.getStatusCode());
//        assertNotNull(response.getData());
//        assertEquals("Booking created successfully", response.getMessage());}
//
//    @Test
//    public void test_retrieve_booking_by_id_successfully() {
//        // Arrange
//        Integer bookingId = 1;
//
//        // Act
//        StandardResponse<BookingResponseDTO> response = bookingService.getBookingById(bookingId);
//
//        // Assert
//        assertEquals(HttpStatus.OK.value(), response.getStatusCode());
//        assertNotNull(response.getData());
//        assertEquals("Booking found", response.getMessage());
//    }
//
//    @Test
//    public void test_retrieve_bookings_by_customer_id_successfully() {
//        // Arrange
//        Long userId = 1L;
//
//        // Act
//        StandardResponse<List<BookingResponseDTO>> response = bookingService.getBookingByCustomer(userId);
//
//        // Assert
//        assertEquals(HttpStatus.OK.value(), response.getStatusCode());
//        assertNotNull(response.getData());
//        assertEquals("Bookings found for user ID: " + userId, response.getMessage());
//    }
//
//    @Test
//    public void test_create_booking_with_multiple_rooms_discounts_supplements_successfully() {
//        // Arrange
//        BookingRequestDTO bookingRequestDTO = new BookingRequestDTO();
//        // Set up booking request data with multiple rooms, discounts, and supplements
//
//        // Act
//        StandardResponse<BookingResponseDTO> response = bookingService.createBooking(bookingRequestDTO);
//
//        // Assert
//        assertEquals(HttpStatus.CREATED.value(), response.getStatusCode());
//        assertNotNull(response.getData());
//        assertEquals("Booking created successfully", response.getMessage());
//    }
//
//    @Test
//    public void test_retrieve_booking_with_multiple_rooms_discounts_supplements_by_id_successfully() {
//        // Arrange
//        Integer bookingId = 1;
//
//        // Act
//        StandardResponse<BookingResponseDTO> response = bookingService.getBookingById(bookingId);
//
//        // Assert
//        assertEquals(HttpStatus.OK.value(), response.getStatusCode());
//        assertNotNull(response.getData());
//        assertEquals("Booking found", response.getMessage());
//    }
//
//    @Test
//    public void test_retrieve_booking_with_multiple_rooms_discounts_supplements_by_customer_id_successfully() {
//        // Arrange
//        Long userId = 1L;
//
//        // Act
//        StandardResponse<List<BookingResponseDTO>> response = bookingService.getBookingByCustomer(userId);
//
//        // Assert
//        assertEquals(HttpStatus.OK.value(), response.getStatusCode());
//        assertNotNull(response.getData());
//        assertEquals("Bookings found for user ID: " + userId, response.getMessage());
//    }
//
//
//}
