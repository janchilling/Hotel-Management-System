//package com.codegen.hotelmanagementsystembackend.Services;
//
//import com.codegen.hotelmanagementsystembackend.dto.BookingRequestDTO;
//import com.codegen.hotelmanagementsystembackend.dto.BookingResponseDTO;
//import com.codegen.hotelmanagementsystembackend.repository.BookingDiscountRepository;
//import com.codegen.hotelmanagementsystembackend.repository.BookingRepository;
//import com.codegen.hotelmanagementsystembackend.repository.BookingRoomRepository;
//import com.codegen.hotelmanagementsystembackend.repository.BookingSupplementsRepository;
//import com.codegen.hotelmanagementsystembackend.services.impl.BookingServiceImpl;
//import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
//import org.hibernate.service.spi.ServiceException;
//import org.junit.jupiter.api.Test;
//import org.modelmapper.ModelMapper;
//
//import static org.assertj.core.api.Fail.fail;
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//import static org.junit.jupiter.api.Assertions.assertThrows;
//import static org.mockito.ArgumentMatchers.anyInt;
//import static org.mockito.ArgumentMatchers.anyLong;
//import static org.mockito.Mockito.mock;
//import static org.mockito.Mockito.when;
//
//public class BookingServiceImplTest {
//
//    @Test
//    public void test_createBooking_success() {
//        // Arrange
//        BookingRequestDTO bookingRequestDTO = new BookingRequestDTO();
//        // set up bookingRequestDTO with necessary data
//
//        BookingRepository bookingRepository = mock(BookingRepository.class);
//        BookingDiscountRepository bookingDiscountRepository = mock(BookingDiscountRepository.class);
//        BookingSupplementsRepository bookingSupplementsRepository = mock(BookingSupplementsRepository.class);
//        BookingRoomRepository bookingRoomRepository = mock(BookingRoomRepository.class);
//        ModelMapper modelMapper = mock(ModelMapper.class);
//        UtilityMethods utilityMethods = mock(UtilityMethods.class);
//
//        BookingServiceImpl bookingService = new BookingServiceImpl(bookingRepository, bookingDiscountRepository, bookingSupplementsRepository, bookingRoomRepository, modelMapper, utilityMethods);
//
//        // Act
//        try {
//            BookingResponseDTO result = bookingService.createBooking(bookingRequestDTO);
//
//            // Assert
//            assertNotNull(result);
//            // add more assertions to verify the correctness of the result
//        } catch (ServiceException e) {
//            fail("Failed to create Bookings: " + e.getMessage());
//        }
//    }
//
//    @Test
//    public void test_createBooking_customerNotFound() {
//        // Arrange
//        BookingRequestDTO bookingRequestDTO = new BookingRequestDTO();
//        // set up bookingRequestDTO with necessary data
//
//        UtilityMethods utilityMethods = mock(UtilityMethods.class);
//        when(utilityMethods.getCustomer(anyLong())).thenReturn(null);
//
//        BookingServiceImpl bookingService = new BookingServiceImpl(mock(BookingRepository.class), mock(BookingDiscountRepository.class), mock(BookingSupplementsRepository.class), mock(BookingRoomRepository.class), mock(ModelMapper.class), utilityMethods);
//
//        // Act and Assert
//        assertThrows(ServiceException.class, () -> bookingService.createBooking(bookingRequestDTO));
//    }
//}
