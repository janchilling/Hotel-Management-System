package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.MarkupDTO;
import com.codegen.hotelmanagementsystembackend.dto.SeasonMarkupDTO;
import com.codegen.hotelmanagementsystembackend.entities.Contract;
import com.codegen.hotelmanagementsystembackend.entities.Markup;
import com.codegen.hotelmanagementsystembackend.entities.Season;
import com.codegen.hotelmanagementsystembackend.entities.SeasonMarkup;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.MarkupRepository;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class MarkupServiceImplTest {

    @Mock
    private MarkupRepository markupRepository;

    @Mock
    private SeasonRepository seasonRepository;

    @Mock
    private ContractRepository contractRepository;

    @InjectMocks
    private MarkupServiceImpl markupService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testCreateMarkup_Success() {
        MarkupDTO markupDTO = new MarkupDTO();
        markupDTO.setMarkupId(1);
        markupDTO.setContractId(1);

        List<MarkupDTO> markupDTOs = new ArrayList<>();
        markupDTOs.add(markupDTO);

        Contract contract = new Contract();
        contract.setContract_id(1);

        when(contractRepository.findById(1)).thenReturn(Optional.of(contract));
        when(markupRepository.save(any())).thenReturn(new Markup());

        String result = markupService.createMarkup(markupDTOs);

        assertEquals("Markups Added", result);
        verify(markupRepository, times(1)).save(any());
    }

    @Test
    void testCreateMarkup_NoMarkupsProvided() {
        List<MarkupDTO> markupDTOs = new ArrayList<>();

        String result = markupService.createMarkup(markupDTOs);

        assertEquals("No markups provided.", result);
        verify(markupRepository, never()).save(any());
    }

    @Test
    void testCreateMarkup_ContractNotFound() {
        MarkupDTO markupDTO = new MarkupDTO();
        markupDTO.setMarkupId(1);
        markupDTO.setContractId(1);

        List<MarkupDTO> markupDTOs = new ArrayList<>();
        markupDTOs.add(markupDTO);

        when(contractRepository.findById(3)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> markupService.createMarkup(markupDTOs));
        verify(markupRepository, never()).save(any());
    }

    @Test
    void testCreateMarkup_SeasonNotFound() {
        MarkupDTO markupDTO = new MarkupDTO();
        markupDTO.setMarkupId(1);
        markupDTO.setContractId(1);

        SeasonMarkupDTO seasonMarkupDTO = new SeasonMarkupDTO();
        seasonMarkupDTO.setSeasonId(1);
        seasonMarkupDTO.setMarkupPercentage(0.05);

        markupDTO.setSeasonMarkups(Set.of(seasonMarkupDTO));

        List<MarkupDTO> markupDTOs = new ArrayList<>();
        markupDTOs.add(markupDTO);

        Contract contract = new Contract();
        contract.setContract_id(1);

        when(contractRepository.findById(1)).thenReturn(Optional.of(contract));
        when(seasonRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> markupService.createMarkup(markupDTOs));
        verify(markupRepository, never()).save(any());
    }
}
