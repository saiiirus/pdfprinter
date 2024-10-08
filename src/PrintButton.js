import React from "react";
import "./PrintButton.css";
import logo from "./images.png";
import axios from "axios";

const PrintButton = () => {
  const handlePrint = () => {
    axios
      .post("http://localhost:3001/print-receipt")
      .then(() => {
        console.log("Print job started");
      })
      .catch((error) => {
        console.error("Error printing", error);
      });
  };

  return (
    <div>
      <div id="printable-section">
        <img
          src={logo}
          alt="Store Logo"
          style={{ width: "100%", maxWidth: "80mm" }}
        />
        <h1>Receipt</h1>
        <p>Store Name: ABC Store</p>
        <p>Date: {new Date().toLocaleDateString()}</p>
        <p>Time: {new Date().toLocaleTimeString()}</p>
        <hr />
        <p>Item 1: $10.00</p>
        <p>Item 2: $5.00</p>
        <hr />
        <p>Total: $15.00</p>
        <p>Thank you for shopping with us!</p>
      </div>
      <button onClick={handlePrint}>Print Receipt</button>
    </div>
  );
};

export default PrintButton;
