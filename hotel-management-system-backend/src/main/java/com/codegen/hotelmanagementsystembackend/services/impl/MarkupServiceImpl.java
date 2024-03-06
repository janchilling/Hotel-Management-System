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
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class MarkupServiceImpl implements MarkupService {

    private final MarkupRepository markupRepository;
    private final SeasonRepository seasonRepository;
    private final ContractRepository contractRepository;

    @Override
    @Transactional
    public String createMarkup(MarkupDTO markupDTO) {
        Markup newMarkup = new Markup();
        newMarkup.setMarkupId(markupDTO.getMarkupId());
        newMarkup.setContract(contractRepository.findById(markupDTO.getContractId()).orElse(null));

        Set<SeasonMarkup> seasonMarkups = new HashSet<>();

        if (markupDTO.getSeasonMarkups() != null) {
            for (SeasonMarkupDTO seasonMarkupDto : markupDTO.getSeasonMarkups()) {
                SeasonMarkup seasonMarkup = new SeasonMarkup();
                SeasonMarkupKey seasonMarkupKey = new SeasonMarkupKey();
                seasonMarkupKey.setSeasonId(seasonMarkupDto.getSeasonId());
                // Since the markup ID is generated only after saving, you cannot set it here
                 seasonMarkupKey.setMarkupId(newMarkup.getMarkupId());
                System.out.println(newMarkup.getMarkupId());

                System.out.println(seasonMarkupDto.getSeasonId() + "\n\n");
                seasonMarkup.setSeasonMarkupKey(seasonMarkupKey);
                seasonMarkup.setMarkupPercentage(seasonMarkupDto.getMarkupPercentage());
                seasonMarkup.setMarkup(newMarkup);
                seasonMarkup.setSeason(seasonRepository.findById(seasonMarkupDto.getSeasonId()).orElse(null));
//                seasonMarkups.add(seasonMarkup);
                newMarkup.getSeasonMarkups().add(seasonMarkup);
            }
        }

//        newMarkup.setSeasonMarkups(seasonMarkups);

        markupRepository.save(newMarkup);
        return "Markup Added";
    }
}
