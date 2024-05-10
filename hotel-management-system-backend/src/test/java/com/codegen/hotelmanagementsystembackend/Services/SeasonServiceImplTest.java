package com.codegen.hotelmanagementsystembackend.Services;

import com.codegen.hotelmanagementsystembackend.dto.SeasonResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Contract;
import com.codegen.hotelmanagementsystembackend.entities.Hotel;
import com.codegen.hotelmanagementsystembackend.entities.Season;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.HotelRepository;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import com.codegen.hotelmanagementsystembackend.services.SeasonService;
import com.codegen.hotelmanagementsystembackend.services.impl.HotelServiceImpl;
import com.codegen.hotelmanagementsystembackend.services.impl.SeasonServiceImpl;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.sql.Date;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
public class SeasonServiceImplTest {

    @MockBean
    private HotelRepository hotelRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UtilityMethods utilityMethods;

    @Autowired
    private HotelServiceImpl hotelService;

    @Test
    public void test_retrieve_season_response_dto_by_id() {
        // Arrange
        Integer seasonId = 1;
        Season season = new Season();
        season.setSeasonId(seasonId);
        season.setSeasonName("Summer");
        season.setStartDate(new Date(System.currentTimeMillis()));
        season.setEndDate(new Date(System.currentTimeMillis()));
        Contract contract = new Contract();
        contract.setContractId(1);
        Hotel hotel = new Hotel();
        hotel.setHotelId(1);
        hotel.setHotelName("Hotel A");
        contract.setHotel(hotel);
        season.setContract(contract);

        ModelMapper modelMapper = new ModelMapper();
        SeasonRepository seasonRepository = mock(SeasonRepository.class);
        ContractRepository contractRepository = mock(ContractRepository.class);
        HotelRepository hotelRepository = mock(HotelRepository.class);
        UtilityMethods utilityMethods = mock(UtilityMethods.class);

        when(utilityMethods.getSeason(seasonId)).thenReturn(season);
        when(utilityMethods.getContract(contract.getContractId())).thenReturn(contract);
        when(utilityMethods.getHotel(contract.getHotel().getHotelId())).thenReturn(hotel);

        SeasonService seasonService = new SeasonServiceImpl(modelMapper, seasonRepository, contractRepository, hotelRepository, utilityMethods);

        // Act
        SeasonResponseDTO result = seasonService.getSeasonById(seasonId);

        // Assert
        assertEquals(seasonId, result.getSeasonId());
        assertEquals("Summer", result.getSeasonName());
        assertNotNull(result.getStartDate());
        assertNotNull(result.getEndDate());
        assertEquals(contract.getContractId(), result.getContractId());
        assertEquals(hotel.getHotelId(), result.getHotelId());
        assertEquals(hotel.getHotelName(), result.getHotelName());
    }

    @Test
    public void test_retrieve_season_response_dtos_by_hotel_id() {
        // Arrange
        Integer hotelId = 1;
        Contract contract1 = new Contract();
        contract1.setContractId(1);
        Contract contract2 = new Contract();
        contract2.setContractId(2);
        List<Contract> contractList = Arrays.asList(contract1, contract2);

        Season season1 = new Season();
        season1.setSeasonId(1);
        season1.setSeasonName("Summer");
        season1.setStartDate(new Date(System.currentTimeMillis()));
        season1.setEndDate(new Date(System.currentTimeMillis()));
        season1.setContract(contract1);

        Season season2 = new Season();
        season2.setSeasonId(2);
        season2.setSeasonName("Winter");
        season2.setStartDate(new Date(System.currentTimeMillis()));
        season2.setEndDate(new Date(System.currentTimeMillis()));
        season2.setContract(contract2);

        ModelMapper modelMapper = new ModelMapper();
        SeasonRepository seasonRepository = mock(SeasonRepository.class);
        ContractRepository contractRepository = mock(ContractRepository.class);
        HotelRepository hotelRepository = mock(HotelRepository.class);
        UtilityMethods utilityMethods = mock(UtilityMethods.class);

        when(contractRepository.findAllContractsByHotelHotelId(hotelId)).thenReturn(contractList);
        when(seasonRepository.findAllSeasonsByContractContractId(1)).thenReturn(Collections.singletonList(season1));
        when(seasonRepository.findAllSeasonsByContractContractId(2)).thenReturn(Collections.singletonList(season2));

        SeasonServiceImpl seasonService = new SeasonServiceImpl(modelMapper, seasonRepository, contractRepository, hotelRepository, utilityMethods);

        // Act
        List<List<SeasonResponseDTO>> result = seasonService.getSeasonByHotel(hotelId);

        // Assert
        assertEquals(2, result.size());
        assertEquals(1, result.get(0).size());
        assertEquals(1, result.get(1).size());
        assertEquals(1, result.get(0).get(0).getSeasonId());
        assertEquals("Summer", result.get(0).get(0).getSeasonName());
        assertNotNull(result.get(0).get(0).getStartDate());
        assertNotNull(result.get(0).get(0).getEndDate());
        assertEquals(contract1.getContractId(), result.get(0).get(0).getContractId());
        assertEquals(contract1.getContractStatus(), result.get(0).get(0).getContractStatus());
        assertEquals(contract1.getHotel().getHotelId(), result.get(0).get(0).getHotelId());
        assertEquals(contract1.getHotel().getHotelName(), result.get(0).get(0).getHotelName());
        assertEquals(2, result.get(1).get(0).getSeasonId());
        assertEquals("Winter", result.get(1).get(0).getSeasonName());
        assertNotNull(result.get(1).get(0).getStartDate());
        assertNotNull(result.get(1).get(0).getEndDate());
        assertEquals(contract2.getContractId(), result.get(1).get(0).getContractId());
        assertEquals(contract2.getContractStatus(), result.get(1).get(0).getContractStatus());
        assertEquals(contract2.getHotel().getHotelId(), result.get(1).get(0).getHotelId());
        assertEquals(contract2.getHotel().getHotelName(), result.get(1).get(0).getHotelName());
    }
}
