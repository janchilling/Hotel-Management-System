package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.*;
import com.codegen.hotelmanagementsystembackend.entities.*;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.*;
import com.codegen.hotelmanagementsystembackend.services.RoomTypeService;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomTypeServiceImpl implements RoomTypeService {

    private final SeasonRepository seasonRepository;
    private final ContractRepository contractRepository;
    private final RoomTypeRepository roomTypeRepository;
    private final RoomTypeImagesRepository roomTypeImagesRepository;
    private final SeasonRoomTypeRepository seasonRoomTypeRepository;
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

                RoomType savedRoomType = roomTypeRepository.save(newRoomType);

                for (RoomTypeImagesDTO roomTypeImagesDTO : roomTypeRequestDTO.getRoomTypeImages()) {
                    System.out.println("Hello");
                    System.out.println(roomTypeImagesDTO.getImageURL());
                    System.out.println("Hello");
                    RoomTypeImages roomTypeImages = new RoomTypeImages();
                    System.out.println("Hello");
                    roomTypeImages.setRoomType(savedRoomType);
                    System.out.println("Hello");
                    roomTypeImages.setImageURL(roomTypeImagesDTO.getImageURL());
                    System.out.println("Hello");
                    roomTypeImagesRepository.save(roomTypeImages);
                }

                for (SeasonRoomTypeDTO seasonRoomTypeDTO : roomTypeRequestDTO.getSeasonRoomTypes()) {
                    SeasonRoomType seasonRoomType = new SeasonRoomType();
                    seasonRoomType.setRoomType(savedRoomType);
                    SeasonRoomTypeKey seasonRoomTypeKey = new SeasonRoomTypeKey();
                    if (seasonRoomTypeDTO.getSeasonId() != null) {
                        seasonRoomTypeKey.setSeasonId(seasonRoomTypeDTO.getSeasonId());
                    }
                    if (newRoomType.getRoomTypeId() != null) {
                        seasonRoomTypeKey.setRoomTypeId(newRoomType.getRoomTypeId());
                    }
                    seasonRoomType.setSeasonRoomTypeKey(seasonRoomTypeKey);
                    seasonRoomType.setNoOfRooms(seasonRoomTypeDTO.getNoOfRooms());
                    seasonRoomType.setRoomTypePrice(seasonRoomTypeDTO.getRoomTypePrice());
                    seasonRoomType.setSeason(seasonRepository.findById(seasonRoomTypeDTO.getSeasonId())
                            .orElseThrow(() -> new ResourceNotFoundException("Season not found with ID: " + seasonRoomTypeDTO.getSeasonId())));

                    seasonRoomTypeRepository.save(seasonRoomType);
                }

                roomTypesList.add(savedRoomType);
            }

            return roomTypesList;
        } catch (Exception e) {
            throw new ServiceException("Failed to create Room Types"+ e.getMessage());
        }
    }

    /**
     * A description of the entire Java function.
     *
     * @param  roomTypeId    description of parameter
     * @return              description of return value
     */
    @Override
    public RoomTypeResponseDTO getRoomTypeById(Integer roomTypeId) {

        try{
            RoomType roomType = utilityMethods.getRoomType(roomTypeId);
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
                        seasonRoomTypeResponseDTO.setStartDate(season.getStartDate());
                        seasonRoomTypeResponseDTO.setEndDate(season.getEndDate());
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

    /**
     * Retrieves the room types for a given hotel.
     *
     * @param  hotelId   the ID of the hotel
     * @return          a list of lists of RoomTypeResponseDTO objects
     */
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
