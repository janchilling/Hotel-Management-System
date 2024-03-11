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
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    public List<Discount> createDiscount(List<DiscountRequestDTO> discountRequestDTOS) {
        if (discountRequestDTOS == null || discountRequestDTOS.isEmpty()) {
            return null;
        }

        List<Discount> discountsList = new ArrayList<>();

        // Try with O(n) and test cases and best way of identifying data duplication

        try {
            for (DiscountRequestDTO discountRequestDTO : discountRequestDTOS) {
                Discount newDiscount = new Discount();
                newDiscount.setDiscountId(discountRequestDTO.getDiscountId());
                newDiscount.setDiscountName(discountRequestDTO.getDiscountName());
                newDiscount.setDiscountDescription(discountRequestDTO.getDiscountDescription());
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
                    seasonDiscount.setStartDate(seasonDiscountDTO.getStartDate());
                    seasonDiscount.setEndDate(seasonDiscountDTO.getEndDate());
                    seasonDiscount.setDiscountPercentage(seasonDiscountDTO.getDiscountPercentage());
//                    seasonDiscount.setSeason(seasonRepository.findById(seasonDiscountDTO.getSeasonId())
//                            .orElseThrow(() -> new ResourceNotFoundException("Season not found with ID: " + seasonDiscountDTO.getSeasonId())));
                    seasonDiscount.setSeason(utilityMethods.getSeason(seasonDiscountDTO.getSeasonId()));

                    newDiscount.getSeasonDiscounts().add(seasonDiscount);
                }
                discountsList.add(newDiscount);
            }
            return discountRepository.saveAll(discountsList);
        }catch (Exception e){
            throw new ServiceException("Discount creation failed");
        }
    }

    /**
     * Retrieves a discount by its ID and returns a DiscountResponseDTO object.
     *
     * @param  discountId  the ID of the discount to retrieve
     * @return             the DiscountResponseDTO object representing the retrieved discount
     */
    @Override
    public DiscountResponseDTO getDiscountById(Integer discountId) {

        try{
            Discount discount = utilityMethods.getDiscount(discountId);
            Contract contract = utilityMethods.getContract(discount.getContract().getContractId());
            Hotel hotel = utilityMethods.getHotel(contract.getHotel().getHotelId());

            DiscountResponseDTO discountResponseDTO = modelMapper.map(discount, DiscountResponseDTO.class);
            discountResponseDTO.setSeasonDiscounts(discount.getSeasonDiscounts().stream().map(
                    seasonDiscount -> {
                        SeasonDiscountResponseDTO seasonDiscountResponseDTO = modelMapper.map(seasonDiscount, SeasonDiscountResponseDTO.class);
                        seasonDiscountResponseDTO.setSeasonName(utilityMethods.getSeason(seasonDiscount.getSeason().getSeasonId()).getSeasonName());
                        return seasonDiscountResponseDTO;
                    }).toList());

            discountResponseDTO.setContractId(contract.getContractId());
            discountResponseDTO.setContractStatus(contract.getContractStatus());
            discountResponseDTO.setHotelId(hotel.getHotelId());
            discountResponseDTO.setHotelName(hotel.getHotelName());

            return discountResponseDTO;

        }catch (Exception e){
            throw new ServiceException("Discount search failed");
        }
    }

    /**
     * Retrieves a list of discount response DTOs based on the contract ID.
     *
     * @param  contractId  the ID of the contract
     * @return             a list of discount response DTOs
     */
    @Override
    public List<DiscountResponseDTO> getDiscountByContract(Integer contractId) {

        try{
            List<Discount> discountList =  discountRepository.findAllDiscountsByContractContractId(contractId);
            if (discountList.isEmpty()) {
                throw new ResourceNotFoundException("No discounts found for the contract" + contractId);
            }

            return discountList.stream()
                    .map(
                    discounts ->
                        getDiscountById(discounts.getDiscountId())
                    ).collect(Collectors.toList());
        }catch(Exception e){
            throw new ServiceException("Getting Discount failed");
        }
    }

    /**
     * Retrieves a list of discounts by hotel ID.
     *
     * @param  hotelId  the ID of the hotel
     * @return          a list of discounts for the hotel
     */
    @Override
    public List<List<DiscountResponseDTO>> getDiscountByHotel(Integer hotelId) {

        try{
            List<Contract> contractList = contractRepository.findAllContractsByHotelHotelId(hotelId);
            if (contractList.isEmpty()) {
                throw new ResourceNotFoundException("No contracts found for the hotel" + hotelId);
            }
            return contractList.stream()
                    .map(contract ->
                            getDiscountByContract(contract.getContractId())
                    )
                    .collect(Collectors.toList());

        }catch(Exception e){
            throw new ServiceException("Getting Discount failed");
        }
    }
}
