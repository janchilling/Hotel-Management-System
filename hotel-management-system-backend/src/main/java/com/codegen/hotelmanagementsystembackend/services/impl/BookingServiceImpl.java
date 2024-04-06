package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.*;
import com.codegen.hotelmanagementsystembackend.entities.*;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.*;
import com.codegen.hotelmanagementsystembackend.services.BookingService;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final BookingDiscountRepository bookingDiscountRepository;
    private final BookingSupplementsRepository bookingSupplementsRepository;
    private final BookingRoomRepository bookingRoomRepository;
    private final ModelMapper modelMapper;
    private final UtilityMethods utilityMethods;


    /**
     * Create a booking based on the provided booking request data, including customer, hotel, payments, rooms, discounts, and supplements.
     *
     * @param  bookingRequestDTO   the booking request data transfer object
     * @return                     the created booking
     */
    @Override
    public StandardResponse<BookingResponseDTO> createBooking(BookingRequestDTO bookingRequestDTO) {
        try {
            // Retrieve customer and hotel
            Customer customer = utilityMethods.getCustomer(bookingRequestDTO.getCustomerCustomerId());
            Hotel hotel = utilityMethods.getHotel(bookingRequestDTO.getHotelHotelId());

            // Map BookingRequestDTO to Booking entity
            Booking booking = modelMapper.map(bookingRequestDTO, Booking.class);

            // Set customer and hotel for the booking
            booking.setHotel(hotel);
            booking.setCustomer(customer);

            // Map and set payment
            Payment newPayment = modelMapper.map(bookingRequestDTO.getPayment(), Payment.class);
            newPayment.setCustomer(customer);
            newPayment.setBooking(booking);
            booking.getPayments().add(newPayment);

            // Save booking
            Booking savedBooking = bookingRepository.save(booking);

            // Map and save booking rooms
            bookingRequestDTO.getBookingRooms().forEach(bookingRoomDTO -> {
                BookingRoom newBookingRoom = modelMapper.map(bookingRoomDTO, BookingRoom.class);
                newBookingRoom.setBooking(savedBooking);
                newBookingRoom.setRoomType(utilityMethods.getRoomType(bookingRoomDTO.getRoomTypeId()));
                bookingRoomRepository.save(newBookingRoom);
            });

            // Map and save booking discounts
            bookingRequestDTO.getBookingDiscounts().forEach(bookingDiscountDTO -> {
                BookingDiscount newBookingDiscount = modelMapper.map(bookingDiscountDTO, BookingDiscount.class);
                newBookingDiscount.setBooking(savedBooking);
                newBookingDiscount.setDiscount(utilityMethods.getDiscount(bookingDiscountDTO.getDiscountId()));
                bookingDiscountRepository.save(newBookingDiscount);
            });

            // Map and save booking supplements
            bookingRequestDTO.getBookingSupplements().forEach(bookingSupplementDTO -> {
                System.out.println(bookingSupplementDTO);
                BookingSupplements newBookingSupplement = modelMapper.map(bookingSupplementDTO, BookingSupplements.class);
                newBookingSupplement.setBooking(savedBooking);
                newBookingSupplement.setSupplement(utilityMethods.getSupplement(bookingSupplementDTO.getSupplementId()));
                bookingSupplementsRepository.save(newBookingSupplement);
            });

            // Map the saved booking to response DTO
            BookingResponseDTO bookingResponseDTO = mapToBookingResponseDTO(savedBooking);

            return new StandardResponse<>(HttpStatus.OK.value(), "Booking created successfully", bookingResponseDTO);
        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to create booking: " + e.getMessage(), null);
        }
    }

    @Override
    public StandardResponse<BookingResponseDTO> getBookingById(Integer bookingId) {
        try {
            Booking booking = utilityMethods.getBooking(bookingId);
            if (booking == null) {
                 return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), "Booking not found", null);
            }

            BookingResponseDTO bookingResponseDTO = mapToBookingResponseDTO(booking);

            return new StandardResponse<>(HttpStatus.OK.value(), "Booking found", bookingResponseDTO);
        } catch (ResourceNotFoundException e) {
            return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), e.getMessage(), null);
        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to retrieve booking: " + e.getMessage(), null);
        }
    }

    @Override
    public StandardResponse<List<BookingResponseDTO>> getBookingByCustomer(Long userId) {
        try {
            List<Booking> bookingsList = bookingRepository.findAllByCustomerUserId(userId);
            if (bookingsList.isEmpty()) {
                return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), "No bookings found for user ID: " + userId, null);
            }

            List<BookingResponseDTO> bookingResponseDTOList = bookingsList.stream()
                    .map(booking -> getBookingById(booking.getBookingId()).getData()).toList();

            return new StandardResponse<>(HttpStatus.OK.value(), "Bookings found for user ID: " + userId, bookingResponseDTOList);
        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to get bookings", null);
        }
    }

    // Helper method to map Booking entity to BookingResponseDTO
    private BookingResponseDTO mapToBookingResponseDTO(Booking booking) {
        BookingResponseDTO bookingResponseDTO = modelMapper.map(booking, BookingResponseDTO.class);
        bookingResponseDTO.setCustomerId(booking.getCustomer().getUserId());
        bookingResponseDTO.setCustomerName(booking.getCustomer().getCustomerFname() + " " + booking.getCustomer().getCustomerLname());
        bookingResponseDTO.setDiscounts(booking.getBookingDiscounts().stream().map(
                bookingDiscount -> modelMapper.map(bookingDiscount, BookingDiscountResponseDTO.class)
        ).toList());
        bookingResponseDTO.setSupplements(booking.getBookingSupplements().stream().map(
                bookingSupplement -> modelMapper.map(bookingSupplement, BookingSupplementResponseDTO.class)
        ).toList());
        bookingResponseDTO.setRooms(booking.getBookingRooms().stream().map(
                room -> modelMapper.map(room, BookingRoomResponseDTO.class)
        ).toList());
        return bookingResponseDTO;
    }

}