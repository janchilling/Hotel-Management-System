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
//import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
//import org.apache.logging.log4j.Logger;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.modelmapper.ModelMapper;
//import org.springframework.http.HttpStatus;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.ArgumentMatchers.anyInt;
//import static org.mockito.ArgumentMatchers.anyLong;
//import static org.mockito.Mockito.when;
//
//
//@ExtendWith(MockitoExtension.class)
//public class BookingServiceImplTest {
//
//    @Mock
//    private BookingRepository bookingRepository;
//
//    @Mock
//    private BookingDiscountRepository bookingDiscountRepository;
//
//    @Mock
//    private BookingSupplementsRepository bookingSupplementsRepository;
//
//    @Mock
//    private BookingRoomRepository bookingRoomRepository;
//
//    @Mock
//    private ModelMapper modelMapper;
//
//    @Mock
//    private UtilityMethods utilityMethods;
//
//    @Mock
//    private Logger logger;
//
//    @InjectMocks
//    private BookingServiceImpl bookingService;
//
//    private BookingRequestDTO bookingRequestDTO;
//    private Booking booking;
//
//    @BeforeEach
//    void setUp() {
//        bookingRequestDTO = new BookingRequestDTO();
//        booking = new Booking();
//    }
//
////    @Test
////    void createBooking_Success() {
////        // Arrange
////        when(utilityMethods.getCustomer(1L)).thenReturn(new Customer());
////        when(utilityMethods.getHotel(1)).thenReturn(new Hotel());
////        when(modelMapper.map(bookingRequestDTO, Booking.class)).thenReturn(booking);
////        when(bookingRepository.save(booking)).thenReturn(booking);
////        StandardResponse<BookingResponseDTO> expectedResponse = new StandardResponse<>(HttpStatus.CREATED.value(), "Booking created successfully", null);
////
////        // Act
////        StandardResponse<BookingResponseDTO> actualResponse = bookingService.createBooking(bookingRequestDTO);
////
////        // Assert
////        assertNotNull(actualResponse);
////        assertEquals(expectedResponse.getStatusCode(), actualResponse.getStatusCode());
////        assertEquals(expectedResponse.getMessage(), actualResponse.getMessage());
////    }
////
////    @Test
////    void createBooking_Failure() {
////        // Arrange
////        when(utilityMethods.getCustomer(anyLong())).thenThrow(new ResourceNotFoundException("Customer not found"));
////        StandardResponse<BookingResponseDTO> expectedResponse = new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to create booking: Customer not found", null);
////
////        // Act
////        StandardResponse<BookingResponseDTO> actualResponse = bookingService.createBooking(bookingRequestDTO);
////
////        // Assert
////        assertNotNull(actualResponse);
////        assertEquals(expectedResponse.getStatusCode(), actualResponse.getStatusCode());
////        assertEquals(expectedResponse.getMessage(), actualResponse.getMessage());
////    }
//
//    @Test
//    public void test_valid_booking_id() {
//        // Arrange
//        Integer bookingId = 1;
//        Booking booking = new Booking();
//        booking.setBookingId(bookingId);
//        // Mock the utilityMethods.getBooking() method to return the booking object
//        when(utilityMethods.getBooking(bookingId)).thenReturn(booking);
//
//        BookingResponseDTO expectedResponse = new BookingResponseDTO();
//        expectedResponse.setBookingId(bookingId);
//        // Mock the mapToBookingResponseDTO() method to return the expected response
//        when(bookingService.mapToBookingResponseDTO(booking)).thenReturn(expectedResponse);
//
//        // Act
//        StandardResponse<BookingResponseDTO> response = bookingService.getBookingById(bookingId);
//
//        // Assert
//        assertEquals(HttpStatus.OK.value(), response.getStatusCode());
//        assertEquals("Booking found", response.getMessage());
//        assertEquals(expectedResponse, response.getData());
//    }
//
//    @Test
//    void getBookingById_BookingNotFound() {
//        // Arrange
//        Integer bookingId = 123;
//        when(utilityMethods.getBooking(bookingId)).thenReturn(null);
//
//        // Act
//        StandardResponse<BookingResponseDTO> response = bookingService.getBookingById(bookingId);
//
//        // Assert
//        assertEquals(HttpStatus.NOT_FOUND.value(), response.getStatusCode());
//        assertEquals("Booking not found", response.getMessage());
//        assertNull(response.getData());
//    }
//
//    @Test
//    void getBookingById_ResourceNotFoundException() {
//        // Arrange
//        Integer bookingId = 123;
//        when(utilityMethods.getBooking(anyInt())).thenThrow(new ResourceNotFoundException("Booking not found"));
//
//        // Act
//        StandardResponse<BookingResponseDTO> response = bookingService.getBookingById(bookingId);
//
//        // Assert
//        assertEquals(HttpStatus.NOT_FOUND.value(), response.getStatusCode());
//        assertEquals("Booking not found", response.getMessage());
//        assertNull(response.getData());
//    }
//
//    @Test
//    void getBookingById_InternalServerError() {
//        // Arrange
//        Integer bookingId = 123;
//        when(utilityMethods.getBooking(anyInt())).thenThrow(new RuntimeException("Internal server error"));
//
//        // Act
//        StandardResponse<BookingResponseDTO> response = bookingService.getBookingById(bookingId);
//
//        // Assert
//        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR.value(), response.getStatusCode());
//        assertEquals("Failed to retrieve booking: Internal server error", response.getMessage());
//        assertNull(response.getData());
//    }
//
//}
