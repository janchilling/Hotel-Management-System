package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.*;
import com.codegen.hotelmanagementsystembackend.entities.*;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.*;
import com.codegen.hotelmanagementsystembackend.services.RoomTypeService;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.sql.Date;
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
    private final BookingRoomRepository bookingRoomRepository;
    private final UtilityMethods utilityMethods;
    private final ModelMapper modelMapper;

    /**
     * Creates a list of room types based on the provided room type request DTOs.
     *
     * @param  roomTypeRequestDTOS   the list of room type request DTOs
     * @return                      the list of created room types
     */
    @Override
    public StandardResponse<List<RoomType>> createRoomType(List<RoomTypeRequestDTO> roomTypeRequestDTOS) {
        if (roomTypeRequestDTOS == null || roomTypeRequestDTOS.isEmpty()) {
            return new StandardResponse<>(HttpStatus.BAD_REQUEST.value(), "Empty request", null);
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
                    RoomTypeImages roomTypeImages = new RoomTypeImages();
                    roomTypeImages.setRoomType(savedRoomType);
                    roomTypeImages.setImageURL(roomTypeImagesDTO.getImageURL());
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

            return new StandardResponse<>(HttpStatus.CREATED.value(), "Room Types created successfully", roomTypesList);
        } catch (ResourceNotFoundException e) {
            return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), e.getMessage(), null);
        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Room Types creation failed: " + e.getMessage(), null);
        }
    }

    /**
     * A description of the entire Java function.
     *
     * @param  roomTypeId    description of parameter
     * @return              description of return value
     */
    @Override
    public StandardResponse<RoomTypeResponseDTO> getRoomTypeById(Integer roomTypeId) {
        try {
            RoomType roomType = utilityMethods.getRoomType(roomTypeId);
            if (roomType == null) {
                return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), "Room type not found", null);
            }

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

            return new StandardResponse<>(HttpStatus.OK.value(), "Room type found", roomTypeResponseDTO);
        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to get Room Type", null);
        }
    }


    /**
     * Retrieves a list of room types associated with a contract.
     *
     * @param  contractId  the ID of the contract
     * @return             a list of room types associated with the specified contract
     */
    @Override
    public StandardResponse<List<RoomTypeResponseDTO>> getRoomTypeByContract(Integer contractId) {
        try {
            List<RoomType> roomTypeList = roomTypeRepository.findAllRoomTypesByContractContractId(contractId);
            if (roomTypeList.isEmpty()) {
                return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), "No room types found for the contract" + contractId, null);
            }

            List<RoomTypeResponseDTO> roomTypeResponseDTOList = roomTypeList.stream()
                    .map(roomType -> {
                        StandardResponse<RoomTypeResponseDTO> response = getRoomTypeById(roomType.getRoomTypeId());
                        return response.getData();
                    })
                    .collect(Collectors.toList());

            return new StandardResponse<>(HttpStatus.OK.value(), "Room types found for the contract" + contractId, roomTypeResponseDTOList);
        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to get Room Type", null);
        }
    }


    public StandardResponse<Integer> getAvailableRoomTypeCount(Integer roomTypeId, Date checkInDate, Date checkOutDate, Integer seasonId) {
        try {
            // Find the room type by ID
            RoomType roomType = utilityMethods.getRoomType(roomTypeId);
            Season season = utilityMethods.getSeason(seasonId);
            SeasonRoomType seasonRoomType = utilityMethods.getSeasonRoomType(season, roomType);

            if (roomType == null) {
                return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), "Room type not found", null);
            }

            // Get the total number of rooms for the room type
            int totalRooms = seasonRoomType.getNoOfRooms();

            // Get the number of booked rooms for the given period
            Integer bookedRooms = bookingRoomRepository.countBookedRooms(roomTypeId, checkInDate, checkOutDate);
            bookedRooms = bookedRooms != null ? bookedRooms : 0; // Handle null case

            // Calculate available rooms
            int availableRooms = totalRooms - bookedRooms;

            return new StandardResponse<>(HttpStatus.OK.value(), "Available room count: " + availableRooms, availableRooms);
        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to get room type count", null);
        }
    }

}
