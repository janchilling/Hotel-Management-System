package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.DiscountDTO;
import com.codegen.hotelmanagementsystembackend.dto.SeasonDiscountDTO;
import com.codegen.hotelmanagementsystembackend.entities.Discount;
import com.codegen.hotelmanagementsystembackend.entities.SeasonDiscount;
import com.codegen.hotelmanagementsystembackend.entities.SeasonDiscountKey;
import com.codegen.hotelmanagementsystembackend.entities.SeasonMarkupKey;
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

        Set<Discount> discounts = new HashSet<>();
        Set<SeasonDiscount> seasonDiscounts = new HashSet<>();

        for (DiscountDTO discountDTO : discountDTOs) {
            Discount newDiscount = new Discount();
            newDiscount.setDiscountId(discountDTO.getDiscountId());
            newDiscount.setDiscountName(discountDTO.getDiscountName());
            newDiscount.setDiscountDescription(discountDTO.getDiscountDescription());
            newDiscount.setContract(contractRepository.findById(discountDTO.getContractId()).orElse(null));


            for (SeasonDiscountDTO seasonDiscountDTO : discountDTO.getSeasonDiscounts()) {

                SeasonDiscount seasonDiscount = getSeasonDiscount(seasonDiscountDTO, newDiscount);
                System.out.println(seasonDiscount);
//                seasonDiscounts.add(seasonDiscount);
                newDiscount.setSeasonDiscounts(seasonDiscounts);
            }

            System.out.println(newDiscount);
            discounts.add(newDiscount);
        }
        discountRepository.saveAll(discounts);

        return "Discounts Added";
    }

    private SeasonDiscount getSeasonDiscount(SeasonDiscountDTO seasonDiscountDTO, Discount newDiscount) {
        SeasonDiscount seasonDiscount = new SeasonDiscount();
        seasonDiscount.setDiscount(newDiscount); // Set the discount property
        SeasonDiscountKey seasonDiscountKey = new SeasonDiscountKey();
        seasonDiscountKey.setSeasonId(seasonDiscountDTO.getSeasonId());
        seasonDiscountKey.setDiscountId(newDiscount.getDiscountId());
        // Set other properties of SeasonDiscount
        // For example:
        seasonDiscount.setStartDate(seasonDiscountDTO.getStartDate());
        seasonDiscount.setEndDate(seasonDiscountDTO.getEndDate());
        seasonDiscount.setDiscountPercentage(seasonDiscountDTO.getDiscountPercentage());
        seasonDiscount.setSeason(seasonRepository.findById(seasonDiscountDTO.getSeasonId()).orElse(null));
        return seasonDiscount;
    }

}
