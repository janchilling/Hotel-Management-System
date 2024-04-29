package com.codegen.hotelmanagementsystembackend.Services;

import com.codegen.hotelmanagementsystembackend.dto.HotelRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.HotelResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Hotel;
import com.codegen.hotelmanagementsystembackend.repository.HotelImageRepository;
import com.codegen.hotelmanagementsystembackend.repository.HotelRepository;
import com.codegen.hotelmanagementsystembackend.services.impl.HotelServiceImpl;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class HotelServiceImplTest {

    @MockBean
    private HotelRepository hotelRepository;

    @MockBean
    private HotelImageRepository hotelImageRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UtilityMethods utilityMethods;

    @Autowired
    private HotelServiceImpl hotelService;

    @Test
    public void test_createHotel_uniqueNameAndAddress_returnsSuccessResponseWithNewlyCreatedHotel() {
        // Arrange
        HotelRequestDTO hotelRequestDTO = new HotelRequestDTO();
        // Set hotelRequestDTO properties

        HotelServiceImpl hotelService = new HotelServiceImpl(modelMapper, hotelRepository, utilityMethods, hotelImageRepository);

        // Act
        StandardResponse<Hotel> response = hotelService.createHotel(hotelRequestDTO);

        // Assert
        assertEquals(HttpStatus.CREATED.value(), response.getStatusCode());
        assertEquals("Hotel created successfully", response.getMessage());
        assertNotNull(response.getData());
    }

    @Test
    public void test_createHotel_duplicateNameAndAddress_returnsConflictResponse() {
        // Arrange
        HotelRequestDTO hotelRequestDTO = new HotelRequestDTO();
        // Set hotelRequestDTO properties

        when(hotelRepository.existsByHotelNameAndHotelStreetAddress(
                hotelRequestDTO.getHotelName(), hotelRequestDTO.getHotelStreetAddress())).thenReturn(true);

        HotelServiceImpl hotelService = new HotelServiceImpl(modelMapper, hotelRepository, utilityMethods, hotelImageRepository);

        // Act
        StandardResponse<Hotel> response = hotelService.createHotel(hotelRequestDTO);

        // Assert
        assertEquals(HttpStatus.CONFLICT.value(), response.getStatusCode());
        assertEquals("Hotel with the same name and address already exists", response.getMessage());
        assertNull(response.getData());
    }

    @Test
    public void test_updateHotel_validData_returnsSuccessResponseWithUpdatedHotel() {
        // Arrange
        Integer hotelId = 1;
        HotelRequestDTO hotelRequestDTO = new HotelRequestDTO();
        // Set hotelRequestDTO properties

        Hotel existingHotel = new Hotel();
        // Set existingHotel properties

        when(hotelRepository.findById(hotelId)).thenReturn(Optional.of(existingHotel));

        HotelServiceImpl hotelService = new HotelServiceImpl(modelMapper, hotelRepository, utilityMethods, hotelImageRepository);

        // Act
        StandardResponse<Hotel> response = hotelService.updateHotel(hotelId, hotelRequestDTO);

        // Assert
        assertEquals(HttpStatus.OK.value(), response.getStatusCode());
        assertEquals("Hotel updated successfully", response.getMessage());
        assertNotNull(response.getData());
    }

    @Test
    public void test_getHotelById_existingHotel_returnsSuccessResponseWithHotelDetailsAndContracts() {
        // Arrange
        Integer hotelId = 1;

        Hotel existingHotel = new Hotel();
        // Set existingHotel properties

        when(hotelRepository.findById(hotelId)).thenReturn(Optional.of(existingHotel));

        HotelServiceImpl hotelService = new HotelServiceImpl(modelMapper, hotelRepository, utilityMethods, hotelImageRepository);

        // Act
        StandardResponse<HotelResponseDTO> response = hotelService.getHotelById(hotelId);

        // Assert
        assertEquals(HttpStatus.OK.value(), response.getStatusCode());
        assertEquals("Hotel retrieved successfully", response.getMessage());
        assertNotNull(response.getData());
    }

    @Test
    public void test_deleteHotelById_existingHotel_returnsSuccessResponseAndHotelIsNoLongerRetrievable() {
        // Arrange
        Integer hotelId = 1;

        Hotel existingHotel = new Hotel();
        // Set existingHotel properties

        when(hotelRepository.existsById(hotelId)).thenReturn(true);

        HotelServiceImpl hotelService = new HotelServiceImpl(modelMapper, hotelRepository, utilityMethods, hotelImageRepository);

        // Act
        StandardResponse<Void> response = hotelService.deleteHotelById(hotelId);

        // Assert
        assertEquals(HttpStatus.OK.value(), response.getStatusCode());
        assertEquals("Hotel deleted successfully", response.getMessage());
        verify(hotelRepository, times(1)).deleteById(hotelId);
    }

    @Test
    public void test_updateHotel_nonExistingHotel_returnsNotFoundResponse() {
        // Arrange
        Integer hotelId = 1;
        HotelRequestDTO hotelRequestDTO = new HotelRequestDTO();
        // Set hotelRequestDTO properties

        when(hotelRepository.findById(hotelId)).thenReturn(Optional.empty());

        HotelServiceImpl hotelService = new HotelServiceImpl(modelMapper, hotelRepository, utilityMethods, hotelImageRepository);

        // Act
        StandardResponse<Hotel> response = hotelService.updateHotel(hotelId, hotelRequestDTO);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND.value(), response.getStatusCode());
        assertEquals("Hotel not found", response.getMessage());
        assertNull(response.getData());
    }
}
