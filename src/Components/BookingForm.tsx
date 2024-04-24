import React, { useEffect, useState } from "react";

interface BookingFormProps {
  selectedDate: Date;
  onClose: () => void;
}

interface Booking {
  time: string;
  temperature: string;
}

function BookingForm({ selectedDate, onClose }: BookingFormProps) {
  
  const [step, setStep] = useState(0);
 
  const [name, setName] = useState("");
  
  const [time, setTime] = useState("");
  
  const [temperature, setTemperature] = useState("");
 
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);



  useEffect(() => {
    const storedBookings = localStorage.getItem("bookings");
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  const saveBookingToLocalStorage = (bookingData: Booking) => {
    const updatedBookings = [...bookings, bookingData];
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleTemperatureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTemperature(event.target.value);
  };

  const handleNextStep = () => {
    if (name.trim() === "") {
      alert("Du måste ange ett namn");
      return;
    }
 
    setStep((prevStep) => prevStep + 1);
  };


  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

 
  const handleConfirmationClosing = () => {
    setShowConfirmation(false);
    onClose();
  };

  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const existingBookings = bookings.filter(
      (booking) => booking.time === time && booking.temperature === temperature
    );

    if (existingBookings.length > 0) {
      alert(
        "Den valda tiden och temperaturen är upptagen."
      );
      return;
    }

    const bookingData = {
      date: selectedDate,
      time: time,
      temperature: temperature,
      name: name,
    };

    saveBookingToLocalStorage(bookingData);

    setShowConfirmation(true);
  };

  return (
    <div>
      <form className="bookingForm" onSubmit={handleSubmit}>
        {step === 0 && (
          <>
            <p className="bookingText">
              Valt datum: {selectedDate.toDateString()}
            </p>
            <input
              type="text"
              placeholder="Skriv ditt namn"
              name="name"
              value={name}
              onChange={handleNameChange}
              required
            />
            <button type="button" onClick={handleNextStep}>
              Nästa
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <div>
              <p className="bookingText">Vilken tid vill du komma?</p>
              <button type="button" onClick={handlePreviousStep}>
                Tillbaka
              </button>
              <input
                type="radio"
                id="morning"
                name="time"
                value="Förmiddag"
                checked={time === "Förmiddag"}
                onChange={handleTimeChange}
                required
              ></input>
              <label className="bookingText">Förmiddag</label>

              <input
                type="radio"
                id="afternoon"
                name="time"
                value="Eftermiddag"
                checked={time === "Eftermiddag"}
                onChange={handleTimeChange}
              ></input>
              <label className="bookingText">Eftermiddag</label>

              <input
                type="radio"
                id="evening"
                name="time"
                value="Kväll"
                checked={time === "Kväll"}
                onChange={handleTimeChange}
                required
              ></input>
              <label className="bookingText">Kväll</label>

              <button type="button" onClick={handleNextStep}>
                Nästa
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <p className="bookingText">Vilken temperatur vill du ha?</p>
              <button type="button" onClick={handlePreviousStep}>
                Tillbaka
              </button>
              <input
                type="radio"
                id="hot"
                name="temperature"
                value="Varmt"
                checked={temperature === "Varmt"}
                onChange={handleTemperatureChange}
                required
              ></input>
              <label className="bookingText">Varmt</label>
              <input
                type="radio"
                id="cold"
                name="temperature"
                value="Kallt"
                checked={temperature === "Kallt"}
                onChange={handleTemperatureChange}
                required
              ></input>
              <label className="bookingText">Kallt</label>
              <button type="submit">Boka</button>
            </div>
          </>
        )}
      </form>

      {/*Visa bekräftelsefönstret. Här ser man alla sina val*/}
      {showConfirmation && (
        <div className="confirmationPopup">
          <div className="popupContent">
            <h3>
              <span>Din bokning är bekräftad:</span>
            </h3>
            <p>
              <span>Namn:</span> {name}
            </p>
            <p>
              <span>Datum:</span> {selectedDate.toDateString()}
            </p>
            <p>
              <span>Tid:</span> {time}
            </p>
            <p>
              <span>Temperatur:</span> {temperature}
            </p>
            <button onClick={handleConfirmationClosing}>Stäng</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingForm;