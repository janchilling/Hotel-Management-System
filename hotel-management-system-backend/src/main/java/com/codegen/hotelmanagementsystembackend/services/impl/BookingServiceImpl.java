package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.*;
import com.codegen.hotelmanagementsystembackend.entities.*;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.BookingDiscountRepository;
import com.codegen.hotelmanagementsystembackend.repository.BookingRepository;
import com.codegen.hotelmanagementsystembackend.repository.BookingRoomRepository;
import com.codegen.hotelmanagementsystembackend.repository.BookingSupplementsRepository;
import com.codegen.hotelmanagementsystembackend.services.BookingService;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    private final Logger logger;

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
            List<BookingRoom> bookingRooms = new ArrayList<>();
            bookingRequestDTO.getBookingRooms().forEach(bookingRoomDTO -> {
                BookingRoom newBookingRoom = modelMapper.map(bookingRoomDTO, BookingRoom.class);
                newBookingRoom.setBooking(savedBooking);
                newBookingRoom.setRoomType(utilityMethods.getRoomType(bookingRoomDTO.getRoomTypeId()));
                bookingRooms.add(newBookingRoom);
            });
            bookingRoomRepository.saveAll(bookingRooms);

            // Map and save booking discounts
            if (bookingRequestDTO.getBookingDiscounts() != null) {
                bookingRequestDTO.getBookingDiscounts().forEach(bookingDiscountDTO -> {
                    BookingDiscount newBookingDiscount = modelMapper.map(bookingDiscountDTO, BookingDiscount.class);
                    newBookingDiscount.setBooking(savedBooking);
                    if(bookingDiscountDTO.getDiscountId() != null) {
                        newBookingDiscount.setDiscount(utilityMethods.getDiscount(bookingDiscountDTO.getDiscountId()));
                    }
                    bookingDiscountRepository.save(newBookingDiscount);
                });
            }

            // Map and save booking supplements
            List<BookingSupplements> bookingSupplements = new ArrayList<>();
            bookingRequestDTO.getBookingSupplements().forEach(bookingSupplementDTO -> {
                BookingSupplements newBookingSupplement = modelMapper.map(bookingSupplementDTO, BookingSupplements.class);
                newBookingSupplement.setBooking(savedBooking);
                newBookingSupplement.setSupplement(utilityMethods.getSupplement(bookingSupplementDTO.getSupplementId()));
                bookingSupplements.add(newBookingSupplement);
            });
            bookingSupplementsRepository.saveAll(bookingSupplements);

            // Map the saved booking to response DTO
            BookingResponseDTO bookingResponseDTO = mapToBookingResponseDTO(savedBooking);

            return new StandardResponse<>(HttpStatus.CREATED.value(), "Booking created successfully", bookingResponseDTO);
        } catch (Exception e) {
            logger.error("Failed to create booking: ", e);
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to create booking: " + e.getMessage(), null);
        }
    }

    /**
     * Get a booking by ID.
     *
     * @param  bookingId   the ID of the booking to retrieve
     * @return             a standard response containing the booking information
     */
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
            logger.error("Failed to get a booking by ID: ", e.getMessage());
            return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), e.getMessage(), null);
        } catch (Exception e) {
            logger.error("Failed to get a booking by ID: ", e.getMessage());
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to retrieve booking: " + e.getMessage(), null);
        }
    }

    /**
     * Get a booking by Customer ID.
     *
     * @param  userId    description of parameter
     * @return          description of return value
     */
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
    public BookingResponseDTO mapToBookingResponseDTO(Booking booking) {
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
                room -> {
                    BookingRoomResponseDTO bookingRoomResponseDTO = modelMapper.map(room, BookingRoomResponseDTO.class);
                    // Assuming there's only one image per room type
                    room.getRoomType().getRoomTypeImages().stream().findFirst().ifPresent(roomTypeImage -> bookingRoomResponseDTO.setImageURL(roomTypeImage.getImageURL()));
                    return bookingRoomResponseDTO;
                }
        ).toList());
        bookingResponseDTO.setPayment(booking.getPayments().stream().map(
                payment -> modelMapper.map(payment, PaymentResponseDTO.class)
        ).toList());
        return bookingResponseDTO;
    }

}