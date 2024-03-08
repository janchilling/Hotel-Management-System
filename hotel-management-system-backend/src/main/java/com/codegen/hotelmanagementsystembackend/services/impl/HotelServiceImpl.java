package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.HotelImageDTO;
import com.codegen.hotelmanagementsystembackend.dto.HotelPhoneDTO;
import com.codegen.hotelmanagementsystembackend.dto.HotelRequestDTO;
import com.codegen.hotelmanagementsystembackend.entities.Hotel;
import com.codegen.hotelmanagementsystembackend.entities.HotelImage;
import com.codegen.hotelmanagementsystembackend.entities.HotelPhone;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.HotelRepository;
import com.codegen.hotelmanagementsystembackend.services.HotelService;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HotelServiceImpl implements HotelService {

    private final ContractRepository contractRepository;
    private final HotelRepository hotelRepository;
    @Override
    public Hotel createHotel(HotelRequestDTO hotelRequestDTO) {

        try {
            Hotel newHotel = new Hotel();

            newHotel.setHotelName(hotelRequestDTO.getHotelName());
            newHotel.setHotelDescription(hotelRequestDTO.getHotelDescription());
            newHotel.setHotelEmail(hotelRequestDTO.getHotelEmail());
            newHotel.setHotelStreetAddress(hotelRequestDTO.getHotelStreetAddress());
            newHotel.setHotelCity(hotelRequestDTO.getHotelCity());
            newHotel.setHotelState(hotelRequestDTO.getHotelState());
            newHotel.setHotelState(hotelRequestDTO.getHotelState());
            newHotel.setHotelCountry(hotelRequestDTO.getHotelCountry());
            newHotel.setHotelPostalCode(hotelRequestDTO.getHotelPostalCode());

            for(HotelImageDTO hotelImageDTO : hotelRequestDTO.getHotelImages()){
                HotelImage hotelImage = new HotelImage();
                hotelImage.setHotelImageURL(hotelImageDTO.getImageURL());
                hotelImage.setHotel(newHotel);
                newHotel.getHotelImages().add(hotelImage);
            }

            for(HotelPhoneDTO hotelPhoneDTO : hotelRequestDTO.getHotelPhones()){
                HotelPhone hotelPhone = new HotelPhone();
                hotelPhone.setHotelPhone(hotelPhoneDTO.getHotelPhone());
                hotelPhone.setHotel(newHotel);
                newHotel.getHotelPhones().add(hotelPhone);
            }

            return hotelRepository.save(newHotel);

        }catch (Exception e){
            throw new ServiceException("Failed to create Hotel");
        }
    }
}
