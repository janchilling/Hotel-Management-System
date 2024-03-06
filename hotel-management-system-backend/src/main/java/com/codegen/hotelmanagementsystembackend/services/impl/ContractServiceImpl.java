package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.*;
import com.codegen.hotelmanagementsystembackend.entities.*;
import com.codegen.hotelmanagementsystembackend.repository.*;
import com.codegen.hotelmanagementsystembackend.services.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ContractServiceImpl implements ContractService {

    private final ContractRepository contractRepository;
    private final SeasonRepository seasonRepository;
    private final SupplementRepository supplementRepository;
    private final SeasonSupplementRepository seasonSupplementRepository;
    @Override
    public Contract createContract(ContractDTO contractDTO) {

        Contract contract = getContract(contractDTO);

        Contract savedContract = contractRepository.save(contract);

        List<SeasonDTO> seasons = contractDTO.getSeasons();
        if (seasons != null) {
            for (SeasonDTO seasonDTO  : seasons) {
                Season season = new Season();
                season.setSeasonName(seasonDTO.getSeasonName());
                season.setStartDate(seasonDTO.getStartDate());
                season.setEndDate(seasonDTO.getEndDate());
                season.setContract(savedContract);
                seasonRepository.save(season);
            }
        }

        return savedContract;
    }

    @Override
    public String addContractDetails(AddContractDetailsRequestDTO addContractDetailsRequestDTO) {

        Contract contract = contractRepository.getReferenceById(addContractDetailsRequestDTO.getContractId());
        Set<Supplement> supplementsSet = new HashSet<>();

        Set<AddSupplementRequestDTO> supplements = addContractDetailsRequestDTO.getSupplements();
        System.out.println(supplements);
        if (supplements != null) {
            for (AddSupplementRequestDTO supplementsDTO  : supplements) {
                Supplement supplement = new Supplement();
                supplement.setSupplement_type(supplementsDTO.getSupplementType());
                supplement.setSupplement_description(supplementsDTO.getSupplementDescription());
                supplement.setSupplementName(supplementsDTO.getSupplementName());
                supplement.setContract(contract);
                supplementsSet.add(supplement);
            }

            supplementRepository.saveAll(supplementsSet);

            for (AddSupplementRequestDTO supplementsDTO  : supplements) {

                SeasonSupplement seasonSupplement = new SeasonSupplement();
                Supplement supplement = supplementRepository.findBySupplementNameAndContract(
                        supplementsDTO.getSupplementName(), contract);

                seasonSupplement.setSeason(seasonRepository.getReferenceById(supplementsDTO.getSeasonId()));
                seasonSupplement.setSupplement(supplement);
                seasonSupplement.setSupplement_price(supplementsDTO.getSupplementPrice());
                seasonSupplementRepository.save(seasonSupplement);
            }


        }
        return "Contract Details Added!";
    }

    private static Contract getContract(ContractDTO contractDTO) {
        Contract contract = new Contract();

        contract.setStart_date(contractDTO.getStartDate());
        contract.setEnd_date(contractDTO.getEndDate());
        contract.setContract_status(contractDTO.getContractStatus());
        contract.setCancellation_deadline(contractDTO.getCancellationDeadline());
        contract.setCancellation_amount(contractDTO.getCancellationAmount());
        contract.setPrepayment(contractDTO.getPrepayment());
        contract.setBalance_payment(contractDTO.getBalancePayment());
        return contract;
    }
}
