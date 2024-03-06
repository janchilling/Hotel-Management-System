package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.MarkupDTO;
import com.codegen.hotelmanagementsystembackend.dto.SeasonMarkupDTO;
import com.codegen.hotelmanagementsystembackend.entities.Markup;
import com.codegen.hotelmanagementsystembackend.entities.SeasonMarkup;
import com.codegen.hotelmanagementsystembackend.entities.SeasonMarkupKey;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.MarkupRepository;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import com.codegen.hotelmanagementsystembackend.services.MarkupService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MarkupServiceImpl implements MarkupService {

    private final MarkupRepository markupRepository;
    private final SeasonRepository seasonRepository;
    private final ContractRepository contractRepository;

    @Override
    public String createMarkup(List<MarkupDTO> markupDTOs) {
        if (markupDTOs == null || markupDTOs.isEmpty()) {
            return "No markups provided.";
        }

        for (MarkupDTO markupDTO : markupDTOs) {
            Markup newMarkup = new Markup();
            newMarkup.setMarkupId(markupDTO.getMarkupId());
            newMarkup.setContract(contractRepository.findById(markupDTO.getContractId()).orElse(null));

            for (SeasonMarkupDTO seasonMarkupDto : markupDTO.getSeasonMarkups()) {
                SeasonMarkup seasonMarkup = new SeasonMarkup();
                seasonMarkup.setMarkup(newMarkup);
                SeasonMarkupKey seasonMarkupKey = new SeasonMarkupKey();
                if (seasonMarkupDto.getSeasonId() != null) {
                    seasonMarkupKey.setSeasonId(seasonMarkupDto.getSeasonId());
                }
                if (newMarkup.getMarkupId() != null) {
                    seasonMarkupKey.setMarkupId(newMarkup.getMarkupId());
                }
                seasonMarkup.setSeasonMarkupKey(seasonMarkupKey);
                seasonMarkup.setMarkupPercentage(seasonMarkupDto.getMarkupPercentage());
                seasonMarkup.setSeason(seasonRepository.findById(seasonMarkupDto.getSeasonId()).orElse(null));

                newMarkup.getSeasonMarkups().add(seasonMarkup);
            }
            markupRepository.save(newMarkup);
        }

        return "Markups Added";
    }
}
