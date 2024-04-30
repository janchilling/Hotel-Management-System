package com.codegen.hotelmanagementsystembackend.Services;

import com.codegen.hotelmanagementsystembackend.config.LoggingConfig;
import com.codegen.hotelmanagementsystembackend.dto.SearchResponseDTO;
import com.codegen.hotelmanagementsystembackend.repository.BookingRoomRepository;
import com.codegen.hotelmanagementsystembackend.repository.HotelRepository;
import com.codegen.hotelmanagementsystembackend.services.ProductService;
import com.codegen.hotelmanagementsystembackend.services.SeasonService;
import com.codegen.hotelmanagementsystembackend.services.impl.HotelServiceImpl;
import com.codegen.hotelmanagementsystembackend.services.impl.ProductServiceImpl;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.sql.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ProductServiceImplTest {

    @MockBean
    private HotelRepository hotelRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UtilityMethods utilityMethods;

    @Autowired
    private HotelServiceImpl hotelService;

    @Autowired
    private SeasonService seasonService;

    @MockBean
    private BookingRoomRepository bookingRoomRepository;

    @Autowired
    private LoggingConfig logger;

    @Test
    public void test_search_hotels_successfully() {
        // Arrange
        ProductService productService = new ProductServiceImpl(modelMapper, hotelRepository, utilityMethods, seasonService, bookingRoomRepository, logger);
        String destination = "New York";
        Integer noOfRooms = 2;
        Integer noOfAdults = 2;
        Date checkIn = Date.valueOf("2022-10-01");
        Date checkOut = Date.valueOf("2022-10-05");

        // Act
        StandardResponse<List<SearchResponseDTO>> response = productService.searchHotels(destination, noOfRooms, noOfAdults,checkIn, checkOut);

        // Assert
        assertEquals(200, response.getStatusCode());
        assertNotNull(response.getMessage());
    }

    @Test
    public void test_get_hotel_by_id_active_successfully() {
        // Arrange
        ProductService productService = new ProductServiceImpl(modelMapper, hotelRepository, utilityMethods, seasonService, bookingRoomRepository, logger);
        Integer hotelId = 1;

        // Act
        StandardResponse<SearchResponseDTO> response = productService.getHotelByIdActive(hotelId);

        // Assert
        assertNotNull(response.getData());
        assertEquals(hotelId, response.getData().getHotelId());
    }

    @Test
    public void test_check_availability_by_hotel_id_successfully() {
        // Arrange
        ProductService productService = new ProductServiceImpl(modelMapper, hotelRepository, utilityMethods, seasonService, bookingRoomRepository, logger);
        Integer hotelId = 1;
        Integer noOfRooms = 2;
        Integer noOfAdults = 2;
        Date checkIn = Date.valueOf("2022-10-01");
        Date checkOut = Date.valueOf("2022-10-05");

        // Act
        StandardResponse<Boolean> response = productService.checkAvailabilityByHotelId(hotelId, noOfRooms, noOfAdults, checkIn, checkOut);

        // Assert
        assertNotNull(response.getData());
        assertTrue(response.getData());
    }

    @Test
    public void test_admin_search_hotels_successfully() {
        // Arrange
        ProductService productService = new ProductServiceImpl(modelMapper, hotelRepository, utilityMethods, seasonService, bookingRoomRepository, logger);
        String hotelName = "Hilton";

        // Act
        StandardResponse<List<SearchResponseDTO>> response = productService.adminSearchHotels(hotelName);

        // Assert
        assertEquals(200, response.getStatusCode());
        assertNotNull(response.getData());
    }
}
