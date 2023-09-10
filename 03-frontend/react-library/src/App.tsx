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
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { BookCheckoutPage } from "./layout/BookCheckoutPage/BookCheckoutPage";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { oktaConfig } from "./lib/oktaConfig";
import { LoginCallback, Security } from "@okta/okta-react";
import { LoginWidget } from "./Auth/LoginWidget";
import BaseLoginRouter from "@okta/okta-signin-widget/types/src/v2/BaseLoginRouter";

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
const history = useHistory();

const customAuthHandler = ()=>{
  history.push('/login')
};
// この関数は、Okta認証後に元のURI（originalUri）にユーザーをリダイレクトするために使用されます。
const restoreOriginalUri = async (_oktaAuth:any, originalUri:any) => {
  history.replace(toRelativeUrl(originalUri || '', window.location.origin));
};

  return (
    <div className="d-flex flex-column min-vh-100">
      <Security 
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
      >
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
          <Route path="/login" render={() => <LoginWidget config={oktaConfig} />} />
          <Route path="/login/callback" component={LoginCallback} />
        </Switch>
      </div>
      <Footer />
      </Security>
    </div>
  );
};
