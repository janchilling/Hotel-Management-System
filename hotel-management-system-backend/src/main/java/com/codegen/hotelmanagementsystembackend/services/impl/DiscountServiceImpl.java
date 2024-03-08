package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.DiscountRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.SeasonDiscountDTO;
import com.codegen.hotelmanagementsystembackend.entities.Discount;
import com.codegen.hotelmanagementsystembackend.entities.Hotel;
import com.codegen.hotelmanagementsystembackend.entities.SeasonDiscount;
import com.codegen.hotelmanagementsystembackend.entities.SeasonDiscountKey;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.DiscountRepository;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import com.codegen.hotelmanagementsystembackend.services.DiscountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DiscountServiceImpl implements DiscountService {

    private final DiscountRepository discountRepository;
    private final SeasonRepository seasonRepository;
    private final ContractRepository contractRepository;

    @Override
    public List<Discount> createDiscount(List<DiscountRequestDTO> discountRequestDTOS) {
        if (discountRequestDTOS == null || discountRequestDTOS.isEmpty()) {
            return null;
        }

        List<Discount> discountsList = new ArrayList<>();

        // Try with O(n) and test cases

        for (DiscountRequestDTO discountRequestDTO : discountRequestDTOS) {
            Discount newDiscount = new Discount();
            newDiscount.setDiscountId(discountRequestDTO.getDiscountId());
            newDiscount.setDiscountName(discountRequestDTO.getDiscountName());
            newDiscount.setDiscountDescription(discountRequestDTO.getDiscountDescription());
            newDiscount.setContract(contractRepository.findById(discountRequestDTO.getContractId()).orElse(null));

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
                seasonDiscount.setSeason(seasonRepository.findById(seasonDiscountDTO.getSeasonId()).orElse(null));

                newDiscount.getSeasonDiscounts().add(seasonDiscount);
            }
            discountsList.add(newDiscount);
//            discountRepository.save(newDiscount);
        }
        return discountRepository.saveAll(discountsList);
//        return "Discounts Added";
    }
}

