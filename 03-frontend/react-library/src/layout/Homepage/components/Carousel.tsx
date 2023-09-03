import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookModel } from "../../../models/BookModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import {ReturnBooks} from "./ReturnBooks";


export const Carousel = () => {

  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(()=>{
    
    const fetchBooks = async () => {

      const baseUrl : string = "http://localhost:8080/api/books";

      const url : string = `${baseUrl}?page=0&size=9`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
        //Response は、実際の JSON レスポンス本体を直接持っているのではなく、 HTTP レスポンス全体を表現するものです。 Response オブジェクトから JSON の本体の内容を抽出するには、 json() メソッドを使用します。
      const responseJson = await response.json();

      const responseData = responseJson._embedded.books;

      const loadedBooks : BookModel[] = [];

      // KeyはresponseDataのプロパティ名を表す
      for (const Key in responseData){
        loadedBooks.push({
          // プロパティ名がidのデータを持ってくる
          id : responseData[Key].id,
          title : responseData[Key].title,
          author : responseData[Key].author,
          description : responseData[Key].description,
          copies : responseData[Key].copies,
          copiesAvailable : responseData[Key].copiesAvailable,
          category : responseData[Key].category,
          img : responseData[Key].img
        });
      }
      setBooks(loadedBooks);
      setIsLoading(false);

    };
    fetchBooks().catch((error:any)=>{
      setIsLoading(false);
      setHttpError(error.message);
    })
  }, []);

  if(isLoading){
    return(
     <SpinnerLoading />
    )
  }

  if(httpError){
    return(
      <div className='container m-5'>
        <p>{httpError}</p>
      </div>
    )
  }

  return (
    <div className="container mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title">
        <h3>Find your next "I stayed up too late reading" book.</h3>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide mt-5 
                d-none d-lg-block"
        data-bs-interval="false"
      >
        {/* Desktop */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
             {
               books.slice(0,3).map((book) => (
                <ReturnBooks book={book} key={book.id}/>
               ))
             }
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
            {
               books.slice(3,6).map((book) => (
                <ReturnBooks book={book} key={book.id}/>
               ))
             }
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
            {
               books.slice(6,9).map((book) => (
                <ReturnBooks book={book} key={book.id}/>
               ))
             }
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="d-lg-none mt-3">
        <div className="row d-flex justify-content-center align-items-center">
          <ReturnBooks book={books[7]} key={books[7].id}/>
        </div>
      </div>
      <div className="homepage-carousel-title mt-3">
        <Link className="btn btn-outline-secondary btn-lg" to="/search">
          View More
        </Link>
      </div>
    </div>
  );
};
