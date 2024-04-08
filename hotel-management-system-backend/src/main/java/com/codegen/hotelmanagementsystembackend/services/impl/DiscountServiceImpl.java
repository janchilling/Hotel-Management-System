package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.DiscountRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.DiscountResponseDTO;
import com.codegen.hotelmanagementsystembackend.dto.SeasonDiscountDTO;
import com.codegen.hotelmanagementsystembackend.dto.SeasonDiscountResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.*;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.DiscountRepository;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import com.codegen.hotelmanagementsystembackend.services.DiscountService;
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

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class DiscountServiceImpl implements DiscountService {

    private final DiscountRepository discountRepository;
    private final ContractRepository contractRepository;
    private final UtilityMethods utilityMethods;
    private final ModelMapper modelMapper;

    /**
     * Create discounts based on the given list of DiscountRequestDTOs.
     *
     * @param  discountRequestDTOS  the list of DiscountRequestDTOs
     * @return                      the list of created discounts
     */
    @Override
    public StandardResponse<List<Discount>> createDiscount(List<DiscountRequestDTO> discountRequestDTOS) {
        if (discountRequestDTOS == null || discountRequestDTOS.isEmpty()) {
            return new StandardResponse<>(HttpStatus.BAD_REQUEST.value(), "Empty request", null);
        }

        List<Discount> discountsList = new ArrayList<>();

        try {
            for (DiscountRequestDTO discountRequestDTO : discountRequestDTOS) {
                Discount newDiscount = new Discount();
                newDiscount.setDiscountId(discountRequestDTO.getDiscountId());
                newDiscount.setDiscountName(discountRequestDTO.getDiscountName());
                newDiscount.setDiscountDescription(discountRequestDTO.getDiscountDescription());
                newDiscount.setDiscountCode(discountRequestDTO.getDiscountCode());
//                newDiscount.setContract(contractRepository.findById(discountRequestDTO.getContractId())
//                        .orElseThrow(() -> new ResourceNotFoundException("Contract not found with ID: " + discountRequestDTO.getContractId())));
                newDiscount.setContract(utilityMethods.getContract(discountRequestDTO.getContractId()));

                for (SeasonDiscountDTO seasonDiscountDTO : discountRequestDTO.getSeasonDiscounts()) {
                    SeasonDiscount seasonDiscount = new SeasonDiscount();
                    seasonDiscount.setDiscount(newDiscount);
                    SeasonDiscountKey seasonDiscountKey = new SeasonDiscountKey();
                    if (seasonDiscountDTO.getSeasonId() != null) {
                        seasonDiscountKey.setSeasonId(seasonDiscountDTO.getSeasonId());
                    }
                    if (newDiscount.getDiscountId() != null) {
                        seasonDiscountKey.setDiscountId(newDiscount.getDiscountId());
                    }
                    seasonDiscount.setSeasonDiscountKey(seasonDiscountKey);
                    seasonDiscount.setDiscountPercentage(seasonDiscountDTO.getDiscountPercentage());
//                    seasonDiscount.setSeason(seasonRepository.findById(seasonDiscountDTO.getSeasonId())
//                            .orElseThrow(() -> new ResourceNotFoundException("Season not found with ID: " + seasonDiscountDTO.getSeasonId())));
                    seasonDiscount.setSeason(utilityMethods.getSeason(seasonDiscountDTO.getSeasonId()));

                    newDiscount.getSeasonDiscounts().add(seasonDiscount);
                }
                discountsList.add(newDiscount);
            }
            return new StandardResponse<>(HttpStatus.CREATED.value(), "Discounts created successfully", discountRepository.saveAll(discountsList));
        } catch (ResourceNotFoundException e) {
            return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), e.getMessage(), null);
        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Discount creation failed: " + e.getMessage(), null);
        }
    }

    /**
     * Retrieves a discount by its ID and returns a DiscountResponseDTO object.
     *
     * @param  discountId  the ID of the discount to retrieve
     * @return             the DiscountResponseDTO object representing the retrieved discount
     */
    @Override
    public StandardResponse<DiscountResponseDTO> getDiscountById(Integer discountId) {
        try {
            Discount discount = utilityMethods.getDiscount(discountId);
            Contract contract = utilityMethods.getContract(discount.getContract().getContractId());
            Hotel hotel = utilityMethods.getHotel(contract.getHotel().getHotelId());

            DiscountResponseDTO discountResponseDTO = modelMapper.map(discount, DiscountResponseDTO.class);
            discountResponseDTO.setSeasonDiscounts(discount.getSeasonDiscounts().stream().map(
                    seasonDiscount -> {
                        Season season = utilityMethods.getSeason(seasonDiscount.getSeason().getSeasonId());
                        SeasonDiscountResponseDTO seasonDiscountResponseDTO = modelMapper.map(seasonDiscount, SeasonDiscountResponseDTO.class);
                        seasonDiscountResponseDTO.setSeasonName(season.getSeasonName());
                        seasonDiscountResponseDTO.setEndDate(season.getEndDate());
                        seasonDiscountResponseDTO.setStartDate(season.getStartDate());
                        return seasonDiscountResponseDTO;
                    }).toList());

            discountResponseDTO.setContractId(contract.getContractId());
            discountResponseDTO.setContractStatus(contract.getContractStatus());
            discountResponseDTO.setHotelId(hotel.getHotelId());
            discountResponseDTO.setHotelName(hotel.getHotelName());

            return new StandardResponse<>(HttpStatus.OK.value(), "Discount found", discountResponseDTO);
        } catch (ResourceNotFoundException e) {
            return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), "Discount not found", null);
        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Discount search failed", null);
        }
    }

    /**
     * Retrieves a list of discount response DTOs based on the contract ID.
     *
     * @param  contractId  the ID of the contract
     * @return             a list of discount response DTOs
     */
    @Override
    public StandardResponse<List<DiscountResponseDTO>> getDiscountByContract(Integer contractId) {
        try {
            List<Discount> discountList = discountRepository.findAllDiscountsByContractContractId(contractId);
            if (discountList.isEmpty()) {
                return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), "No discounts found for the contract", null);
            }

            List<DiscountResponseDTO> discountResponseDTOs = discountList.stream().map(discounts -> getDiscountById(discounts.getDiscountId()).getData()).toList();
            return new StandardResponse<>(HttpStatus.OK.value(), "Discounts found", discountResponseDTOs);
        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Getting discounts failed", null);
        }
    }

}
