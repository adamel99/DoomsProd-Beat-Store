import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
// import Footer from "./components/Footer/Footer";
import LandingPage from "./components/LandingPage/LandingPage";
import ProductList from "./components/ProductList/ProductList";
import ProductCard from "./components/ProductCard/ProductCard";
// import ProductDetail from "./components/ProductDetail/ProductDetail";
// import CartPage from "./components/CartPage/CartPage";
import NewProduct from "./components/NewProduct/NewProduct";

import LoginFormModal from "./components/LoginFormModal";
import SignUpFormModal from "./components/SignUpFormModal";

import AboutMe from "./components/AboutME/AboutMe";
// import LicenseSelector from "./components/LicenseSelector/LicenseSelector";

// import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import { restoreUser } from "./store/session";

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
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/products" component={ProductList} />
          <Route path="/products/new" component={NewProduct} />
          <Route exact path="/products/:productId" component={ProductCard} />
          {/* <Route exact path="/products/:productId/license" component={LicenseSelector} /> */}

          {/* <ProtectedRoute exact path="/cart" component={CartPage} /> */}

          <Route path="/login" component={LoginFormModal} />
          <Route path="/signup" component={SignUpFormModal} />
          <Route exact path="/about">
            <AboutMe />
          </Route>

          {/* Optionally add a fallback 404 route */}
          {/* <Route path="*" component={NotFoundPage} /> */}
        </Switch>
      )}
      {/* <Footer /> */}
    </>
  );
}

export default App;
