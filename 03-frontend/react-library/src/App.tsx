import React from "react";

import "./App.css";
import { Carousel } from "./layout/Homepage/components/Carousel";
import { ExploreTopBooks } from "./layout/Homepage/components/ExploreTopBooks";
import { Footer } from "./layout/Footer";
import { Heros } from "./layout/Homepage/components/Heros";
import { LibraryServices } from "./layout/Homepage/components/LibraryServices";
import { Navbar } from "./layout/Navbar";
import { HomePage } from "./layout/Homepage/HomePage";
import { SearchBooksPage } from "./layout/SearchBooks/SearchBooksPage";
import { Redirect, Route, Switch } from "react-router-dom";
import { BookCheckoutPage } from "./layout/BookCheckoutPage/BookCheckoutPage";

export const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        {/* Switchで囲んでないと、同時に各ルートが実行されてしまうから、Routeは必ずSwitchで囲む。 */}
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/search">
            <SearchBooksPage />
          </Route>
          <Route path="/checkout/:bookId">
            <BookCheckoutPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};
