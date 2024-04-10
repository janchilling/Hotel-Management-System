package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.SeasonResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.*;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.HotelRepository;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import com.codegen.hotelmanagementsystembackend.services.SeasonService;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SeasonServiceImpl implements SeasonService {

    private final ModelMapper modelMapper;
    private final SeasonRepository seasonRepository;
    private final ContractRepository contractRepository;
    private final HotelRepository hotelRepository;
    private final UtilityMethods utilityMethods;

    /**
     * Retrieves a SeasonResponseDTO by its ID.
     *
     * @param  seasonId  the ID of the season to retrieve
     * @return           the SeasonResponseDTO object with the retrieved season details
     */
    @Override
    public SeasonResponseDTO getSeasonById(Integer seasonId) {
        try {
            Season season = utilityMethods.getSeason(seasonId);
            Contract contract = utilityMethods.getContract(season.getContract().getContractId());
            Hotel hotel = utilityMethods.getHotel(contract.getHotel().getHotelId());

            Integer contractId = contract.getContractId();

            Integer hotelId = hotel.getHotelId();
            String hotelName = hotel.getHotelName();

            SeasonResponseDTO seasonResponseDTO = modelMapper.map(season, SeasonResponseDTO.class);
            seasonResponseDTO.setContractId(contractId);
            seasonResponseDTO.setHotelId(hotelId);
            seasonResponseDTO.setHotelName(hotelName);

            return seasonResponseDTO;
        } catch (Exception e) {
            // Handle other exceptions!!!!!
            throw new ServiceException("An error occurred while retrieving the hotel", e);
        }
    }

    /**
     * Retrieves a list of season response DTOs based on the provided hotel ID.
     *
     * @param  hotelId  the ID of the hotel
     * @return          the list of season response DTOs
     */
    @Override
    public List<List<SeasonResponseDTO>> getSeasonByHotel(Integer hotelId) {

        try{
            List<Contract> contractList = contractRepository.findAllContractsByHotelHotelId(hotelId);
            if (contractList.isEmpty()) {
                throw new ResourceNotFoundException("No contracts found for the hotel" + hotelId);
            }
            return contractList.stream()
                    .map(contract ->
                            getSeasonByContract(contract.getContractId())
                    )
                    .collect(Collectors.toList());
        }catch(Exception e){
            throw new ServiceException("An error occurred while retrieving the hotel", e);
        }
    }

    /**
     * Retrieves a list of season response DTOs for a given contract ID.
     *
     * @param  contractId  the ID of the contract
     * @return             a list of season response DTOs
     */
    @Override
    public List<SeasonResponseDTO> getSeasonByContract(Integer contractId) {

        try {
            List<Season> seasons = seasonRepository.findAllSeasonsByContractContractId(contractId);

            if (seasons.isEmpty()) {
                throw new ResourceNotFoundException("No seasons found for the contract" + contractId);
            }

            Contract contract = utilityMethods.getContract(contractId);
            Hotel hotel = utilityMethods.getHotel(contract.getHotel().getHotelId());

            return seasons.stream()
                    .map(season -> {
                        SeasonResponseDTO seasonResponseDTO = modelMapper.map(season, SeasonResponseDTO.class);
                        seasonResponseDTO.setContractId(contractId);
                        seasonResponseDTO.setContractStatus(contract.getContractStatus());
                        seasonResponseDTO.setHotelId(hotel.getHotelId());
                        seasonResponseDTO.setHotelName(hotel.getHotelName());
                        return seasonResponseDTO;
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            // Handle other exceptions!!!!!
            throw new ServiceException("An error occurred while retrieving the hotel", e);
        }
    }

    public Integer getSeasonByCheckInOutDates(Contract contract, Date checkInDate, Date checkOutDate) {
        List<Season> seasons = contract.getSeasons();
        for (Season season : seasons) {
            if (checkInDate.after(season.getStartDate()) && checkOutDate.before(season.getEndDate())) {
                return season.getSeasonId();
            }
        }
        return null; // No season found for the given dates within the contract
    }
}
