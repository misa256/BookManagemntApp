package com.luv2code.springbootlibrary.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "book" , schema = "public")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "author")
    private String author;
    @Column(name = "description")
    private String description;
    @Column(name = "copies")
    private int copies;
    @Column(name = "copies_available")
    private int copiesAvailable;
    @Column(name = "category")
    private String category;
    @Column(name = "img")
    private String img;
    //mappedBy:関連関係のオーナーを決定する。
    //cascade:Cascadeを指定すると複数のテーブルにまたがるDB操作を連鎖的に行うことが可能になります。
    //orphanRemoval:oneToManyに、orphanRemoval=true属性をつけないと、関連テーブルを削除してもメモリ上だけで、永続化がされない。
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    //Listは重複可、Setは重複不可→ここではSetを使用する
    private Set<Review> reviews = new HashSet<>();

}
