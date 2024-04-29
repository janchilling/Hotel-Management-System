package com.codegen.hotelmanagementsystembackend.Services;

import com.codegen.hotelmanagementsystembackend.dto.SeasonSupplementDTO;
import com.codegen.hotelmanagementsystembackend.dto.SupplementRequestDTO;
import com.codegen.hotelmanagementsystembackend.entities.Supplement;
import com.codegen.hotelmanagementsystembackend.repository.HotelRepository;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import com.codegen.hotelmanagementsystembackend.services.impl.HotelServiceImpl;
import com.codegen.hotelmanagementsystembackend.services.impl.SupplementServiceImpl;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class SupplementServiceImplTest {

    @MockBean
    private HotelRepository hotelRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UtilityMethods utilityMethods;

    @Autowired
    private HotelServiceImpl hotelService;

    @Autowired
    private SupplementServiceImpl supplementService;

    @Autowired
    private SeasonRepository seasonRepository;

    @Test
    public void test_create_one_supplement_with_one_season_supplement() {
        // Arrange
        List<SupplementRequestDTO> supplementRequestDTOs = new ArrayList<>();
        SupplementRequestDTO supplementRequestDTO = new SupplementRequestDTO();
        supplementRequestDTO.setSupplementName("Supplement 1");
        supplementRequestDTO.setSupplementDescription("Description 1");
        supplementRequestDTO.setImageIconURL("URL 1");
        supplementRequestDTO.setContractId(1);
        SeasonSupplementDTO seasonSupplementDTO = new SeasonSupplementDTO();
        seasonSupplementDTO.setSeasonId(1);
        seasonSupplementDTO.setSupplementPrice(100.0);
        supplementRequestDTO.setSeasonSupplements(Collections.singletonList(seasonSupplementDTO));
        supplementRequestDTOs.add(supplementRequestDTO);

        // Act
        StandardResponse<List<Supplement>> response = supplementService.createSupplement(supplementRequestDTOs);

        // Assert
        assertEquals(HttpStatus.CREATED.value(), response.getStatusCode());
        assertNotNull(response.getData());
        assertEquals(1, response.getData().size());
    }

    @Test
    public void test_create_multiple_supplements_with_one_season_supplement_each() {
        // Arrange
        List<SupplementRequestDTO> supplementRequestDTOs = new ArrayList<>();
        SupplementRequestDTO supplementRequestDTO1 = new SupplementRequestDTO();
        supplementRequestDTO1.setSupplementName("Supplement 1");
        supplementRequestDTO1.setSupplementDescription("Description 1");
        supplementRequestDTO1.setImageIconURL("URL 1");
        supplementRequestDTO1.setContractId(1);
        SeasonSupplementDTO seasonSupplementDTO1 = new SeasonSupplementDTO();
        seasonSupplementDTO1.setSeasonId(1);
        seasonSupplementDTO1.setSupplementPrice(100.0);
        supplementRequestDTO1.setSeasonSupplements(Collections.singletonList(seasonSupplementDTO1));
        supplementRequestDTOs.add(supplementRequestDTO1);

        SupplementRequestDTO supplementRequestDTO2 = new SupplementRequestDTO();
        supplementRequestDTO2.setSupplementName("Supplement 2");
        supplementRequestDTO2.setSupplementDescription("Description 2");
        supplementRequestDTO2.setImageIconURL("URL 2");
        supplementRequestDTO2.setContractId(2);
        SeasonSupplementDTO seasonSupplementDTO2 = new SeasonSupplementDTO();
        seasonSupplementDTO2.setSeasonId(2);
        seasonSupplementDTO2.setSupplementPrice(200.0);
        supplementRequestDTO2.setSeasonSupplements(Collections.singletonList(seasonSupplementDTO2));
        supplementRequestDTOs.add(supplementRequestDTO2);

        // Act
        StandardResponse<List<Supplement>> response = supplementService.createSupplement(supplementRequestDTOs);

        // Assert
        assertEquals(HttpStatus.CREATED.value(), response.getStatusCode());
        assertNotNull(response.getData());
        assertEquals(2, response.getData().size());
    }

    @Test
    public void test_create_one_supplement_with_multiple_season_supplements() {
        // Arrange
        List<SupplementRequestDTO> supplementRequestDTOs = new ArrayList<>();
        SupplementRequestDTO supplementRequestDTO = new SupplementRequestDTO();
        supplementRequestDTO.setSupplementName("Supplement 1");
        supplementRequestDTO.setSupplementDescription("Description 1");
        supplementRequestDTO.setImageIconURL("URL 1");
        supplementRequestDTO.setContractId(1);
        SeasonSupplementDTO seasonSupplementDTO1 = new SeasonSupplementDTO();
        seasonSupplementDTO1.setSeasonId(1);
        seasonSupplementDTO1.setSupplementPrice(100.0);
        SeasonSupplementDTO seasonSupplementDTO2 = new SeasonSupplementDTO();
        seasonSupplementDTO2.setSeasonId(2);
        seasonSupplementDTO2.setSupplementPrice(200.0);
        supplementRequestDTO.setSeasonSupplements(Arrays.asList(seasonSupplementDTO1, seasonSupplementDTO2));
        supplementRequestDTOs.add(supplementRequestDTO);

        // Act
        StandardResponse<List<Supplement>> response = supplementService.createSupplement(supplementRequestDTOs);

        // Assert
        assertEquals(HttpStatus.CREATED.value(), response.getStatusCode());
        assertNotNull(response.getData());
        assertEquals(1, response.getData().size());
    }
}
