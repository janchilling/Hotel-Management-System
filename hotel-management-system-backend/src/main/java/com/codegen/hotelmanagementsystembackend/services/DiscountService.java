package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.DiscountRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.DiscountResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Discount;

import java.util.List;

public interface DiscountService {

    /**
     * Creates a list of discounts based on the given list of discount request DTOs.
     *
     * @param  discountRequestDTOS   the list of discount request DTOs
     * @return                      a list of discounts
     */
    List<Discount> createDiscount(List<DiscountRequestDTO> discountRequestDTOS);

    /**
     * Get discount by ID.
     *
     * @param  discountId   The ID of the discount to retrieve
     * @return              The DiscountResponseDTO object for the specified ID
     */
    DiscountResponseDTO getDiscountById(Integer discountId);

    /**
     * A description of the getDiscountByContract Java function.
     *
     * @param  contractId   description of parameter
     * @return              description of return value
     */
    List<DiscountResponseDTO> getDiscountByContract(Integer contractId);

    /**
     * Get discount information for a specific hotel.
     *
     * @param  hotelId    the ID of the hotel to retrieve discount information for
     * @return           a list of discount response DTOs for the specified hotel
     */
    List<List<DiscountResponseDTO>> getDiscountByHotel(Integer hotelId);

}
