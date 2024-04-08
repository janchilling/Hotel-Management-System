package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.HotelResponseDTO;
import com.codegen.hotelmanagementsystembackend.dto.SearchResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Hotel;
import com.codegen.hotelmanagementsystembackend.entities.Contract;
import com.codegen.hotelmanagementsystembackend.repository.HotelRepository;
import com.codegen.hotelmanagementsystembackend.services.ProductService;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
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
    private final UtilityMethods utilityMethods;


    /**
     * Searches hotels based on the destination, number of rooms, check-in and check-out dates.
     *
     * @param  destination  the destination to search for hotels
     * @param  noOfRooms    the number of rooms needed
     * @param  checkIn      the check-in date
     * @param  checkOut     the check-out date
     * @return              a standard response containing a list of search response DTOs
     */
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

    /**
     * A description of the entire Java function.
     *
     * @param  hotelId    description of parameter
     * @return            description of return value
     */
    @Override
    public StandardResponse<SearchResponseDTO> getHotelByIdActive(Integer hotelId) {
        try {
            Hotel hotel = utilityMethods.getHotel(hotelId);
            if (hotel == null) {
                return new StandardResponse<>(404, "Hotel not found", null);
            }
            SearchResponseDTO searchResponseDTO = modelMapper.map(hotel, SearchResponseDTO.class);
            searchResponseDTO.setContractId(hotel.getContracts().stream()
                    .filter(contract -> contract.getContractStatus().equalsIgnoreCase("Active"))
                    .findFirst()
                    .map(Contract::getContractId)
                    .orElse(null)); // Set the contract ID
            return new StandardResponse<>(200, "Hotel found", searchResponseDTO);
        } catch (Exception e) {
            // Log the exception
            // logger.error("An error occurred while searching hotels", e);
            return new StandardResponse<>(500, "An error occurred while searching hotels", null);
        }
    }

    /**
     * Check if the hotel has an active contract within the specified dates.
     *
     * @param  hotel    the hotel to check contracts for
     * @param  checkIn  the check-in date for the contract
     * @param  checkOut the check-out date for the contract
     * @return          true if there is an active contract, false otherwise
     */
    private boolean hasActiveContract(Hotel hotel, Date checkIn, Date checkOut) {
        return hotel.getContracts().stream()
                .anyMatch(contract -> contract.getContractStatus().equalsIgnoreCase("Active") &&
                        contract.getStartDate().before(checkOut) &&
                        contract.getEndDate().after(checkIn));
    }

    @Override
    public StandardResponse<List<SearchResponseDTO>> adminSearchHotels(String hotel) {
        try {
            List<Hotel> hotelsList = hotelRepository.findByHotelNameContainingOrHotelCityContainingOrHotelCountryContaining(hotel, hotel, hotel);

            List<SearchResponseDTO> searchResponseDTOS = hotelsList.stream()
                    .map(hotelResult -> modelMapper.map(hotelResult, SearchResponseDTO.class))
                    .collect(Collectors.toList());

            return new StandardResponse<>(200, "Hotels found", searchResponseDTOS);
        } catch (Exception e) {
            // Log the exception
            // logger.error("An error occurred while searching hotels", e);
            return new StandardResponse<>(500, "An error occurred while searching hotels", null);
        }
    }

}
