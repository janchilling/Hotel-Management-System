package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.*;
import com.codegen.hotelmanagementsystembackend.entities.Contract;
import com.codegen.hotelmanagementsystembackend.entities.Hotel;
import com.codegen.hotelmanagementsystembackend.entities.Season;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.HotelRepository;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import com.codegen.hotelmanagementsystembackend.services.ContractService;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContractServiceImpl implements ContractService {

    private final ModelMapper modelMapper;
    private final ContractRepository contractRepository;
    private final HotelRepository hotelRepository;
    private final SeasonRepository seasonRepository;
    private final UtilityMethods utilityMethods;

    /**
     * Create a new contract based on the provided contract request data.
     *
     * @param  contractRequestDTO  the contract request data
     * @return                     the created contract
     */
    @Override
    public StandardResponse<Contract> createContract(ContractRequestDTO contractRequestDTO) {
        try {
            boolean hasOverlappingDates = contractRepository.existsByHotelHotelIdAndStartDateBeforeAndEndDateAfter(
                    contractRequestDTO.getHotelId(), contractRequestDTO.getEndDate(), contractRequestDTO.getStartDate());
            if (hasOverlappingDates) {
                return new StandardResponse<>(HttpStatus.CONFLICT.value(), "Contract dates overlap with existing contracts", null);
            }
            System.out.println(contractRequestDTO.getHotelId());

            Contract newContract = modelMapper.map(contractRequestDTO, Contract.class);
            newContract.setHotel(hotelRepository.findById(contractRequestDTO.getHotelId())
                    .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with ID: " + contractRequestDTO.getHotelId())));

            Contract savedContract = contractRepository.save(newContract);

            List<Season> seasons = contractRequestDTO.getSeasons().stream()
                    .map(seasonRequestDTO -> {
                        Season season = modelMapper.map(seasonRequestDTO, Season.class);
                        season.setContract(newContract);
                        return season;
                    })
                    .collect(Collectors.toList());

            seasonRepository.saveAll(seasons);

            return new StandardResponse<>(HttpStatus.CREATED.value(), "Contract created successfully", savedContract);
        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to create Contract : " + e.getMessage(), null);
        }
    }

    @Override
    public StandardResponse<List<ContractResponseDTO>> getContractsByHotelId(Integer hotelId) {
        try {
            // Fetch contracts for the given hotelId
            List<Contract> contracts = contractRepository.findAllContractsByHotelHotelId(hotelId);

            // Check if contracts list is null or empty
            if (contracts == null || contracts.isEmpty()) {
                return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), "No contracts found for the hotel", null);
            }

            // Map Contract entities to ContractResponseDTOs
            List<ContractResponseDTO> contractResponseDTOs = contracts.stream()
                    .map(contract -> {
                        ContractResponseDTO contractResponseDTO = modelMapper.map(contract, ContractResponseDTO.class);
                        contractResponseDTO.setHotelId(hotelId);
                        return contractResponseDTO;
                    })
                    .collect(Collectors.toList());

            return new StandardResponse<>(HttpStatus.OK.value(), "Contracts retrieved successfully", contractResponseDTOs);

        } catch (Exception e) {
            // Handle any unexpected exceptions
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to get Contracts: " + e.getMessage(), null);
        }
    }

    @Override
    public StandardResponse<ContractResponseDTO> getContractById(Integer contractId) {
        try {
            Contract contract = utilityMethods.getContract(contractId);
            Hotel hotel = utilityMethods.getHotel(contract.getHotel().getHotelId());

            ContractResponseDTO contractResponseDTO = modelMapper.map(contract, ContractResponseDTO.class);

            // Populate supplements
            contractResponseDTO.setSupplements(contract.getSupplements().stream()
                    .map(supplement -> {
                        SupplementResponseDTO supplementResponseDTO = modelMapper.map(supplement, SupplementResponseDTO.class);
                        supplementResponseDTO.setHotelName(hotel.getHotelName());
                        supplementResponseDTO.setHotelId(hotel.getHotelId());

                        // Map SeasonSupplement entities to SeasonSupplementResponseDTO
                        supplementResponseDTO.setSeasonSupplements(supplement.getSupplementsSeasons().stream()
                                .map(seasonSupplement -> {
                                    SeasonSupplementResponseDTO seasonSupplementResponseDTO = modelMapper.map(seasonSupplement, SeasonSupplementResponseDTO.class);
                                    // Add additional mappings if needed
                                    return seasonSupplementResponseDTO;
                                })
                                .collect(Collectors.toList()));

                        return supplementResponseDTO;
                    })
                    .collect(Collectors.toList()));

            return new StandardResponse<>(HttpStatus.OK.value(), "Contract retrieved successfully", contractResponseDTO);

        } catch (ResourceNotFoundException e) {
            return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), "Contract not found", null);
        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to find Contract: " + e.getMessage(), null);
        }
    }

    @Override
    public StandardResponse<Contract> updateContract(Integer contractId, ContractRequestDTO contractRequestDTO) {
        try {
            // Check if the contract exists
            Contract existingContract = utilityMethods.getContract(contractId);

            // Check for overlapping dates with other contracts excluding the current one
            boolean hasOverlappingDates = contractRepository.existsByHotelHotelIdAndStartDateBeforeAndEndDateAfterAndContractIdNot(
                    contractRequestDTO.getHotelId(), contractRequestDTO.getEndDate(), contractRequestDTO.getStartDate(), contractId);

            if (hasOverlappingDates) {
                return new StandardResponse<>(HttpStatus.CONFLICT.value(), "Contract dates overlap with existing contracts", null);
            }

            // Update the existing contract with the new data
            modelMapper.map(contractRequestDTO, existingContract);
            existingContract.setHotel(hotelRepository.findById(contractRequestDTO.getHotelId())
                    .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with ID: " + contractRequestDTO.getHotelId())));

            Contract savedContract = contractRepository.save(existingContract);

            return new StandardResponse<>(HttpStatus.OK.value(), "Contract updated successfully", savedContract);
        } catch (ResourceNotFoundException e) {
            return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), "Contract not found", null);
        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to update Contract : " + e.getMessage(), null);
        }
    }

}
