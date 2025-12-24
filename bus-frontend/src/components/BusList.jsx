import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./BusList.css";

import SearchForm from "./SearchForm";

import BookingForm from "./BookingForm";
import Confirmation from "./Confirmation"; // next step



const BusList = () => {

    const [selectedBus, setSelectedBus] = useState(null);
const [bookingData, setBookingData] = useState(null);

  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const res = await API.get("/buses");
      setBuses(res.data.data);
      console.log(res)
    } catch (error) {
      console.log("Error fetching buses", error);
    }
  };

return (
  <div className="bus-container">
    <h1 className="title">🚌 Bus Reservation System</h1>

    {/* Search Form */}
    <SearchForm setBuses={setBuses} />

    {/* Bus List Grid */}
    <div className="bus-grid">
      {buses.length === 0 ? (
        <h2 style={{ color: "#777" }}>No Buses Found</h2>
      ) : (
        buses.map((bus) => (
          <div key={bus.id} className="bus-card">
            <h2>
              {bus.source} ➝ {bus.destination}
            </h2>

            <p>
              <strong>Seats Left:</strong> {bus.seatsAvailable}
            </p>

            <p>
              <strong>Fare:</strong> ₹{bus.fare}
            </p>

            {/* Book Now Button */}
            <button className="book-btn" onClick={() => setSelectedBus(bus)}>
              Book Now
            </button>
          </div>
        ))
      )}
    </div>

    {/* Booking Form Overlay */}
    {selectedBus && (
      <BookingForm
        bus={selectedBus}
        onClose={() => setSelectedBus(null)}
        onBookingSuccess={(data) => setBookingData(data)}
      />
    )}

    {/* Confirmation Overlay */}
    {bookingData && (
      <Confirmation data={bookingData} onClose={() => setBookingData(null)} />
    )}
  </div>
);


};

export default BusList;
