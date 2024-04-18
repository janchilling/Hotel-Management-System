package com.codegen.hotelmanagementsystembackend.Services;

import com.codegen.hotelmanagementsystembackend.dto.ContractRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.ContractResponseDTO;
import com.codegen.hotelmanagementsystembackend.dto.SeasonRequestDTO;
import com.codegen.hotelmanagementsystembackend.entities.Contract;
import com.codegen.hotelmanagementsystembackend.entities.Hotel;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.HotelRepository;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import com.codegen.hotelmanagementsystembackend.services.impl.ContractServiceImpl;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ContractServiceImplTest {

    @Mock
    private ContractRepository contractRepository;

    @Mock
    private HotelRepository hotelRepository;

    @Mock
    private SeasonRepository seasonRepository;

    @InjectMocks
    private ModelMapper modelMapper;

    @InjectMocks
    private UtilityMethods utilityMethods;

    @InjectMocks
    private ContractServiceImpl contractService;

    @Test
    public void test_create_contract_successfully() {
        // Arrange
        SeasonRequestDTO seasonRequestDTO = SeasonRequestDTO.builder().seasonName("string")
                .startDate(new Date(System.currentTimeMillis()))
                .endDate(new Date(System.currentTimeMillis()))
                .build();

        ContractRequestDTO contractRequestDTO = ContractRequestDTO.builder()
                .startDate(new Date(System.currentTimeMillis()))
                .endDate(new Date(System.currentTimeMillis()))
                .contractStatus("string")
                .cancellationDeadline(0)
                .cancellationAmount(0)
                .prepayment(0)
                .balancePayment(0)
                .hotelId(0)
                .seasons(Collections.singletonList(
                        seasonRequestDTO
                ))
                .build();

        Hotel mockHotel = new Hotel();
        mockHotel.setHotelId(0);
        when(hotelRepository.findById(contractRequestDTO.getHotelId())).thenReturn(Optional.of(mockHotel));

        // Set contract request data

        ContractServiceImpl contractService = new ContractServiceImpl(modelMapper, contractRepository, hotelRepository, seasonRepository, utilityMethods);

        // Act
        StandardResponse<Contract> response = contractService.createContract(contractRequestDTO);

        // Assert
        assertEquals(HttpStatus.CREATED.value(), response.getStatusCode());
        assertEquals("Contract created successfully", response.getMessage());

    }

    @Test
    public void test_get_contracts_by_hotel_id_successfully() {
        // Arrange
        Integer hotelId = 1;

        // Mocking the contracts to be found for the hotel
        List<Contract> contracts = new ArrayList<>();
         contracts.add(new Contract());

        when(contractRepository.findAllContractsByHotelHotelId(hotelId)).thenReturn(contracts);

        ContractServiceImpl contractService = new ContractServiceImpl(modelMapper, contractRepository, hotelRepository, seasonRepository, utilityMethods);

        // Act
        StandardResponse<List<ContractResponseDTO>> response = contractService.getContractsByHotelId(hotelId);

        // Assert
        assertEquals(HttpStatus.OK.value(), response.getStatusCode());
        assertEquals("Contracts retrieved successfully", response.getMessage());
        assertNotNull(response.getData());
    }


    @Test
    public void test_get_contract_by_id_unsuccessfully() {
        // Arrange
        Integer contractId = 1;

        ContractServiceImpl contractService = new ContractServiceImpl(modelMapper, contractRepository, hotelRepository, seasonRepository, utilityMethods);

        // Act
        StandardResponse<ContractResponseDTO> response = contractService.getContractById(contractId);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND.value(), response.getStatusCode());
        assertEquals("Contract not found", response.getMessage());
        assertNull(response.getData());
    }

//    @Test
//    public void test_update_contract_successfully() {
//        // Arrange
//        Integer contractId = 1;
//        SeasonRequestDTO seasonRequestDTO = SeasonRequestDTO.builder().seasonName("string")
//                .startDate(new Date(System.currentTimeMillis()))
//                .endDate(new Date(System.currentTimeMillis()))
//                .build();
//
//        ContractRequestDTO contractRequestDTO = ContractRequestDTO.builder()
//                .startDate(new Date(System.currentTimeMillis()))
//                .endDate(new Date(System.currentTimeMillis()))
//                .contractStatus("string")
//                .cancellationDeadline(0)
//                .cancellationAmount(0)
//                .prepayment(0)
//                .balancePayment(0)
//                .hotelId(0)
//                .seasons(Collections.singletonList(
//                        seasonRequestDTO
//                ))
//                .build();
//        // Set contract request data
//
//        ContractServiceImpl contractService = new ContractServiceImpl(modelMapper, contractRepository, hotelRepository, seasonRepository, utilityMethods);
//
//        // Act
//        StandardResponse<Contract> response = contractService.updateContract(contractId, contractRequestDTO);
//
//        // Assert
//        assertEquals(HttpStatus.OK.value(), response.getStatusCode());
//        assertEquals("Contract updated successfully", response.getMessage());
//        assertNotNull(response.getData());
//    }

//    @Test
//    public void test_create_contract_with_overlapping_dates() {
//        // Arrange
//        ContractRequestDTO contractRequestDTO = new ContractRequestDTO();
//        // Set contract request data
//
//        ContractServiceImpl contractService = new ContractServiceImpl(modelMapper, contractRepository, hotelRepository, seasonRepository, utilityMethods);
//
//        // Act
//        StandardResponse<Contract> response = contractService.createContract(contractRequestDTO);
//
//        // Assert
//        assertEquals(HttpStatus.CONFLICT.value(), response.getStatusCode());
//        assertEquals("Contract dates overlap with existing contracts", response.getMessage());
//        assertNull(response.getData());
//    }

    @Test
    public void test_get_contracts_for_hotel_with_no_contracts() {
        // Arrange
        Integer hotelId = 1;

        ContractServiceImpl contractService = new ContractServiceImpl(modelMapper, contractRepository, hotelRepository, seasonRepository, utilityMethods);

        // Act
        StandardResponse<List<ContractResponseDTO>> response = contractService.getContractsByHotelId(hotelId);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND.value(), response.getStatusCode());
        assertEquals("No contracts found for the hotel", response.getMessage());
        assertNull(response.getData());
    }

    @Test
    public void test_get_non_existing_contract_by_id() {
        // Arrange
        Integer contractId = 1;

        ContractServiceImpl contractService = new ContractServiceImpl(modelMapper, contractRepository, hotelRepository, seasonRepository, utilityMethods);

        // Act
        StandardResponse<ContractResponseDTO> response = contractService.getContractById(contractId);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND.value(), response.getStatusCode());
    }

}
