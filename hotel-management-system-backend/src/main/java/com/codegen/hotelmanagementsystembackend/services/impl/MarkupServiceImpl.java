package com.codegen.hotelmanagementsystembackend.services.impl;

import ch.qos.logback.core.model.Model;
import com.codegen.hotelmanagementsystembackend.dto.*;
import com.codegen.hotelmanagementsystembackend.entities.*;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.MarkupRepository;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import com.codegen.hotelmanagementsystembackend.services.MarkupService;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MarkupServiceImpl implements MarkupService {

    private final MarkupRepository markupRepository;
    private final SeasonRepository seasonRepository;
    private final ContractRepository contractRepository;
    private final UtilityMethods utilityMethods;
    private final ModelMapper modelMapper;

    private static final Logger logger = LoggerFactory.getLogger(MarkupServiceImpl.class);

    @Override
    @Transactional
    public StandardResponse<Markup> createMarkup(MarkupRequestDTO markupRequestDTO) {
        if (markupRequestDTO == null) {
            return new StandardResponse<>(400, "Invalid request: Markup request DTO is null", null);
        }

        try {
            Markup newMarkup = new Markup();
            newMarkup.setMarkupId(markupRequestDTO.getMarkupId());
            newMarkup.setContract(contractRepository.findById(markupRequestDTO.getContractId())
                    .orElseThrow(() -> new ResourceNotFoundException("Contract not found with ID: " + markupRequestDTO.getContractId())));

            List<SeasonMarkup> seasonMarkups = new ArrayList<>();

            for (SeasonMarkupDTO seasonMarkupDto : markupRequestDTO.getSeasonMarkups()) {
                SeasonMarkup seasonMarkup = new SeasonMarkup();
                SeasonMarkupKey seasonMarkupKey = new SeasonMarkupKey();

                if (seasonMarkupDto.getSeasonId() != null) {
                    Season season = seasonRepository.findById(seasonMarkupDto.getSeasonId())
                            .orElseThrow(() -> new ResourceNotFoundException("Season not found with ID: " + seasonMarkupDto.getSeasonId()));
                    seasonMarkup.setSeason(season);
                    seasonMarkupKey.setSeasonId(seasonMarkupDto.getSeasonId());
                } else {
                    logger.warn("Season ID is null for a markup. Skipping this markup entry.");
                    continue; // Skip this markup entry as it's invalid
                }

                seasonMarkup.setMarkupPercentage(seasonMarkupDto.getMarkupPercentage());
                seasonMarkup.setSeasonMarkupKey(seasonMarkupKey);
                seasonMarkup.setMarkup(newMarkup);

                seasonMarkups.add(seasonMarkup);
            }

            newMarkup.setSeasonMarkups(seasonMarkups);
            markupRepository.save(newMarkup);

            return new StandardResponse<>(HttpStatus.CREATED.value(), "Markup created successfully", newMarkup);
        } catch (ResourceNotFoundException e) {
            logger.error("Resource not found: {}", e.getMessage());
            return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), "Resource not found: " + e.getMessage(), null);
        } catch (Exception e) {
            logger.error("Failed to create markups: {}", e.getMessage());
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to create markups: " + e.getMessage(), null);
        }
    }

    @Override
    public MarkupResponseDTO getMarkupById(Integer markupId) {

        try{
            Markup markup = utilityMethods.getMarkup(markupId);
            Contract contract = utilityMethods.getContract(markup.getContract().getContractId());
            Hotel hotel = utilityMethods.getHotel(contract.getHotel().getHotelId());

            MarkupResponseDTO markupResponseDTO = modelMapper.map(markup, MarkupResponseDTO.class);
            markupResponseDTO.setSeasonMarkups(markup.getSeasonMarkups().stream().map(
                    seasonMarkup -> {
                        Season season = utilityMethods.getSeason(seasonMarkup.getSeason().getSeasonId());
                        SeasonMarkupResponseDTO seasonMarkupResponseDTO = modelMapper.map(seasonMarkup, SeasonMarkupResponseDTO.class);
                        seasonMarkupResponseDTO.setSeasonName(season.getSeasonName());
                        seasonMarkupResponseDTO.setEndDate(season.getEndDate());
                        seasonMarkupResponseDTO.setStartDate(season.getStartDate());
                        return seasonMarkupResponseDTO;
                    }).toList());

            markupResponseDTO.setContractId(contract.getContractId());
            markupResponseDTO.setContractStatus(contract.getContractStatus());
            markupResponseDTO.setHotelId(hotel.getHotelId());
            markupResponseDTO.setHotelName(hotel.getHotelName());

            return markupResponseDTO;

        }catch (Exception e){
            throw new ServiceException("Discount search failed");
        }
    }

    @Override
    public List<MarkupResponseDTO> getMarkupByContract(Integer contractId) {
        try{
            List<Markup> markupList =  markupRepository.findAllMarkupsByContractContractId(contractId);
            if (markupList.isEmpty()) {
                throw new ResourceNotFoundException("No markups found for the contract" + contractId);
            }

            return markupList.stream().map(markups -> getMarkupById(markups.getMarkupId())).collect(Collectors.toList());

        }catch(Exception e){
            throw new ServiceException("Getting markups failed");
        }
    }

}