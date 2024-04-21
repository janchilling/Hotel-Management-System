package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.*;
import com.codegen.hotelmanagementsystembackend.entities.*;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import com.codegen.hotelmanagementsystembackend.repository.SupplementRepository;
import com.codegen.hotelmanagementsystembackend.services.SupplementService;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplementServiceImpl implements SupplementService {

    private final ContractRepository contractRepository;
    private final SeasonRepository seasonRepository;
    private final SupplementRepository supplementRepository;
    private final UtilityMethods utilityMethods;
    private final ModelMapper modelMapper;

    /**
     * Create supplements based on the provided SupplementRequestDTOs.
     *
     * @param supplementRequestDTOs list of SupplementRequestDTOs
     * @return list of created supplements
     */
    @Override
    public StandardResponse<List<Supplement>> createSupplement(List<SupplementRequestDTO> supplementRequestDTOs) {

        if (supplementRequestDTOs == null || supplementRequestDTOs.isEmpty()) {
            return new StandardResponse<>(HttpStatus.BAD_REQUEST.value(), "Empty request", null);
        }

        List<Supplement> supplementsList = new ArrayList<>();

        try {
            for (SupplementRequestDTO supplementRequestDTO : supplementRequestDTOs) {
                Supplement newSupplement = new Supplement();
                newSupplement.setSupplementDescription(supplementRequestDTO.getSupplementDescription());
                newSupplement.setSupplementName(supplementRequestDTO.getSupplementName());
                newSupplement.setImageIconURL(supplementRequestDTO.getImageIconURL());
                newSupplement.setContract(contractRepository.findById(supplementRequestDTO.getContractId())
                        .orElseThrow(() -> new ResourceNotFoundException("Contract not found with ID: " + supplementRequestDTO.getContractId())));

                for (SeasonSupplementDTO seasonSupplementDTO : supplementRequestDTO.getSeasonSupplements()) {
                    SeasonSupplement seasonSupplement = new SeasonSupplement();
                    seasonSupplement.setSupplement(newSupplement);
                    SeasonSupplementKey seasonSupplementKey = new SeasonSupplementKey();
                    if (seasonSupplementDTO.getSeasonId() != null) {
                        seasonSupplementKey.setSeasonId(seasonSupplementDTO.getSeasonId());
                    }
                    if (newSupplement.getSupplementId() != null) {
                        seasonSupplementKey.setSupplementId(newSupplement.getSupplementId());
                    }
                    seasonSupplement.setSeasonSupplementKey(seasonSupplementKey);
                    seasonSupplement.setSupplementPrice(seasonSupplementDTO.getSupplementPrice());
                    seasonSupplement.setSeason(seasonRepository.findById(seasonSupplementDTO.getSeasonId())
                            .orElseThrow(() -> new ResourceNotFoundException("Season not found with ID: " + seasonSupplementDTO.getSeasonId())));

                    newSupplement.getSupplementsSeasons().add(seasonSupplement);
                }
                supplementsList.add(newSupplement);
            }

            return new StandardResponse<>(HttpStatus.CREATED.value(), "Supplements created successfully", supplementRepository.saveAll(supplementsList));
        } catch (ResourceNotFoundException e) {
            return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), e.getMessage(), null);
        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Supplements creation failed: " + e.getMessage(), null);
        }
    }

    /**
     * Retrieves a supplement by its ID and constructs a response DTO containing detailed information about the supplement, its associated contract, and the corresponding hotel.
     *
     * @param supplementId the ID of the supplement to retrieve
     * @return the response DTO containing the supplement details
     */
    @Override
    public StandardResponse<SupplementResponseDTO> getSupplementById(Integer supplementId) {
        try {
            Supplement supplement = utilityMethods.getSupplement(supplementId);
            if (supplement == null) {
                return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), "Supplement not found", null);
            }

            SupplementResponseDTO supplementResponseDTO = modelMapper.map(supplement, SupplementResponseDTO.class);
            Contract contract = utilityMethods.getContract(supplement.getContract().getContractId());
            Hotel hotel = utilityMethods.getHotel(contract.getHotel().getHotelId());
            supplementResponseDTO.setSeasonSupplements(supplement.getSupplementsSeasons().stream().map(
                    seasonSupplement -> {
                        Season season = utilityMethods.getSeason(seasonSupplement.getSeason().getSeasonId());
                        SeasonSupplementResponseDTO seasonSupplementResponseDTO = modelMapper.map(seasonSupplement, SeasonSupplementResponseDTO.class);
                        seasonSupplementResponseDTO.setSeasonName(season.getSeasonName());
                        seasonSupplementResponseDTO.setStartDate(season.getStartDate());
                        seasonSupplementResponseDTO.setEndDate(season.getEndDate());
                        return seasonSupplementResponseDTO;
                    }).toList());

            supplementResponseDTO.setContractId(contract.getContractId());
            supplementResponseDTO.setContractStatus(contract.getContractStatus());
            supplementResponseDTO.setHotelId(hotel.getHotelId());
            supplementResponseDTO.setHotelName(hotel.getHotelName());

            return new StandardResponse<>(HttpStatus.OK.value(), "Supplement found", supplementResponseDTO);

        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to get Supplement", null);
        }
    }

    /**
     * Retrieves a list of supplements by contract ID.
     *
     * @param contractId The ID of the contract
     * @return A list of SupplementResponseDTO objects
     * @throws ServiceException if the supplement search fails
     */
    @Override
    public StandardResponse<List<SupplementResponseDTO>> getSupplementByContract(Integer contractId) {
        try {
            List<Supplement> supplementList = supplementRepository.findAllSupplementsByContractContractId(contractId);
            if (supplementList.isEmpty()) {
                return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), "No supplements found for the contract" + contractId, null);
            }

            List<SupplementResponseDTO> supplementResponseDTOList = supplementList.stream()
                    .map(supplement -> getSupplementById(supplement.getSupplementId()).getData()).toList();

            return new StandardResponse<>(HttpStatus.OK.value(), "Supplements found for the contract" + contractId, supplementResponseDTOList);

        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to get Supplements", null);
        }
    }

    @Override
    public StandardResponse<List<Supplement>> updateSupplements(List<SupplementRequestDTO> supplementRequestDTOs) {
        List<Supplement> updatedSupplements = new ArrayList<>();

        try {
            for (SupplementRequestDTO supplementRequestDTO : supplementRequestDTOs) {
                Supplement existingSupplement = supplementRepository.findById(supplementRequestDTO.getSupplementId())
                        .orElseThrow(() -> new ResourceNotFoundException("Supplement not found with ID: " + supplementRequestDTO.getSupplementId()));

                // Update supplement fields
                existingSupplement.setSupplementName(supplementRequestDTO.getSupplementName());
                existingSupplement.setSupplementDescription(supplementRequestDTO.getSupplementDescription());

                // Save updated supplement
                updatedSupplements.add(supplementRepository.save(existingSupplement));
            }

            return new StandardResponse<>(HttpStatus.OK.value(), "Supplements updated successfully", updatedSupplements);
        } catch (ResourceNotFoundException e) {
            return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), e.getMessage(), null);
        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Supplements update failed: " + e.getMessage(), null);
        }
    }

    @Override
    public StandardResponse<Void> deleteSupplementById(Integer supplementId) {
        try {
            supplementRepository.deleteById(supplementId);
            return new StandardResponse<>(HttpStatus.OK.value(), "Supplement deleted successfully", null);
        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Supplement deletion failed: " + e.getMessage(), null);
        }
    }

    @Override
    public StandardResponse<Void> deleteSupplementsByIds(List<Integer> supplementIds) {
        try {
            supplementRepository.deleteAllByIdInBatch(supplementIds);
            return new StandardResponse<>(HttpStatus.OK.value(), "Supplements deleted successfully", null);
        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Supplement deletion failed: " + e.getMessage(), null);
        }
    }
}
