package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.BookingDiscountDTO;
import com.codegen.hotelmanagementsystembackend.dto.BookingRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.BookingRoomDTO;
import com.codegen.hotelmanagementsystembackend.dto.BookingSupplementDTO;
import com.codegen.hotelmanagementsystembackend.entities.*;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.*;
import com.codegen.hotelmanagementsystembackend.services.BookingService;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final HotelRepository hotelRepository;
    private final CustomerRepository customerRepository;
    private final RoomTypeRepository roomTypeRepository;
    private final DiscountRepository discountRepository;
    private final SupplementRepository supplementRepository;
    private final BookingRepository bookingRepository;
    private final ModelMapper modelMapper;

    /**
     * Create a booking based on the provided booking request data, including customer, hotel, payments, rooms, discounts, and supplements.
     *
     * @param  bookingRequestDTO   the booking request data transfer object
     * @return                     the created booking
     */
    @Override
    public Booking createBooking(BookingRequestDTO bookingRequestDTO) {
        try {
            Customer customer = customerRepository.findById(bookingRequestDTO.getCustomerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Customer not found with ID: " + bookingRequestDTO.getCustomerId()));

            Integer hotelId = bookingRequestDTO.getHotelId();

            Hotel hotel = hotelRepository.findById(hotelId)
                    .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with ID: " + hotelId));

            Booking booking = modelMapper.map(bookingRequestDTO, Booking.class);
            booking.setHotel(hotel);
            booking.setCustomer(customer);

            Payment newPayment = modelMapper.map(bookingRequestDTO.getPayment(), Payment.class);
            newPayment.setCustomer(customer);
            booking.getPayments().add(newPayment);

            bookingRequestDTO.getBookingRooms().stream()
                    .map(bookingRoomDTO -> {
                        BookingRoom newBookingRoom = modelMapper.map(bookingRoomDTO, BookingRoom.class);
                        newBookingRoom.setBooking(booking);
                        newBookingRoom.setRoomType(roomTypeRepository.findById(bookingRoomDTO.getRoomTypeId())
                                .orElseThrow(() -> new ResourceNotFoundException("Room not found with ID: " + bookingRoomDTO.getRoomTypeId())));
                        return newBookingRoom;
                    })
                    .forEach(bookingRoom -> booking.getRooms().add(bookingRoom));

            bookingRequestDTO.getBookingDiscounts().stream()
                    .map(bookingDiscountDTO -> {
                        BookingDiscount newbookingDiscount = modelMapper.map(bookingDiscountDTO, BookingDiscount.class);
                        newbookingDiscount.setBooking(booking);
                        newbookingDiscount.setDiscount(discountRepository.findById(bookingDiscountDTO.getDiscountId())
                                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with ID: " + bookingDiscountDTO.getDiscountId())));
                        return newbookingDiscount;
                    })
                    .forEach(bookingDiscount -> booking.getDiscounts().add(bookingDiscount));

            bookingRequestDTO.getBookingSupplements().stream()
                    .map(bookingSupplementDTO -> {
                        BookingSupplements newBookingSupplement = modelMapper.map(bookingSupplementDTO, BookingSupplements.class);
                        newBookingSupplement.setBooking(booking);
                        newBookingSupplement.setSupplement(supplementRepository.findById(bookingSupplementDTO.getSupplementId())
                                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with ID: " + bookingSupplementDTO.getSupplementId())));
                        return newBookingSupplement;
                    })
                    .forEach(bookingSupplement -> booking.getSupplements().add(bookingSupplement));

            return bookingRepository.save(booking);
        } catch (Exception e) {
            throw new ServiceException("Failed to create Bookings", e);
        }
    }
}
