import { React, useState } from "react";
import calendarStyles from "./calendar.module.css";

export default function Calendar() {
    
    const [userEvents, setUserEvents] = useState([]);
    const [eventName, setEventName] = useState('');
    const [eventDayOfWeek, setEventDayOfWeek] = useState('Sunday');
    const [eventTimeOfDay, setEventTimeOfDay ] = useState('6:00 am');
    const [eventDuration, setEventDuration ]  = useState(0.5);

    //add data arrays for time and weekday
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timesTest = ['6:00 am', '6:30 am', '7:00 am', '7:30 am', '8:00 am', '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm', '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm', '4:00 pm', '4:30 pm', '5:00 pm', '5:30 pm', '6:00 pm', '6:30 pm', '7:00 pm', '7:30 pm', '8:00 pm', '8:30 pm' ];

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

    const getOptions = (time) => {
        return (
        <option value={time}>
            <p>{time}</p>
        </option>)
    }

    const getTimeOfDayOptions = () => {
        const times = [];

        timesTest.forEach(time => {
            times.push(getOptions(time));
        })

        return times;
    }

    const getTimeOfDayDiv = (time, row) => {
        return (
        <div className={calendarStyles.timeOfDay} style={{gridArea: `${row}/1/${row + 1}/2`}}>
            <p>{time}</p>
        </div>);
    }

    const getTimeOfDayDivs = () => {
        const times = [];
        let row = 2;

        timesTest.forEach(time => {
            times.push(getTimeOfDayDiv(time, row));
            row++
        })

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

    const getRowStartPosition = (timeOfDay) => {
        const index = timesTest.indexOf(timeOfDay);
        return index + 2;
    }

    const getRowEndPosition = (eventDuration) => {
        return eventDuration * 2;
    }

    const getColumnStartPosition = (weekday) => {
        // console.log(weekday);
        const index = weekdays.indexOf(weekday);
        return index + 2;
    }
    
    const getEventDiv = (event) => {
        // console.log(event.newName);
        const rowStart = getRowStartPosition(event.eventTime);
        const rowEnd = getRowEndPosition(event.eventDuration);
        const colStart = getColumnStartPosition(event.eventWeekday);

        return <div style={{...getBorderStyle(), ...getGridPlacement(rowStart, colStart, rowStart + rowEnd, colStart + 1)}}>{event.eventName}</div>
    }
    
    const getUserEvents = () => {
        const events = [];
        
        userEvents.forEach(event => {
            const eventDiv = getEventDiv(event);
            events.push(eventDiv);
        })


        return events;
    }

    const getEventListDiv = (event) => {
        return (
        <div className={calendarStyles.eventList}>
            <p>{event.eventName}</p>
            <p>{event.eventWeekday}</p>
            <p>{event.eventTime}</p>
            <p>{event.eventDuration}</p>
        </div>
        )
    }

    const getUserEventsList = () => {
        const events = [];

        userEvents.forEach(event => {
            const eventDiv = getEventListDiv(event);
            events.push(eventDiv);
        })

        return events;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newEvent = {
            eventName: eventName,
            eventWeekday: eventDayOfWeek,
            eventTime: eventTimeOfDay,
            eventDuration: eventDuration
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
                {/* User Events */}
                {getUserEvents()}
            </div>
            <div className="eventList">
                <div>
                    <p>Here's a list</p>
                    {getUserEventsList()}
                </div>
            </div>
        </div>
    )
}

