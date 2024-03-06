package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.*;
import com.codegen.hotelmanagementsystembackend.entities.*;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.RoomTypeRepository;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import com.codegen.hotelmanagementsystembackend.services.RoomTypeService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomTypeServiceImpl implements RoomTypeService {

    private final SeasonRepository seasonRepository;
    private final ContractRepository contractRepository;
    private final RoomTypeRepository roomTypeRepository;

    @Override
    public String createRoomType(List<RoomTypeDTO> roomTypeDTOS) {
        if (roomTypeDTOS == null || roomTypeDTOS.isEmpty()) {
            return "No RoomTypes provided.";
        }

        try {
            for (RoomTypeDTO roomTypeDTO : roomTypeDTOS) {
                RoomType newRoomType = new RoomType();
                newRoomType.setRoomTypeId(roomTypeDTO.getRoomTypeId());
                newRoomType.setRoomTypeName(roomTypeDTO.getRoomTypeName());
                newRoomType.setRoomDimensions(roomTypeDTO.getRoomDimensions());
                newRoomType.setMaxAdults(roomTypeDTO.getMaxAdults());
                newRoomType.setContract(contractRepository.findById(roomTypeDTO.getContractId())
                        .orElseThrow(() -> new ResourceNotFoundException("Contract not found with ID: " + roomTypeDTO.getContractId())));

                for (SeasonRoomTypeDTO seasonRoomTypeDTO : roomTypeDTO.getSeasonRoomTypes()) {
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

                for(RoomTypeImagesDTO roomTypeImagesDTO : roomTypeDTO.getRoomTypeImages()){
                    RoomTypeImages newRoomTypeImage = new RoomTypeImages();
                    newRoomTypeImage.setRoomType(newRoomType);
                    newRoomTypeImage.setImageURL(roomTypeImagesDTO.getImageURL());

                    newRoomType.getRoomTypeImages().add(newRoomTypeImage);
                }

                roomTypeRepository.save(newRoomType);
            }

            return "RoomTypes Added";
        } catch (Exception e) {
            // Handle any unexpected exceptions
            return "An error occurred while adding RoomTypes: " + e.getMessage();
        }
    }

}
