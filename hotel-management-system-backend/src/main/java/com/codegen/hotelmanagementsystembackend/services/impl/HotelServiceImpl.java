package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.HotelRequestDTO;
import com.codegen.hotelmanagementsystembackend.entities.Hotel;
import com.codegen.hotelmanagementsystembackend.entities.HotelImage;
import com.codegen.hotelmanagementsystembackend.entities.HotelPhone;
import com.codegen.hotelmanagementsystembackend.repository.HotelRepository;
import com.codegen.hotelmanagementsystembackend.services.HotelService;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HotelServiceImpl implements HotelService {

    private final ModelMapper modelMapper;
    private final HotelRepository hotelRepository;

    /**
     * Creates a new Hotel using the provided HotelRequestDTO.
     *
     * @param  hotelRequestDTO   the DTO containing the details of the new hotel
     * @return                   the newly created Hotel
     */
    @Override
    public Hotel createHotel(HotelRequestDTO hotelRequestDTO) {
        try {
            if (hotelRepository.existsByHotelNameAndHotelStreetAddress(
                    hotelRequestDTO.getHotelName(), hotelRequestDTO.getHotelStreetAddress())) {
                throw new ServiceException("Hotel with the same name and address already exists");
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

            return hotelRepository.save(newHotel);

        } catch (Exception e) {
            throw new ServiceException("Failed to create Hotel", e);
        }
    }

}
