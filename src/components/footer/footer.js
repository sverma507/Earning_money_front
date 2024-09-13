import React from "react";
import "./footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {

const navigate = useNavigate()

  return (
    <footer className="footer">
      <div className="footer-heading">
        <h1>Earning Money</h1>
        <div>
          <p onClick={() => {navigate('/')}}>Home</p> | <p onClick={() => {navigate('/users/user/all-products')}} >Products</p> |
          <p>News</p> | <p onClick={() => {navigate('/terms-conditions')}}>Terms And Conditions</p>
        </div>
      </div>
      <div className="footer-body">
        <p className="follow">Follow Us!</p>
        <div className="social-icons">
            <i className="fab fa-youtube"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin"></i>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
