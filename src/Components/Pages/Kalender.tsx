
import './Kalender.css';

import ReactCalendar from "react-calendar";


interface KalenderProps {
  onDateSelection: (date: Date) => void;
}

function Kalender({ onDateSelection }: KalenderProps) {
  const monday = (date: Date): boolean => {
    return date.getDay() === 1;
  };

  const closeMondays = ({
    date,
    view,
  }: {
    date: Date;
    view: string;
  }): boolean => {
    if (view === "month") {
      return monday(date);
    }
    return false;
  };

  return (
    <div>
      <ReactCalendar
        minDate={new Date()}
        className="Kalender"
        view="month"
        onClickDay={onDateSelection}
        tileDisabled={closeMondays}
      />
    </div>
  );
}

export default Kalender;