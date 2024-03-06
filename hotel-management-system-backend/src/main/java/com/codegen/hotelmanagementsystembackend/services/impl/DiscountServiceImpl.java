package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.DiscountDTO;
import com.codegen.hotelmanagementsystembackend.dto.SeasonDiscountDTO;
import com.codegen.hotelmanagementsystembackend.entities.Discount;
import com.codegen.hotelmanagementsystembackend.entities.SeasonDiscount;
import com.codegen.hotelmanagementsystembackend.entities.SeasonDiscountKey;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.DiscountRepository;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import com.codegen.hotelmanagementsystembackend.services.DiscountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class DiscountServiceImpl implements DiscountService {

    private final DiscountRepository discountRepository;
    private final SeasonRepository seasonRepository;
    private final ContractRepository contractRepository;

    @Override
    public String createDiscount(List<DiscountDTO> discountDTOs) {
        if (discountDTOs == null || discountDTOs.isEmpty()) {
            return "No discounts provided.";
        }

        // Try with O(n)

        for (DiscountDTO discountDTO : discountDTOs) {
            Discount newDiscount = new Discount();
            newDiscount.setDiscountId(discountDTO.getDiscountId());
            newDiscount.setDiscountName(discountDTO.getDiscountName());
            newDiscount.setDiscountDescription(discountDTO.getDiscountDescription());
            newDiscount.setContract(contractRepository.findById(discountDTO.getContractId()).orElse(null));

            for (SeasonDiscountDTO seasonDiscountDTO : discountDTO.getSeasonDiscounts()) {
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
                seasonDiscount.setSeason(seasonRepository.findById(seasonDiscountDTO.getSeasonId()).orElse(null));

                newDiscount.getSeasonDiscounts().add(seasonDiscount);
            }
            discountRepository.save(newDiscount);
        }

        return "Discounts Added";
    }
}

