import { useState } from "react";
import Kalender from "./Kalender"; 
import BookingForm from "../BookingForm";

function Booking() {

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [showForm, setShowForm] = useState(false);


  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
 
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <div>
        <h2>Boka tid!</h2>
        <p className="pageText">Vi har öppet alla dagar förutom måndagar!</p>
      </div>

      {selectedDate && showForm && (
        <div>
          <BookingForm selectedDate={selectedDate} onClose={handleCloseForm} />
        </div>
      )}
      <Kalender onDateSelection={handleDateSelection} />
    </div>
  );
}

export default Booking;

