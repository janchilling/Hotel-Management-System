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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

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
            Customer customer = utilityMethods.getCustomer(bookingRequestDTO.getCustomerId());
            Integer hotelId = bookingRequestDTO.getHotelId();

            Hotel hotel = utilityMethods.getHotel(hotelId);

            Booking booking = modelMapper.map(bookingRequestDTO, Booking.class);
            booking.setHotel(hotel);
            booking.setCustomer(customer);

            Payment newPayment = modelMapper.map(bookingRequestDTO.getPayment(), Payment.class);
            newPayment.setCustomer(customer);
            booking.getPayments().add(newPayment);

            Booking savedBooking = bookingRepository.save(booking);

            bookingRequestDTO.getBookingRooms().stream()
                    .map(bookingRoomDTO -> {
                        BookingRoom newBookingRoom = modelMapper.map(bookingRoomDTO, BookingRoom.class);
                        newBookingRoom.setBooking(savedBooking);
                        newBookingRoom.setRoomType(utilityMethods.getRoomType(bookingRoomDTO.getRoomTypeId()));
                        return newBookingRoom;
                    })
                    .forEach(bookingRoomRepository::save);

            bookingRequestDTO.getBookingDiscounts().stream()
                    .map(bookingDiscountDTO -> {
                        BookingDiscount newbookingDiscount = modelMapper.map(bookingDiscountDTO, BookingDiscount.class);
                        newbookingDiscount.setBooking(savedBooking);
                        newbookingDiscount.setDiscount(utilityMethods.getDiscount(bookingDiscountDTO.getDiscountId()));
                        return newbookingDiscount;
                    })
                    .forEach(bookingDiscountRepository::save);

            bookingRequestDTO.getBookingSupplements().stream()
                    .map(bookingSupplementDTO -> {
                        BookingSupplements newBookingSupplement = modelMapper.map(bookingSupplementDTO, BookingSupplements.class);
                        newBookingSupplement.setBooking(savedBooking);
                        newBookingSupplement.setSupplement(utilityMethods.getSupplement(bookingSupplementDTO.getSupplementId()));
                        return newBookingSupplement;
                    })
                    .forEach(bookingSupplementsRepository::save);

            return getBookingById(savedBooking.getBookingId());
        } catch (Exception e) {
            throw new ServiceException("Failed to create Bookings", e);
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
            bookingResponseDTO.setDiscounts(booking.getDiscounts().stream().map(
                    bookingDiscount -> modelMapper.map(bookingDiscount, BookingDiscountResponseDTO.class)
            ).toList());
            bookingResponseDTO.setSupplements(booking.getSupplements().stream().map(
                    bookingSupplement -> modelMapper.map(bookingSupplement, BookingSupplementResponseDTO.class)
            ).toList());
            bookingResponseDTO.setRooms(booking.getRooms().stream().map(
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

            bookingRequestDTO.getBookingRooms().forEach(bookingSupplementDTO -> {
                BookingRoom bookingRoom = utilityMethods.getBookingRoom(bookingSupplementDTO.getBookingRoomId());
                if (bookingRoom == null) {
                    throw new ResourceNotFoundException("Booking Room not found with ID: " + bookingSupplementDTO.getBookingRoomId());
                }
                bookingRoom = modelMapper.map(bookingSupplementDTO, BookingRoom.class);
                bookingRoom.setBooking(booking);
                bookingRoom.setRoomType(utilityMethods.getRoomType(bookingSupplementDTO.getRoomTypeId()));
                booking.getRooms().add(bookingRoom);
            });

            bookingRequestDTO.getBookingDiscounts().forEach(bookingDiscountDTO -> {
                BookingDiscount bookingDiscount = utilityMethods.getBookingDiscount(bookingDiscountDTO.getBookingDiscountId());
                if (bookingDiscount == null) {
                    throw new ResourceNotFoundException("Booking Room not found with ID: " + bookingDiscountDTO.getBookingDiscountId());
                }
                bookingDiscount = modelMapper.map(bookingDiscountDTO, BookingDiscount.class);
                bookingDiscount.setBooking(booking);
                bookingDiscount.setDiscount(utilityMethods.getDiscount(bookingDiscountDTO.getDiscountId()));
                booking.getDiscounts().add(bookingDiscount);
            });

            bookingRequestDTO.getBookingSupplements().forEach(bookingSupplementDTO -> {
                BookingSupplements bookingSupplements = utilityMethods.getBookingSupplement(bookingSupplementDTO.getBookingSupplementId());
                if (bookingSupplements == null) {
                    throw new ResourceNotFoundException("Booking Room not found with ID: " + bookingSupplementDTO.getBookingSupplementId());
                }
                bookingSupplements = modelMapper.map(bookingSupplementDTO, BookingSupplements.class);
                bookingSupplements.setBooking(booking);
                bookingSupplements.setSupplement(utilityMethods.getSupplement(bookingSupplementDTO.getSupplementId()));
                booking.getSupplements().add(bookingSupplements);
            });

            return bookingRepository.save(booking);

        }catch (Exception e){
            throw new ServiceException("Booking update failed" + e.getMessage());
        }
    }

}