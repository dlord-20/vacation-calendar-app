import { React, useState } from "react";
import calendarStyles from "./calendar.module.css";

export default function Calendar() {
    
    const [userEvents, setUserEvents] = useState([]);
    const [eventName, setEventName] = useState('');
    const [eventDayOfWeek, setEventDayOfWeek] = useState('Sunday');
    const [eventTimeOfDay, setEventTimeOfDay ] = useState('6: 00 am');
    const [eventDuration, setEventDuration ]  = useState(0.5);

    //add data arrays for time and weekday
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const getBorderStyle = () => {
        return {
            border: '1px green solid'
        }
    }

    const getGridPlacement = (rowStart, colStart, rowEnd, colEnd) => {
        return {
            gridArea: `${rowStart}/${colStart}/${rowEnd}/${colEnd}`
        }
    }

    const getOptions = (hour, halfHour, am) => {
        let half = 0;
        if(halfHour) {
            half = 3;
        }
        let amPm = 'a'
        if(!am) {
            amPm = 'p'
        }
        return <option value={`${hour}:${half}0 ${amPm}m`}>{hour}:{half}0 {amPm}m</option>
    }

    const getTimeOfDayOptions = () => {
        const times = [];

        //get am times
        for(let i = 6; i < 12; i++) {
            times.push(getOptions(i, false, true));
            times.push(getOptions(i, true, true));
        }

        //get noon times
        times.push(getOptions(12, false, false));
        times.push(getOptions(12, true, false));

        //get pm times
        for(let i = 1; i < 9; i++) {
            times.push(getOptions(i, false, false));
            times.push(getOptions(i, true, false));
        }
        return times;
    }

    const getTimeOfDayDiv = (hour, halfHour, am, row) => {
        let half = 0;
        if(halfHour) {
            half = 3;
        }
        let amPm = 'a'
        if(!am) {
            amPm = 'p'
        }
        return <div className={calendarStyles.timeOfDay} style={{gridArea: `${row}/1/${row + 1}/2`}}>{hour}:{half}0 {amPm}m</div>;
    }

    const getTimeOfDayDivs = () => {
        const times = [];
        let row = 2;
        //get am times
        for(let i = 6; i < 12; i++) {
            times.push(getTimeOfDayDiv(i, false, true, row));
            row++;
            times.push(getTimeOfDayDiv(i, true, true, row));
            row++;
        }

        //get noon times
        times.push(getTimeOfDayDiv(12, false, false, row));
        row++;
        times.push(getTimeOfDayDiv(12, false, false, row));
        row++;

        //get pm times
        for(let i = 1; i < 9; i++) {
            times.push(getTimeOfDayDiv(i, false, false, row));
            row++;
            times.push(getTimeOfDayDiv(i, true, false, row));
            row++;
        }
        return times;
    }

    const getWeekdayHeadersDivs = () => {
        const weekdaysArray = [];
        let col = 2;
        for(let i = 0; i < weekdays.length; i++) {
            const newDay = <div className={calendarStyles.weekdayHeaders} style={{gridArea: `1/${col}/2/${col + 1}`}}>{weekdays[i]}</div>;
            weekdaysArray.push(newDay);
            col++;
        }

        return weekdaysArray;
    }

    const getWeekdayHeadersOptions = () => {
        const weekdayOptions = [];
        for(let i = 0; i < weekdays.length; i++) {
            const option = <option value={weekdays[i]}>{weekdays[i]}</option>
            weekdayOptions.push(option)
        }
        return weekdayOptions;
    }

    const getDurationOptions = () => {
        const durations = [];
        for(let i = 1; i < 11; i++) {
            durations.push(i*.5)
        }
        const list = [];
        durations.forEach(duration => {
            list.push(<option value={duration}>{duration} hours</option>)
        })
        return list;
    }

    const getRowStartPosition = () => {

    }

    const getColumnStartPosition = () => {
        
    }
    
    const getEventDiv = (event) => {
        // console.log(event.newName);
        const rowStart = 0;
        const colStart = 0;
        // <div style={{...getBorderStyle(), ...getGridPlacement(6,6,7,7)}}>I'm a test</div>
    }
    
    const getUserEvents = () => {
        const events = [];
        
        userEvents.forEach(event => {
            const eventDiv = getEventDiv(event);
            events.push(eventDiv);
        })


        return events;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newEvent = {
            newName: eventName,
            newWeekday: eventDayOfWeek,
            newTime: eventTimeOfDay,
            newDuration: eventDuration
        } 
        setUserEvents(userEvents => [...userEvents, newEvent])
    }

    const handleNameChange = (e) => {
        setEventName(eventName =>  e.target.value);
    }

    const handleDayOfWeek = (e) => {
        setEventDayOfWeek(eventDayOfWeek => e.target.value)
    }

    const handleTimeOfDay = (e) => {
        setEventTimeOfDay(eventTimeOfDay => e.target.value)
    }

    const handleDuration = (e) => {
        console.log(e.target.value);
        setEventDuration(eventDuration => e.target.value)
    }

    return(
        <div>
            <div className="calendarInput">
                <form onSubmit={handleSubmit}>
                    <label for="eventName">Event Name: 
                        <input type="text" id="eventName" name="eventName" onChange={handleNameChange}/><br/>
                    </label>
                    
                    <label for="dayOfWeek">Day of the Week: </label>
                    <select id="dayOfWeek" name="dayOfWeek" onChange={handleDayOfWeek}>
                        {getWeekdayHeadersOptions()}
                    </select><br/>
                    <label for="timeOfDay">Time of the Day: </label>
                    <select id="timeOfDay" name="timeOfDay" onChange={handleTimeOfDay}>
                        {getTimeOfDayOptions()}
                    </select><br/>
                    <label for="durationOfEvent">Duration: </label>
                    <select id="durationOfEvent" name="durationEvent" onChange={handleDuration}>
                        {getDurationOptions()}
                    </select><br/>
                    <input type="submit" value="Add Event"></input>
                </form>
            </div>
            <div className={calendarStyles.container}>
                {/* Weekday Headers */}
                {getWeekdayHeadersDivs()}
                {/* Time of Day */}
                {getTimeOfDayDivs()}
                {getUserEvents()}
                <div style={{...getBorderStyle(), ...getGridPlacement(6,6,7,7)}}>I'm a test</div>


            </div>
            <div className="eventList">
                <div>
                    <p>Here's a list</p>
                </div>
            </div>
        </div>
    )
}

