//package com.codegen.hotelmanagementsystembackend.services.impl;
//
//import com.codegen.hotelmanagementsystembackend.dto.MarkupRequestDTO;
//import com.codegen.hotelmanagementsystembackend.dto.SeasonMarkupDTO;
//import com.codegen.hotelmanagementsystembackend.entities.Contract;
//import com.codegen.hotelmanagementsystembackend.entities.Markup;
//import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
//import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
//import com.codegen.hotelmanagementsystembackend.repository.MarkupRepository;
//import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//import java.util.Set;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//public class MarkupServiceImplTest {
//
//    @Mock
//    private MarkupRepository markupRepository;
//
//    @Mock
//    private SeasonRepository seasonRepository;
//
//    @Mock
//    private ContractRepository contractRepository;
//
//    @InjectMocks
//    private MarkupServiceImpl markupService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.initMocks(this);
//    }
//
//    @Test
//    void testCreateMarkup_Success() {
//        MarkupRequestDTO markupRequestDTO = new MarkupRequestDTO();
//        markupRequestDTO.setMarkupId(1);
//        markupRequestDTO.setContractId(1);
//
//        List<MarkupRequestDTO> markupRequestDTOS = new ArrayList<>();
//        markupRequestDTOS.add(markupRequestDTO);
//
//        Contract contract = new Contract();
//        contract.setContract_id(1);
//
//        when(contractRepository.findById(1)).thenReturn(Optional.of(contract));
//        when(markupRepository.save(any())).thenReturn(new Markup());
//
//        String result = markupService.createMarkup(markupRequestDTOS);
//
//        assertEquals("Markups Added", result);
//        verify(markupRepository, times(1)).save(any());
//    }
//
//    @Test
//    void testCreateMarkup_NoMarkupsProvided() {
//        List<MarkupRequestDTO> markupRequestDTOS = new ArrayList<>();
//
//        String result = markupService.createMarkup(markupRequestDTOS);
//
//        assertEquals("No markups provided.", result);
//        verify(markupRepository, never()).save(any());
//    }
//
//    @Test
//    void testCreateMarkup_ContractNotFound() {
//        MarkupRequestDTO markupRequestDTO = new MarkupRequestDTO();
//        markupRequestDTO.setMarkupId(1);
//        markupRequestDTO.setContractId(1);
//
//        List<MarkupRequestDTO> markupRequestDTOS = new ArrayList<>();
//        markupRequestDTOS.add(markupRequestDTO);
//
//        when(contractRepository.findById(3)).thenReturn(Optional.empty());
//
//        assertThrows(ResourceNotFoundException.class, () -> markupService.createMarkup(markupRequestDTOS));
//        verify(markupRepository, never()).save(any());
//    }
//
//    @Test
//    void testCreateMarkup_SeasonNotFound() {
//        MarkupRequestDTO markupRequestDTO = new MarkupRequestDTO();
//        markupRequestDTO.setMarkupId(1);
//        markupRequestDTO.setContractId(1);
//
//        SeasonMarkupDTO seasonMarkupDTO = new SeasonMarkupDTO();
//        seasonMarkupDTO.setSeasonId(1);
//        seasonMarkupDTO.setMarkupPercentage(0.05);
//
//        markupRequestDTO.setSeasonMarkups(Set.of(seasonMarkupDTO));
//
//        List<MarkupRequestDTO> markupRequestDTOS = new ArrayList<>();
//        markupRequestDTOS.add(markupRequestDTO);
//
//        Contract contract = new Contract();
//        contract.setContract_id(1);
//
//        when(contractRepository.findById(1)).thenReturn(Optional.of(contract));
//        when(seasonRepository.findById(1)).thenReturn(Optional.empty());
//
//        assertThrows(ResourceNotFoundException.class, () -> markupService.createMarkup(markupRequestDTOS));
//        verify(markupRepository, never()).save(any());
//    }
//}
