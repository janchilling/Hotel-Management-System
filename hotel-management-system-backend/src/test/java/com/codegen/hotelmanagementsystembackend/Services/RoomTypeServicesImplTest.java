package com.codegen.hotelmanagementsystembackend.Services;

import com.codegen.hotelmanagementsystembackend.config.LoggingConfig;
import com.codegen.hotelmanagementsystembackend.dto.RoomTypeImagesDTO;
import com.codegen.hotelmanagementsystembackend.dto.RoomTypeRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.RoomTypeResponseDTO;
import com.codegen.hotelmanagementsystembackend.dto.SeasonRoomTypeDTO;
import com.codegen.hotelmanagementsystembackend.entities.RoomType;
import com.codegen.hotelmanagementsystembackend.repository.BookingRoomRepository;
import com.codegen.hotelmanagementsystembackend.repository.HotelRepository;
import com.codegen.hotelmanagementsystembackend.services.RoomTypeService;
import com.codegen.hotelmanagementsystembackend.services.SeasonService;
import com.codegen.hotelmanagementsystembackend.services.impl.HotelServiceImpl;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class RoomTypeServicesImplTest {

    @Autowired
    private RoomTypeService roomTypeService;

    @Test
    public void test_create_room_types_successfully() {
        // Arrange
        List<RoomTypeRequestDTO> roomTypeRequestDTOS = new ArrayList<>();
        RoomTypeRequestDTO roomTypeRequestDTO = new RoomTypeRequestDTO();
        roomTypeRequestDTO.setRoomTypeId(1);
        roomTypeRequestDTO.setRoomTypeName("Standard Room");
        roomTypeRequestDTO.setRoomDimensions("20x20");
        roomTypeRequestDTO.setMaxAdults(2);
        roomTypeRequestDTO.setContractId(1);
        List<RoomTypeImagesDTO> roomTypeImagesDTOS = new ArrayList<>();
        RoomTypeImagesDTO roomTypeImagesDTO = new RoomTypeImagesDTO();
        roomTypeImagesDTO.setImageURL("https://example.com/image1.jpg");
        roomTypeImagesDTOS.add(roomTypeImagesDTO);
        roomTypeRequestDTO.setRoomTypeImages(roomTypeImagesDTOS);
        Set<SeasonRoomTypeDTO> seasonRoomTypeDTOS = new HashSet<>();
        SeasonRoomTypeDTO seasonRoomTypeDTO = new SeasonRoomTypeDTO();
        seasonRoomTypeDTO.setSeasonId(1);
        seasonRoomTypeDTO.setNoOfRooms(10);
        seasonRoomTypeDTO.setRoomTypePrice(100.0);
        seasonRoomTypeDTOS.add(seasonRoomTypeDTO);
        roomTypeRequestDTO.setSeasonRoomTypes(seasonRoomTypeDTOS);
        roomTypeRequestDTOS.add(roomTypeRequestDTO);

        // Act
        StandardResponse<List<RoomType>> response = roomTypeService.createRoomType(roomTypeRequestDTOS);

        // Assert
        assertEquals(HttpStatus.CREATED.value(), response.getStatusCode());
        assertEquals("Room Types created successfully", response.getMessage());
        assertNotNull(response.getData());
        assertEquals(1, response.getData().size());
    }

    @Test
    public void test_get_room_type_by_id_successfully() {
        // Arrange
        Integer roomTypeId = 1;

        // Act
        StandardResponse<RoomTypeResponseDTO> response = roomTypeService.getRoomTypeById(roomTypeId);

        // Assert
        assertEquals(HttpStatus.OK.value(), response.getStatusCode());
        assertEquals("Room type found", response.getMessage());
        assertNotNull(response.getData());
        assertEquals(roomTypeId, response.getData().getRoomTypeId());
    }

    @Test
    public void test_get_room_types_by_contract_successfully() {
        // Arrange
        Integer contractId = 1;

        // Act
        StandardResponse<List<RoomTypeResponseDTO>> response = roomTypeService.getRoomTypeByContract(contractId);

        // Assert
        assertEquals(HttpStatus.OK.value(), response.getStatusCode());
        assertEquals("Room types found for the contract" + contractId, response.getMessage());
        assertNotNull(response.getData());
        assertFalse(response.getData().isEmpty());
    }

    @Test
    public void test_update_room_types_successfully() {
        // Arrange
        List<RoomTypeRequestDTO> roomTypeRequestDTOS = new ArrayList<>();
        RoomTypeRequestDTO roomTypeRequestDTO = new RoomTypeRequestDTO();
        roomTypeRequestDTO.setRoomTypeId(1);
        roomTypeRequestDTO.setRoomTypeName("Deluxe Room");
        roomTypeRequestDTO.setRoomDimensions("25x25");
        roomTypeRequestDTO.setMaxAdults(2);
        roomTypeRequestDTOS.add(roomTypeRequestDTO);

        // Act
        StandardResponse<List<RoomType>> response = roomTypeService.updateRoomTypes(roomTypeRequestDTOS);

        // Assert
        assertEquals(HttpStatus.OK.value(), response.getStatusCode());
        assertEquals("Room types updated successfully", response.getMessage());
        assertNotNull(response.getData());
        assertEquals(1, response.getData().size());
        assertEquals(roomTypeRequestDTO.getRoomTypeName(), response.getData().get(0).getRoomTypeName());
    }
}
