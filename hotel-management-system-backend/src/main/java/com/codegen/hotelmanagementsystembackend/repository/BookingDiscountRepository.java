package com.codegen.hotelmanagementsystembackend.repository;

import com.codegen.hotelmanagementsystembackend.entities.BookingDiscount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingDiscountRepository extends JpaRepository<BookingDiscount, Integer> {
}
