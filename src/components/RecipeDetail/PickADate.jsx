import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function PickADate() {
  const [selectedDate, setStartDate] = useState(new Date());

  return (
    // <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div>
        {/* <DatePicker value={selectedDate} onChange={handleDateChange} /> */}
        <DatePicker selected={selectedDate} onChange={date => setStartDate(date)} />

      </div>
    // </MuiPickersUtilsProvider>
  );
}

export default PickADate;
