package com.codegen.hotelmanagementsystembackend.Services;

import com.codegen.hotelmanagementsystembackend.dto.DiscountRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.DiscountResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Discount;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.DiscountRepository;
import com.codegen.hotelmanagementsystembackend.repository.HotelRepository;
import com.codegen.hotelmanagementsystembackend.services.impl.DiscountServiceImpl;
import com.codegen.hotelmanagementsystembackend.services.impl.HotelServiceImpl;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class DiscountServiceImplTest {

    @MockBean
    private HotelRepository hotelRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UtilityMethods utilityMethods;

    @Autowired
    private HotelServiceImpl hotelService;

    @Test
    public void test_create_discount_successfully() {
        // Arrange
        DiscountRepository mockDiscountRepository = Mockito.mock(DiscountRepository.class);
        ContractRepository mockContractRepository = Mockito.mock(ContractRepository.class);
        UtilityMethods mockUtilityMethods = Mockito.mock(UtilityMethods.class);
        ModelMapper mockModelMapper = Mockito.mock(ModelMapper.class);

        DiscountServiceImpl discountService = new DiscountServiceImpl(mockDiscountRepository, mockContractRepository, mockUtilityMethods, mockModelMapper);
        List<DiscountRequestDTO> discountRequestDTOS = new ArrayList<>();
        DiscountRequestDTO discountRequestDTO = new DiscountRequestDTO();
        // Set valid input for discountRequestDTO
        discountRequestDTOS.add(discountRequestDTO);

        // Act
        StandardResponse<List<Discount>> response = discountService.createDiscount(discountRequestDTOS);

        // Assert
        assertEquals(HttpStatus.CREATED.value(), response.getStatusCode());
        assertEquals("Discounts created successfully", response.getMessage());
        assertNotNull(response.getData());
    }

    @Test
    public void test_get_discount_by_id_successfully() {
        // Arrange
        DiscountRepository mockDiscountRepository = Mockito.mock(DiscountRepository.class);
        ContractRepository mockContractRepository = Mockito.mock(ContractRepository.class);
        UtilityMethods mockUtilityMethods = Mockito.mock(UtilityMethods.class);
        ModelMapper mockModelMapper = Mockito.mock(ModelMapper.class);
        DiscountServiceImpl discountService = new DiscountServiceImpl(mockDiscountRepository, mockContractRepository, mockUtilityMethods, mockModelMapper);
        Integer discountId = 1;

        // Act
        StandardResponse<DiscountResponseDTO> response = discountService.getDiscountById(discountId);

        // Assert
        assertEquals(HttpStatus.OK.value(), response.getStatusCode());
        assertEquals("Discount found", response.getMessage());
        assertNotNull(response.getData());
    }

    @Test
    public void test_get_discounts_by_contract_successfully() {
        // Arrange
        DiscountRepository mockDiscountRepository = Mockito.mock(DiscountRepository.class);
        ContractRepository mockContractRepository = Mockito.mock(ContractRepository.class);
        UtilityMethods mockUtilityMethods = Mockito.mock(UtilityMethods.class);
        ModelMapper mockModelMapper = Mockito.mock(ModelMapper.class);
        DiscountServiceImpl discountService = new DiscountServiceImpl(mockDiscountRepository, mockContractRepository, mockUtilityMethods, mockModelMapper);
        Integer contractId = 1;

        // Act
        StandardResponse<List<DiscountResponseDTO>> response = discountService.getDiscountByContract(contractId);

        // Assert
        assertEquals(HttpStatus.OK.value(), response.getStatusCode());
        assertEquals("Discounts found", response.getMessage());
        assertNotNull(response.getData());
    }

    @Test
    public void test_update_discount_successfully() {
        // Arrange
        DiscountRepository mockDiscountRepository = Mockito.mock(DiscountRepository.class);
        ContractRepository mockContractRepository = Mockito.mock(ContractRepository.class);
        UtilityMethods mockUtilityMethods = Mockito.mock(UtilityMethods.class);
        ModelMapper mockModelMapper = Mockito.mock(ModelMapper.class);
        DiscountServiceImpl discountService = new DiscountServiceImpl(mockDiscountRepository, mockContractRepository, mockUtilityMethods, mockModelMapper);
        List<DiscountRequestDTO> discountRequestDTOS = new ArrayList<>();
        DiscountRequestDTO discountRequestDTO = new DiscountRequestDTO();
        // Set valid input for discountRequestDTO
        discountRequestDTOS.add(discountRequestDTO);

        // Act
        StandardResponse<List<DiscountResponseDTO>> response = discountService.updateDiscounts(discountRequestDTOS);

        // Assert
        assertEquals(HttpStatus.OK.value(), response.getStatusCode());
        assertEquals("Discounts updated successfully", response.getMessage());
        assertNotNull(response.getData());
    }

    @Test
    public void test_delete_discount_by_id_successfully() {
        // Arrange
        DiscountRepository mockDiscountRepository = Mockito.mock(DiscountRepository.class);
        ContractRepository mockContractRepository = Mockito.mock(ContractRepository.class);
        UtilityMethods mockUtilityMethods = Mockito.mock(UtilityMethods.class);
        ModelMapper mockModelMapper = Mockito.mock(ModelMapper.class);
        DiscountServiceImpl discountService = new DiscountServiceImpl(mockDiscountRepository, mockContractRepository, mockUtilityMethods, mockModelMapper);
        Integer discountId = 1;

        // Act
        StandardResponse<Void> response = discountService.deleteDiscountById(discountId);

        // Assert
        assertEquals(HttpStatus.OK.value(), response.getStatusCode());
        assertEquals("Discount deleted successfully", response.getMessage());
        assertNull(response.getData());
    }
}
