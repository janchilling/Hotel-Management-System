package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.*;
import com.codegen.hotelmanagementsystembackend.entities.*;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.RoomTypeRepository;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import com.codegen.hotelmanagementsystembackend.services.RoomTypeService;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomTypeServiceImpl implements RoomTypeService {

    private final SeasonRepository seasonRepository;
    private final ContractRepository contractRepository;
    private final RoomTypeRepository roomTypeRepository;
    private final UtilityMethods utilityMethods;
    private final ModelMapper modelMapper;

    /**
     * Creates a list of room types based on the provided room type request DTOs.
     *
     * @param  roomTypeRequestDTOS   the list of room type request DTOs
     * @return                      the list of created room types
     */
    @Override
    public List<RoomType> createRoomType(List<RoomTypeRequestDTO> roomTypeRequestDTOS) {
        if (roomTypeRequestDTOS == null || roomTypeRequestDTOS.isEmpty()) {
            return null;
        }

        List<RoomType> roomTypesList = new ArrayList<>();

        try {
            for (RoomTypeRequestDTO roomTypeRequestDTO : roomTypeRequestDTOS) {
                RoomType newRoomType = new RoomType();
                newRoomType.setRoomTypeId(roomTypeRequestDTO.getRoomTypeId());
                newRoomType.setRoomTypeName(roomTypeRequestDTO.getRoomTypeName());
                newRoomType.setRoomDimensions(roomTypeRequestDTO.getRoomDimensions());
                newRoomType.setMaxAdults(roomTypeRequestDTO.getMaxAdults());
                newRoomType.setContract(contractRepository.findById(roomTypeRequestDTO.getContractId())
                        .orElseThrow(() -> new ResourceNotFoundException("Contract not found with ID: " + roomTypeRequestDTO.getContractId())));

                for (SeasonRoomTypeDTO seasonRoomTypeDTO : roomTypeRequestDTO.getSeasonRoomTypes()) {
                    SeasonRoomType seasonRoomType = new SeasonRoomType();
                    seasonRoomType.setRoomType(newRoomType);
                    SeasonRoomTypeKey seasonRoomTypeKey = new SeasonRoomTypeKey();
                    if (seasonRoomTypeDTO.getSeasonId() != null) {
                        seasonRoomTypeKey.setSeasonId(seasonRoomTypeDTO.getSeasonId());
                    }
                    if (newRoomType.getRoomTypeId() != null) {
                        seasonRoomTypeKey.setRoomTypeId(newRoomType.getRoomTypeId());
                    }
                    seasonRoomType.setSeasonRoomTypeKey(seasonRoomTypeKey);
                    seasonRoomType.setNoOfRooms(seasonRoomTypeDTO.getNoOfRooms());
                    seasonRoomType.setRoomPrice(seasonRoomTypeDTO.getRoomPrice());
                    seasonRoomType.setSeason(seasonRepository.findById(seasonRoomTypeDTO.getSeasonId())
                            .orElseThrow(() -> new ResourceNotFoundException("Season not found with ID: " + seasonRoomTypeDTO.getSeasonId())));

                    newRoomType.getSeasonRoomtype().add(seasonRoomType);
                }

                for(RoomTypeImagesDTO roomTypeImagesDTO : roomTypeRequestDTO.getRoomTypeImages()){
                    RoomTypeImages newRoomTypeImage = new RoomTypeImages();
                    newRoomTypeImage.setRoomType(newRoomType);
                    newRoomTypeImage.setImageURL(roomTypeImagesDTO.getImageURL());

                    newRoomType.getRoomTypeImages().add(newRoomTypeImage);
                }

                roomTypesList.add(newRoomType);
//                roomTypeRepository.save(newRoomType);
            }

            return roomTypeRepository.saveAll(roomTypesList);
        } catch (Exception e) {
            throw new ServiceException("Failed to create Room Types", e);
        }
    }

    /**
     * A description of the entire Java function.
     *
     * @param  discountId    description of parameter
     * @return              description of return value
     */
    @Override
    public RoomTypeResponseDTO getRoomTypeById(Integer discountId) {

        try{
            RoomType roomType = utilityMethods.getRoomType(discountId);
            Contract contract = utilityMethods.getContract(roomType.getContract().getContractId());
            Hotel hotel = utilityMethods.getHotel(contract.getHotel().getHotelId());

            RoomTypeResponseDTO roomTypeResponseDTO = modelMapper.map(roomType, RoomTypeResponseDTO.class);
            roomTypeResponseDTO.setContractId(contract.getContractId());
            roomTypeResponseDTO.setHotelId(hotel.getHotelId());
            roomTypeResponseDTO.setContractStatus(contract.getContractStatus());
            roomTypeResponseDTO.setHotelName(hotel.getHotelName());

            roomTypeResponseDTO.setRoomTypeImages(roomType.getRoomTypeImages().stream().map(
                    roomTypeImages -> modelMapper.map(roomTypeImages, RoomTypeImagesResponseDTO.class)
            ).toList());

            roomTypeResponseDTO.setSeasonRoomtype(roomType.getSeasonRoomtype().stream().map(
                    seasonRoomType -> {
                        Season season = utilityMethods.getSeason(seasonRoomType.getSeason().getSeasonId());
                        SeasonRoomTypeResponseDTO seasonRoomTypeResponseDTO = modelMapper.map(seasonRoomType, SeasonRoomTypeResponseDTO.class);
                        seasonRoomTypeResponseDTO.setSeasonName(season.getSeasonName());
                        return seasonRoomTypeResponseDTO;
                    }
            ).collect(Collectors.toList()));

            return roomTypeResponseDTO;

        }catch(Exception e){
            throw new ServiceException("Failed to get Room Type", e);
        }
    }

    /**
     * Retrieves a list of room types associated with a contract.
     *
     * @param  contractId  the ID of the contract
     * @return             a list of room types associated with the specified contract
     */
    @Override
    public List<RoomTypeResponseDTO> getRoomTypeByContract(Integer contractId) {

        try{
            List<RoomType> roomTypeList =  roomTypeRepository.findAllRoomTypesByContractContractId(contractId);
            if (roomTypeList.isEmpty()) {
                throw new ResourceNotFoundException("No room types found for the contract" + contractId);
            }

            return roomTypeList.stream()
                    .map(
                    roomType ->
                        getRoomTypeById(roomType.getRoomTypeId())
                    ).collect(Collectors.toList());

        }catch (Exception e){
            throw new ServiceException("Failed to get Room Type", e);
        }
    }

    @Override
    public List<List<RoomTypeResponseDTO>> getRoomTypeByHotel(Integer hotelId) {

        try{

            List<Contract> contracts = contractRepository.findAllContractsByHotelHotelId(hotelId);
            if (contracts.isEmpty()) {
                throw new ResourceNotFoundException("No contracts found for the hotel" + hotelId);
            }

            return contracts.stream()
                    .map(contract ->
                            getRoomTypeByContract(contract.getContractId())
                    ).collect(Collectors.toList());

        }catch (Exception e){
            throw new ServiceException("Failed to get Room Type", e);
        }
    }

}
