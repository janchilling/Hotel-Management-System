package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.*;
import com.codegen.hotelmanagementsystembackend.entities.Contract;
import com.codegen.hotelmanagementsystembackend.entities.Hotel;
import com.codegen.hotelmanagementsystembackend.entities.Season;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.HotelRepository;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import com.codegen.hotelmanagementsystembackend.services.ContractService;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
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
    private final UtilityMethods utilityMethods;

    /**
     * Create a new contract based on the provided contract request data.
     *
     * @param  contractRequestDTO  the contract request data
     * @return                     the created contract
     */
    @Override
    public StandardResponse<Contract> createContract(ContractRequestDTO contractRequestDTO) {
        try {
            boolean hasOverlappingDates = contractRepository.existsByHotelHotelIdAndStartDateBeforeAndEndDateAfter(
                    contractRequestDTO.getHotelId(), contractRequestDTO.getEndDate(), contractRequestDTO.getStartDate());
            if (hasOverlappingDates) {
                return new StandardResponse<>(HttpStatus.CONFLICT.value(), "Contract dates overlap with existing contracts", null);
            }
            System.out.println(contractRequestDTO.getHotelId());

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

            return new StandardResponse<>(HttpStatus.CREATED.value(), "Contract created successfully", savedContract);

        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to create Contract : " + e.getMessage(), null);
        }
    }

    @Override
    public ContractResponseDTO getContractById(Integer contractId) {
        try{

            Contract contract = utilityMethods.getContract(contractId);
            Hotel hotel = utilityMethods.getHotel(contract.getHotel().getHotelId());

            ContractResponseDTO contractResponseDTO = modelMapper.map(contract, ContractResponseDTO.class);

            contractResponseDTO.setSeasons(contract.getSeasons().stream()
                    .map(season -> {
                        SeasonResponseDTO seasonResponseDTO =modelMapper.map(season, SeasonResponseDTO.class);
                        seasonResponseDTO.setHotelName(hotel.getHotelName());
                        seasonResponseDTO.setHotelId(hotel.getHotelId());
                        return seasonResponseDTO;
                    })
                    .collect(Collectors.toList()));

            contractResponseDTO.setDiscounts(contract.getDiscounts().stream()
                    .map(discount -> {
                        DiscountResponseDTO discountResponseDTO =modelMapper.map(discount, DiscountResponseDTO.class);
                        discountResponseDTO.setHotelName(hotel.getHotelName());
                        discountResponseDTO.setHotelId(hotel.getHotelId());
                        return discountResponseDTO;
                    })
                    .collect(Collectors.toList()));

            contractResponseDTO.setRoomTypes(contract.getRoomTypes().stream()
                    .map(roomType -> {
                        RoomTypeResponseDTO roomTypeResponseDTO =modelMapper.map(roomType, RoomTypeResponseDTO.class);
                        roomTypeResponseDTO.setHotelName(hotel.getHotelName());
                        roomTypeResponseDTO.setHotelId(hotel.getHotelId());
                        return roomTypeResponseDTO;
                    })
                    .collect(Collectors.toList()));

            contractResponseDTO.setSupplements(contract.getSupplements().stream()
                    .map(supplement -> {
                        SupplementResponseDTO supplementResponseDTO =modelMapper.map(supplement, SupplementResponseDTO.class);
                        supplementResponseDTO.setHotelName(hotel.getHotelName());
                        supplementResponseDTO.setHotelId(hotel.getHotelId());
                        return supplementResponseDTO;
                    })
                    .collect(Collectors.toList()));

            return contractResponseDTO;

        }catch (Exception e){
            throw new ServiceException("Failed to find Contract", e);
        }
    }
}
