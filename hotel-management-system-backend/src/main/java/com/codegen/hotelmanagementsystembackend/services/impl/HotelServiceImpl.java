package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.HotelImageDTO;
import com.codegen.hotelmanagementsystembackend.dto.HotelRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.HotelResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Hotel;
import com.codegen.hotelmanagementsystembackend.entities.HotelImage;
import com.codegen.hotelmanagementsystembackend.entities.HotelPhone;
import com.codegen.hotelmanagementsystembackend.exception.ResourceAlreadyExistsException;
import com.codegen.hotelmanagementsystembackend.repository.HotelRepository;
import com.codegen.hotelmanagementsystembackend.services.HotelService;
import com.codegen.hotelmanagementsystembackend.entities.Contract;

import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HotelServiceImpl implements HotelService {

    private final ModelMapper modelMapper;
    private final HotelRepository hotelRepository;
    private final UtilityMethods utilityMethods;

    /**
     * Creates a new Hotel using the provided HotelRequestDTO.
     *
     * @param  hotelRequestDTO   the DTO containing the details of the new hotel
     * @return                   the newly created Hotel
     */
    @Override
    public StandardResponse<Hotel> createHotel(HotelRequestDTO hotelRequestDTO) {
        try {
            if (hotelRepository.existsByHotelNameAndHotelStreetAddress(
                    hotelRequestDTO.getHotelName(), hotelRequestDTO.getHotelStreetAddress())) {
//                return new ResourceAlreadyExistsException("Hotel with the same name and address already exists" + " hotelName : "
//                        + hotelRequestDTO.getHotelName() +  " hotelStreetAddress : " + hotelRequestDTO.getHotelStreetAddress());
                String message = "Hotel with the same name and address already exists";
//                logger.error(message);
                return new StandardResponse<>(HttpStatus.CONFLICT.value(), message, null);
            }

            Hotel newHotel = modelMapper.map(hotelRequestDTO, Hotel.class);

            List<HotelImage> hotelImages = hotelRequestDTO.getHotelImages().stream()
                    .map(imageDTO -> {
                        HotelImage hotelImage = modelMapper.map(imageDTO, HotelImage.class);
                        hotelImage.setHotel(newHotel);
                        return hotelImage;
                    })
                    .collect(Collectors.toList());

            newHotel.setHotelImages(hotelImages);

            List<HotelPhone> hotelPhones = hotelRequestDTO.getHotelPhones().stream()
                    .map(phoneDTO -> {
                        HotelPhone hotelPhone = modelMapper.map(phoneDTO, HotelPhone.class);
                        hotelPhone.setHotel(newHotel);
                        return hotelPhone;
                    })
                    .collect(Collectors.toList());

            newHotel.setHotelPhones(hotelPhones);

            return new StandardResponse<>(HttpStatus.CREATED.value(), "Hotel created successfully", hotelRepository.save(newHotel));

        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to create Hotel", null);
        }
    }


    /**
     * Retrieves a hotel by its ID.
     *
     * @param  hotelId   the ID of the hotel to retrieve
     * @return          the hotel response DTO
     */

//    Log4j  use logs

    @Override
    public HotelResponseDTO getHotelById(Integer hotelId) {
        try {
            Hotel hotel = hotelRepository.findById(hotelId)
                    .orElseThrow(() -> new ServiceException("Hotel not found"));

            HotelResponseDTO hotelResponseDTO = modelMapper.map(hotel, HotelResponseDTO.class);

            hotelResponseDTO.setContractIds(hotel.getContracts().stream()
                    .map(Contract::getContractId)
                    .collect(Collectors.toList()));
            hotelResponseDTO.setContractStatuses(hotel.getContracts().stream()
                    .map(Contract::getContractStatus)
                    .collect(Collectors.toList()));

            return hotelResponseDTO;
        } catch (Exception e) {
            // Handle other exceptions!!!!!
            throw new ServiceException("An error occurred while retrieving the hotel", e);
        }
    }

    public StandardResponse<List<HotelImageDTO>> getHotelImagesByHotelId(Integer hotelId) {
        try {
            Hotel hotel = utilityMethods.getHotel(hotelId);
            if ( hotel == null) {
                return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), "Hotel not found", null);
            }else {
                List<HotelImage> hotelImages = hotel.getHotelImages();
                List<HotelImageDTO> hotelImageDTOs = hotelImages.stream()
                        .map(hotelImage -> modelMapper.map(hotelImage, HotelImageDTO.class))
                        .collect(Collectors.toList());
                return new StandardResponse<>(HttpStatus.OK.value(), "Hotel images retrieved successfully", hotelImageDTOs);
            }
           } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to retrieve hotel images", null);
        }
    }

}
