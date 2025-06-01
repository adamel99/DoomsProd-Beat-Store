import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage/LandingPage";
import ProductList from "./components/ProductList/ProductList";
import ProductCard from "./components/ProductCard/ProductCard";
import LoginFormModal from "./components/LoginFormModal";
import SignUpFormModal from "./components/SignUpFormModal/index";
import { restoreUser } from "./store/session";
import AboutMe from "./components/AboutME/AboutMe";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/products">
            <ProductList />
          </Route>
          <Route exact path="/products/:productId">
            <ProductCard />
          </Route>
          <Route path="/login">
            <LoginFormModal />
          </Route>
          <Route path="/signup">
            <SignUpFormModal />
          </Route>
          <Route exact path="/about">
            <AboutMe />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
