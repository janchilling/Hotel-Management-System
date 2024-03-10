package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.*;
import com.codegen.hotelmanagementsystembackend.entities.*;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import com.codegen.hotelmanagementsystembackend.repository.SupplementRepository;
import com.codegen.hotelmanagementsystembackend.services.SupplementService;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SupplementServiceImpl implements SupplementService {

    private final ContractRepository contractRepository;
    private final SeasonRepository seasonRepository;
    private final SupplementRepository supplementRepository;

    /**
     * Create supplements based on the provided SupplementRequestDTOs.
     *
     * @param  supplementRequestDTOs  list of SupplementRequestDTOs
     * @return                       list of created supplements
     */
    @Override
    public List<Supplement> createSupplement(List<SupplementRequestDTO> supplementRequestDTOs) {

        if (supplementRequestDTOs == null || supplementRequestDTOs.isEmpty()) {
            return null;
        }

        List<Supplement> supplementsList = new ArrayList<>();

        try {
            for (SupplementRequestDTO supplementRequestDTO : supplementRequestDTOs) {
                Supplement newSupplement = new Supplement();
//                newSupplement.setMarkupId(markupRequestDTO.getMarkupId());
                newSupplement.setSupplementDescription(supplementRequestDTO.getSupplementDescription());
                newSupplement.setSupplementName(supplementRequestDTO.getSupplementName());
                newSupplement.setSupplementType(supplementRequestDTO.getSupplementType());
                newSupplement.setContract(contractRepository.findById(supplementRequestDTO.getContractId())
                        .orElseThrow(() -> new ResourceNotFoundException("Contract not found with ID: " + supplementRequestDTO.getContractId())));

                for (SeasonSupplementDTO seasonSupplementDTO : supplementRequestDTO.getSupplementsSeasons()) {
                    SeasonSupplement seasonSupplement = new SeasonSupplement();
                    seasonSupplement.setSupplement(newSupplement);
                    SeasonSupplementKey seasonSupplementKey = new SeasonSupplementKey();
                    if (seasonSupplementDTO.getSeasonId() != null) {
                        seasonSupplementKey.setSeasonId(seasonSupplementDTO.getSeasonId());
                    }
                    if (newSupplement.getSupplementId() != null) {
                        seasonSupplementKey.setSupplementId(newSupplement.getSupplementId());
                    }
                    seasonSupplement.setSeasonSupplementKey(seasonSupplementKey);
                    seasonSupplement.setSupplementPrice(seasonSupplementDTO.getSupplementPrice());
                    seasonSupplement.setSeason(seasonRepository.findById(seasonSupplementDTO.getSeasonId())
                            .orElseThrow(() -> new ResourceNotFoundException("Season not found with ID: " + seasonSupplementDTO.getSeasonId())));

                    newSupplement.getSupplementsSeasons().add(seasonSupplement);
                }
                supplementsList.add(newSupplement);
            }

            return supplementRepository.saveAll(supplementsList);

        }

        catch (Exception e) {
            throw new ServiceException("Error while creating supplements: " + e.getMessage());
        }}
}


//    @Override
//    public String addContractDetails(AddContractDetailsRequestDTO addContractDetailsRequestDTO) {
//
//        Contract contract = contractRepository.getReferenceById(addContractDetailsRequestDTO.getContractId());
//        Set<Supplement> supplementsSet = new HashSet<>();
//
//        Set<AddSupplementRequestDTO> supplements = addContractDetailsRequestDTO.getSupplements();
//        System.out.println(supplements);
//        if (supplements != null) {
//            for (AddSupplementRequestDTO supplementsDTO  : supplements) {
//                Supplement supplement = new Supplement();
//                supplement.setSupplementType(supplementsDTO.getSupplementType());
//                supplement.setSupplementDescription(supplementsDTO.getSupplementDescription());
//                supplement.setSupplementName(supplementsDTO.getSupplementName());
//                supplement.setContract(contract);
//                supplementsSet.add(supplement);
//            }
//
//            supplementRepository.saveAll(supplementsSet);
//
//            for (AddSupplementRequestDTO supplementsDTO  : supplements) {
//
//                SeasonSupplement seasonSupplement = new SeasonSupplement();
//                Supplement supplement = supplementRepository.findBySupplementNameAndContract(
//                        supplementsDTO.getSupplementName(), contract);
//
//                seasonSupplement.setSeason(seasonRepository.getReferenceById(supplementsDTO.getSeasonId()));
//                seasonSupplement.setSupplement(supplement);
//                seasonSupplement.setSupplement_price(supplementsDTO.getSupplementPrice());
//                seasonSupplementRepository.save(seasonSupplement);
//            }
//
//
//        }
//        return "Contract Details Added!";
