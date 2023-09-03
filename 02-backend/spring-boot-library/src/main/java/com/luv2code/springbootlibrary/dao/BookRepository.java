package com.luv2code.springbootlibrary.dao;

import com.luv2code.springbootlibrary.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RequestParam;

public interface BookRepository extends JpaRepository<Book, Long> {
    //IgnoreCaseをつけることで、大文字・小文字の区別を無くしている
    //@RequestParamアノテーションを使用することで、リクエストパラメータをメソッドの引数に直接バインディング（マッピング）することができます。
    Page<Book> findByTitleContainingIgnoreCase(@RequestParam("title") String title, Pageable pageable);

    Page<Book> findByCategoryIgnoreCase(@RequestParam("category") String category, Pageable pageable);

    Page<Book> findByCategoryAndTitleContainingIgnoreCase(@RequestParam("category") String category,
                                                          @RequestParam("title") String title,
                                                          Pageable pageable);

}
