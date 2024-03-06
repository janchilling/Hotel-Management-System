package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.MarkupDTO;
import com.codegen.hotelmanagementsystembackend.dto.SeasonMarkupDTO;
import com.codegen.hotelmanagementsystembackend.entities.Markup;
import com.codegen.hotelmanagementsystembackend.entities.SeasonMarkup;
import com.codegen.hotelmanagementsystembackend.entities.SeasonMarkupKey;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.MarkupRepository;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import com.codegen.hotelmanagementsystembackend.services.MarkupService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MarkupServiceImpl implements MarkupService {

    private final MarkupRepository markupRepository;
    private final SeasonRepository seasonRepository;
    private final ContractRepository contractRepository;

    @Override
    @Transactional
    public String createMarkup(List<MarkupDTO> markupDTOs) {
        if (markupDTOs == null || markupDTOs.isEmpty()) {
            return "No markups provided.";
        }

        try {
            for (MarkupDTO markupDTO : markupDTOs) {
                Markup newMarkup = new Markup();
                newMarkup.setMarkupId(markupDTO.getMarkupId());
                newMarkup.setContract(contractRepository.findById(markupDTO.getContractId())
                        .orElseThrow(() -> new ResourceNotFoundException("Contract not found with ID: " + markupDTO.getContractId())));

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
                    seasonMarkup.setSeason(seasonRepository.findById(seasonMarkupDto.getSeasonId())
                            .orElseThrow(() -> new ResourceNotFoundException("Season not found with ID: " + seasonMarkupDto.getSeasonId())));

                    newMarkup.getSeasonMarkups().add(seasonMarkup);
                }
                markupRepository.save(newMarkup);
            }

            return "Markups Added";
        } catch (Exception e) {
            throw new ServiceException("Failed to create markups", e);
        }
    }
}
