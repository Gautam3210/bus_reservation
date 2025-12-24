import React, { useState } from "react";
import API from "../services/api";
import "./BookingForm.css";

const BookingForm = ({ bus, onBookingSuccess, onClose }) => {



  const [name, setName] = useState("");
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/book", {
        busId: bus.id,
        passengerName: name,
        seats: Number(seats),
      });

      if (res.data.success) {
        onBookingSuccess(res.data.data);
        onClose();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-overlay">
      <div className="booking-form-container">
        <h2>Book Seats: {bus.source} ➝ {bus.destination}</h2>
        <form onSubmit={handleBooking}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            min="1"
            max={bus.seatsAvailable}
            value={seats}
            required
            onChange={(e) => setSeats(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
          <button type="button" className="close-btn" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
