package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.HotelResponseDTO;
import com.codegen.hotelmanagementsystembackend.dto.SearchResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Hotel;
import com.codegen.hotelmanagementsystembackend.entities.Contract;
import com.codegen.hotelmanagementsystembackend.repository.HotelRepository;
import com.codegen.hotelmanagementsystembackend.services.ProductService;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ModelMapper modelMapper;
    private final HotelRepository hotelRepository;

    @Override
    public StandardResponse<List<SearchResponseDTO>> searchHotels(String destination, Integer noOfRooms, Date checkIn, Date checkOut) {
        try {
            List<Hotel> hotels = hotelRepository.findByHotelNameContainingOrHotelCityContainingOrHotelCountryContaining(destination, destination, destination);

            List<Hotel> hotelsWithActiveContracts = hotels.stream()
                    .filter(hotel -> hasActiveContract(hotel, checkIn, checkOut))
                    .collect(Collectors.toList());

            if (hotelsWithActiveContracts.isEmpty()) {
                return new StandardResponse<>(404, "No hotels found with active contracts within the specified dates", null);
            }

            List<SearchResponseDTO> searchResponseDTOS = hotelsWithActiveContracts.stream()
                    .map(hotel -> {
                        SearchResponseDTO searchResponseDTO = modelMapper.map(hotel, SearchResponseDTO.class);
                        searchResponseDTO.setContractId(hotel.getContracts().stream()
                                .filter(contract -> contract.getContractStatus().equalsIgnoreCase("Active"))
                                .findFirst()
                                .map(Contract::getContractId)
                                .orElse(null)); // Set the contract ID
                        return searchResponseDTO;
                    })
                    .collect(Collectors.toList());

            return new StandardResponse<>(200, "Hotels found", searchResponseDTOS);
        } catch (Exception e) {
            // Log the exception
            // logger.error("An error occurred while searching hotels", e);
            return new StandardResponse<>(500, "An error occurred while searching hotels", null);
        }
    }

    private boolean hasActiveContract(Hotel hotel, Date checkIn, Date checkOut) {
        return hotel.getContracts().stream()
                .anyMatch(contract -> contract.getContractStatus().equalsIgnoreCase("Active") &&
                        contract.getStartDate().before(checkOut) &&
                        contract.getEndDate().after(checkIn));
    }
}
