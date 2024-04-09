package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.HotelResponseDTO;
import com.codegen.hotelmanagementsystembackend.dto.SearchResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Hotel;
import com.codegen.hotelmanagementsystembackend.entities.Contract;
import com.codegen.hotelmanagementsystembackend.entities.RoomType;
import com.codegen.hotelmanagementsystembackend.entities.SeasonRoomType;
import com.codegen.hotelmanagementsystembackend.repository.BookingRoomRepository;
import com.codegen.hotelmanagementsystembackend.repository.HotelRepository;
import com.codegen.hotelmanagementsystembackend.services.ProductService;
import com.codegen.hotelmanagementsystembackend.services.SeasonService;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ModelMapper modelMapper;
    private final HotelRepository hotelRepository;
    private final UtilityMethods utilityMethods;
    private final SeasonService seasonService;
    private final BookingRoomRepository bookingRoomRepository;

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

            List<Contract> activeHotelContracts = hotels.stream().map(hotel -> getActiveContract(hotel, checkIn, checkOut)).toList();

            if (activeHotelContracts.isEmpty()) {
                return new StandardResponse<>(404, "No hotels found with active contracts within the specified dates", null);
            }

            List<Contract> contractsOfHotelsWithAvailableRooms = activeHotelContracts.stream()
                    .filter(contract -> hasAvailableRooms(contract, checkIn, checkOut, noOfRooms))
                    .toList();

            List<SearchResponseDTO> searchResponseDTOS = contractsOfHotelsWithAvailableRooms.stream()
                    .map(contract -> {
                        Hotel hotel = utilityMethods.getHotel(contract.getHotel().getHotelId());
                        SearchResponseDTO searchResponseDTO = modelMapper.map(hotel, SearchResponseDTO.class);
                        searchResponseDTO.setContractId(contract.getContractId()); // Set the contract ID
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


    private Contract getActiveContract(Hotel hotel, Date checkIn, Date checkOut) {
        Optional<Contract> activeContractOptional = hotel.getContracts().stream()
                .filter(contract -> contract.getContractStatus().equalsIgnoreCase("Active") &&
                        contract.getStartDate().before(checkIn) &&
                        contract.getEndDate().after(checkOut))
                .findFirst();

        return activeContractOptional.orElse(null);
    }

    public boolean hasAvailableRooms(Contract contract, Date checkIn, Date checkOut, Integer noOfRooms) {

        Integer totalNumberOfRooms = 0;
        Integer bookedRooms = 0;
        // Get the season ID for the provided check-in and check-out dates
        Integer seasonId = seasonService.getSeasonByCheckInOutDates(contract, checkIn, checkOut);

        for (RoomType roomType : contract.getRoomTypes()) {
            bookedRooms += bookingRoomRepository.countBookedRooms(roomType.getRoomTypeId(), checkIn, checkOut);
            for (SeasonRoomType seasonRoomType : roomType.getSeasonRoomtype()) {
                if (seasonRoomType.getSeason().getSeasonId().equals(seasonId)) {
                    totalNumberOfRooms += seasonRoomType.getNoOfRooms();
                    break;
                }
            }
        }

        // Check if there are enough available rooms
        return totalNumberOfRooms - bookedRooms >= noOfRooms;
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
