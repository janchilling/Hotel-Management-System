package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.*;
import com.codegen.hotelmanagementsystembackend.entities.*;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.*;
import com.codegen.hotelmanagementsystembackend.services.BookingService;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.modelmapper.ModelMapper;
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
    public BookingResponseDTO createBooking(BookingRequestDTO bookingRequestDTO) {
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
                BookingSupplements newBookingSupplement = modelMapper.map(bookingSupplementDTO, BookingSupplements.class);
                newBookingSupplement.setBooking(savedBooking);
                newBookingSupplement.setSupplement(utilityMethods.getSupplement(bookingSupplementDTO.getSupplementId()));
                bookingSupplementsRepository.save(newBookingSupplement);
            });

            // Return the response DTO
            return getBookingById(savedBooking.getBookingId());
        } catch (Exception e) {
            throw new ServiceException("Failed to create Bookings" + e.getMessage());
        }
    }

    @Override
    public BookingResponseDTO getBookingById(Integer bookingId) {
        try{

            Booking booking = utilityMethods.getBooking(bookingId);
            if (booking == null) {
                throw new ResourceNotFoundException("Booking not found with ID: " + bookingId);
            }

            BookingResponseDTO bookingResponseDTO = modelMapper.map(booking, BookingResponseDTO.class);
            bookingResponseDTO.setCustomerId(booking.getCustomer().getUser_id());
            bookingResponseDTO.setCustomerName(booking.getCustomer().getCustomer_fname() + " " + booking.getCustomer().getCustomer_lname());
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

        }catch (Exception e){
            throw new ServiceException("Booking search failed");
        }
    }


    // Should I return as a BookingResponseDTO?????????
    @Override
    public Booking updateBookingById(Integer bookingId, BookingRequestDTO bookingRequestDTO) {
        try{

            Booking booking = utilityMethods.getBooking(bookingId);
            if (booking == null) {
                throw new ResourceNotFoundException("Booking not found with ID: " + bookingId);
            }

            modelMapper.map(bookingRequestDTO, Booking.class);

//            bookingRequestDTO.getBookingRooms().forEach(bookingSupplementDTO -> {
//                BookingRoom bookingRoom = utilityMethods.getBookingRoom(bookingSupplementDTO.getBookingRoomId());
//                if (bookingRoom == null) {
//                    throw new ResourceNotFoundException("Booking Room not found with ID: " + bookingSupplementDTO.getBookingRoomId());
//                }
//                bookingRoom = modelMapper.map(bookingSupplementDTO, BookingRoom.class);
//                bookingRoom.setBooking(booking);
//                bookingRoom.setRoomType(utilityMethods.getRoomType(bookingSupplementDTO.getRoomTypeId()));
//                booking.getRooms().add(bookingRoom);
//            });
//
//            bookingRequestDTO.getBookingDiscounts().forEach(bookingDiscountDTO -> {
//                BookingDiscount bookingDiscount = utilityMethods.getBookingDiscount(bookingDiscountDTO.getBookingDiscountId());
//                if (bookingDiscount == null) {
//                    throw new ResourceNotFoundException("Booking Room not found with ID: " + bookingDiscountDTO.getBookingDiscountId());
//                }
//                bookingDiscount = modelMapper.map(bookingDiscountDTO, BookingDiscount.class);
//                bookingDiscount.setBooking(booking);
//                bookingDiscount.setDiscount(utilityMethods.getDiscount(bookingDiscountDTO.getDiscountId()));
//                booking.getDiscounts().add(bookingDiscount);
//            });
//
//            bookingRequestDTO.getBookingSupplements().forEach(bookingSupplementDTO -> {
//                BookingSupplements bookingSupplements = utilityMethods.getBookingSupplement(bookingSupplementDTO.getBookingSupplementId());
//                if (bookingSupplements == null) {
//                    throw new ResourceNotFoundException("Booking Room not found with ID: " + bookingSupplementDTO.getBookingSupplementId());
//                }
//                bookingSupplements = modelMapper.map(bookingSupplementDTO, BookingSupplements.class);
//                bookingSupplements.setBooking(booking);
//                bookingSupplements.setSupplement(utilityMethods.getSupplement(bookingSupplementDTO.getSupplementId()));
//                booking.getSupplements().add(bookingSupplements);
//            });

            return bookingRepository.save(booking);

        }catch (Exception e){
            throw new ServiceException("Booking update failed" + e.getMessage());
        }
    }

}