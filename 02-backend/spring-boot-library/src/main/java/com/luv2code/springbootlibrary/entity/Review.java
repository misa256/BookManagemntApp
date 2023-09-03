package com.luv2code.springbootlibrary.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Data
@Table(name = "review", schema = "public")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "user_email")
    private String userEmail;
    @Column(name = "date")
    @CreationTimestamp
    private Date date;
    @Column(name = "rating")
    private double rating;
    @Column(name = "review_description")
    private String reviewDescription;
    @ManyToOne(fetch = FetchType.LAZY)
    //specify foreign key
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;
}
