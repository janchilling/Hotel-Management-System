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
    public Contract createContract(ContractRequestDTO contractRequestDTO) {

        Contract contract = getContract(contractRequestDTO);

        Contract savedContract = contractRepository.save(contract);

        List<SeasonRequestDTO> seasons = contractRequestDTO.getSeasons();
        if (seasons != null) {
            for (SeasonRequestDTO seasonRequestDTO : seasons) {
                Season season = new Season();
                season.setSeasonName(seasonRequestDTO.getSeasonName());
                season.setStartDate(seasonRequestDTO.getStartDate());
                season.setEndDate(seasonRequestDTO.getEndDate());
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

    private static Contract getContract(ContractRequestDTO contractRequestDTO) {
        Contract contract = new Contract();

        contract.setStart_date(contractRequestDTO.getStartDate());
        contract.setEnd_date(contractRequestDTO.getEndDate());
        contract.setContract_status(contractRequestDTO.getContractStatus());
        contract.setCancellation_deadline(contractRequestDTO.getCancellationDeadline());
        contract.setCancellation_amount(contractRequestDTO.getCancellationAmount());
        contract.setPrepayment(contractRequestDTO.getPrepayment());
        contract.setBalance_payment(contractRequestDTO.getBalancePayment());
        return contract;
    }
}
