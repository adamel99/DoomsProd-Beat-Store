import { NavLink } from "react-router-dom";
import React from "react";
import "./LandingPage.css";
import SignUpFormModal from "../SignUpFormModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const amazingUser = useSelector((state) => state.session.user);

  return (

    <div className="main-content">
      <div className="intro">
        <section className="main-content-title">
          <h1>Doomsday Productions</h1>
          <p>

          </p>
        </section>
        <section className="main-content-image">
        </section>
      </div>
      <section className="main-content-meetup-works">
        <h2>Let's push the boundary of music</h2>
        <p>
          Create an account and start saving today!
        </p>
      </section>
      <section className="main-content-cards">
        <div className="main-content-cards-container">
          <div>
            <NavLink to="/products" className='navlink'>Beats, Kits, Samples Available Now!</NavLink>
            <p>
              Checkout my YouTube to get caught up with the latest drops!
            </p>
          </div>
        </div>
      </section>
      {!amazingUser && (
        <section className="join-meetup">
          <OpenModalMenuItem
            className="join-meetup-btn"
            itemText="Join the Magic"
            modalComponent={<SignUpFormModal />}
          />
        </section>
      )}
      <div>
        <NavLink to="/about" className='navlink'>About the Creator</NavLink>
        <p>
          Learn more about me and why I started Doomsday Productions.
        </p>
      </div>

    </div>
  );
};

export default LandingPage;
