import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateTimePicker = () => {
    const [startDate, setStartDate] = useState(null);
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        return currentDate.getTime() < selectedDate.getTime();
    }
    return (
        <>
            <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                showTimeSelect
                filterTime={filterPassedTime}
                minDate={new Date()}
                dateFormat="MMMM d, yyyy h:mm aa"
            />
        </>
    )
}

export default DateTimePicker