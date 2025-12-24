import React from "react";
import "./Confirmation.css";

const Confirmation = ({ data, onClose }) => {
  return (
    <div className="confirmation-overlay">
      <div className="confirmation-box">
        <h2>✅ Booking Confirmed!</h2>

        <p><strong>Name:</strong> {data.passengerName}</p>
        <p><strong>Bus:</strong> {data.source} ➝ {data.destination}</p>

        <p><strong>Bus ID:</strong> {data.busId}</p>
        <p><strong>Seats:</strong> {data.seatsBooked}</p>
        <p><strong>Total Fare:</strong> ₹{data.totalFare}</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Confirmation;
