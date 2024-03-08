package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.*;
import com.codegen.hotelmanagementsystembackend.entities.*;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.RoomTypeRepository;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import com.codegen.hotelmanagementsystembackend.services.RoomTypeService;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomTypeServiceImpl implements RoomTypeService {

    private final SeasonRepository seasonRepository;
    private final ContractRepository contractRepository;
    private final RoomTypeRepository roomTypeRepository;

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

}
