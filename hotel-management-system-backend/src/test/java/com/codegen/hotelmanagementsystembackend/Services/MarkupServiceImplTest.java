package com.codegen.hotelmanagementsystembackend.Services;

import com.codegen.hotelmanagementsystembackend.dto.MarkupRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.MarkupResponseDTO;
import com.codegen.hotelmanagementsystembackend.dto.SeasonMarkupDTO;
import com.codegen.hotelmanagementsystembackend.dto.SeasonRequestDTO;
import com.codegen.hotelmanagementsystembackend.entities.*;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.HotelRepository;
import com.codegen.hotelmanagementsystembackend.repository.MarkupRepository;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import com.codegen.hotelmanagementsystembackend.services.impl.MarkupServiceImpl;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MarkupServiceImplTest {

    @Mock
    private MarkupRepository markupRepository;

    @Mock
    private SeasonRepository seasonRepository;

    @Mock
    private ContractRepository contractRepository;

    @Mock
    private HotelRepository hotelRepository;

    @InjectMocks
    private MarkupServiceImpl markupService;

    @InjectMocks
    private ModelMapper modelMapper;

    @InjectMocks
    private UtilityMethods utilityMethods;

    @Test
    public void test_createMarkup_validInput_returnsStandardResponseWithCreatedMarkup() {
        // Arrange
        SeasonMarkupDTO seasonMarkupDTO = SeasonMarkupDTO.builder()
                .seasonId(1)
                .markupPercentage(15.0)
                .build();

        Season mockSeason = new Season();
        mockSeason.setSeasonId(1);
        when(seasonRepository.findById(seasonMarkupDTO.getSeasonId())).thenReturn(Optional.of(mockSeason));

        List<SeasonMarkupDTO> seasonMarkups = Collections.singletonList(seasonMarkupDTO);
        Set<SeasonMarkupDTO> seasonMarkupsSet = new HashSet<>(seasonMarkups);

        MarkupRequestDTO markupRequestDTO = MarkupRequestDTO.builder()
                .contractId(1)
                .seasonMarkups(seasonMarkupsSet)
                .build();

        Contract mockContract = new Contract();
        mockContract.setContractId(0);
        when(contractRepository.findById(markupRequestDTO.getContractId())).thenReturn(Optional.of(mockContract));

        // Act
        StandardResponse<Markup> response = markupService.createMarkup(markupRequestDTO);

        // Assert
        assertEquals(HttpStatus.CREATED.value(), response.getStatusCode());
        assertEquals("Markup created successfully", response.getMessage());
    }

    @Test
    public void test_getMarkupById_validInput_returnsMarkupResponseDTOWithCorrectDetails() {
        // Given
        Integer markupId = 1;
        Markup markup = new Markup();
        markup.setMarkupId(markupId);
        markup.setContract(new Contract());
        markup.setSeasonMarkups(new ArrayList<>());

        given(utilityMethods.getMarkup(markupId)).willReturn(markup);
        given(utilityMethods.getContract(anyInt())).willReturn(new Contract());
        given(utilityMethods.getHotel(anyInt())).willReturn(new Hotel());
        given(utilityMethods.getSeason(anyInt())).willReturn(new Season());

        // When
        MarkupResponseDTO response = markupService.getMarkupById(markupId);

        // Then
        assertEquals(markupId, response.getMarkupId());
        assertNotNull(response.getSeasonMarkups());
        assertNotNull(response.getContractId());
        assertNotNull(response.getContractStatus());
        assertNotNull(response.getHotelId());
        assertNotNull(response.getHotelName());
    }
}
