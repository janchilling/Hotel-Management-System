package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.ContractRequestDTO;
import com.codegen.hotelmanagementsystembackend.entities.Contract;
import com.codegen.hotelmanagementsystembackend.entities.Season;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.HotelRepository;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import com.codegen.hotelmanagementsystembackend.services.ContractService;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContractServiceImpl implements ContractService {

    private final ModelMapper modelMapper;
    private final ContractRepository contractRepository;
    private final HotelRepository hotelRepository;
    private final SeasonRepository seasonRepository;

    /**
     * Create a new contract based on the provided contract request data.
     *
     * @param  contractRequestDTO  the contract request data
     * @return                     the created contract
     */
    @Override
    public Contract createContract(ContractRequestDTO contractRequestDTO) {
        try {

            boolean hasActiveContract = contractRepository.existsByHotelHotelIdAndContractStatus(contractRequestDTO.getHotelId(), "Active");
            if (hasActiveContract) {
                throw new ServiceException("Cannot create contract for a hotel with active contract status");
            }

            Contract newContract = modelMapper.map(contractRequestDTO, Contract.class);
            newContract.setHotel(hotelRepository.findById(contractRequestDTO.getHotelId())
                    .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with ID: " + contractRequestDTO.getHotelId())));

            Contract savedContract = contractRepository.save(newContract);

            List<Season> seasons = contractRequestDTO.getSeasons().stream()
                    .map(seasonRequestDTO -> {
                        Season season = modelMapper.map(seasonRequestDTO, Season.class);
                        season.setContract(newContract);
                        return season;
                    })
                    .collect(Collectors.toList());

            seasonRepository.saveAll(seasons);

            return savedContract;

        } catch (Exception e) {
            throw new ServiceException("Failed to create Contract", e);
        }
    }
}
