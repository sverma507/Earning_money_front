import React from "react";
import "./SubmittingButton.css";

const SubmittingButton = ({ buttonState }) => {
  return (
    <div className="submitting-button-container">
      <button
        className={`submitting-button ${
          buttonState === "loading" ? "loading" : buttonState === "validate" ? "validate" : ""
        }`}
        disabled={buttonState === "loading"}
      >
        {buttonState === "loading" ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            <span></span>
          </>
        ) : buttonState === "validate" ? (
          <i className="fas fa-check"></i>
        ) : (
          ""
        )}
      </button>
    </div>
  );
};

export default SubmittingButton;
