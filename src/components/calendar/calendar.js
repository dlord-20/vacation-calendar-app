import { React, useState } from "react";
import calendarStyles from "./calendar.module.css";

export default function Calendar() {
    
    const [userEvents, setUserEvents] = useState([]);
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventDayOfWeek, setEventDayOfWeek] = useState('Sunday');
    const [eventTimeOfDay, setEventTimeOfDay ] = useState('6:00 am');
    const [eventDuration, setEventDuration ]  = useState(0.5);

    //----------------Data---------------------


    //add data arrays for time and weekday
    const weekdaysData = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timesData = ['6:00 am', '6:30 am', '7:00 am', '7:30 am', '8:00 am', '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm', '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm', '4:00 pm', '4:30 pm', '5:00 pm', '5:30 pm', '6:00 pm', '6:30 pm', '7:00 pm', '7:30 pm', '8:00 pm', '8:30 pm' ];

    //----------------End of Data---------------------

    //----------------Determine CSS---------------------

    //Determine className for the event
    const getBorderStyle = () => {
        return {
            border: '1px green solid'
        }
    }

    //Place event in correct position on the calendar
    const getGridPlacement = (rowStart, colStart, rowEnd, colEnd) => {
        return {
            gridArea: `${rowStart}/${colStart}/${rowEnd}/${colEnd}`
        }
    }

    //----------------End of determine CSS---------------------

    //----------------JSX----------------

    //Return an option for the 'Time of the Day' dropdown list in the form
    const getOptions = (time) => {
        return (
            <option value={time}>
                {time}
            </option>
        )
    }

    //Returns an time div for the calendar (left panel)
    const getTimeOfDayDiv = (time, row) => {
        return (
            <div className={calendarStyles.timeOfDay} style={{gridArea: `${row}/1/${row + 1}/2`}}>
                <p>{time}</p>
            </div>
        );
    }

    //returns an event div for the calendar
    const getEventDiv = (event) => {
        // console.log(event.newName);
        const rowStart = getRowStartPosition(event.eventTime);
        const rowEnd = getRowEndPosition(event.eventDuration);
        const colStart = getColumnStartPosition(event.eventWeekday);

        return (
            <div style={{...getBorderStyle(), ...getGridPlacement(rowStart, colStart, rowStart + rowEnd, colStart + 1)}}>
                <p>{event.eventName}</p>
            </div>
        )
    }

    //creates div for list below the calendar
    const getEventListDiv = (event) => {
        return (
        <div className={calendarStyles.eventList}>
            <p><a className={calendarStyles.close} onClick={() => {handleEventDeletion(event)}}></a></p>
            <p>{event.eventName}</p>
            <p>{event.eventDescription}</p>
            <p>{event.eventWeekday}</p>
            <p>{event.eventTime}</p>
            <p>{event.eventDuration} hours</p>
            
        </div>
        )
    }

    //----------------END of JSX----------------


    //----------------Lists of JSX----------------

    //Return list of options for the 'Time of the Day' in the form
    const getTimeOfDayOptions = () => {
        const times = [];

        timesData.forEach(time => {
            times.push(getOptions(time));
        })

        return times;
    }



    //Adds a list of time divs that is added to the DOM (left panel)
    const getTimeOfDayDivs = () => {
        const times = [];
        let row = 2;

        timesData.forEach(time => {
            times.push(getTimeOfDayDiv(time, row));
            row++
        })

        return times;
    }

    //returns an array of weekday headers that is added to the DOM
    const getWeekdayHeadersDivs = () => {
        const weekdaysArray = [];
        let col = 2;
        for(let i = 0; i < weekdaysData.length; i++) {
            const newDay = <div className={calendarStyles.weekdayHeaders} style={{gridArea: `1/${col}/2/${col + 1}`}}>{weekdaysData[i]}</div>;
            weekdaysArray.push(newDay);
            col++;
        }

        return weekdaysArray;
    }

    //returns an array of options for weekday headers that is added to the form
    const getWeekdayHeadersOptions = () => {
        const weekdayOptions = [];
        for(let i = 0; i < weekdaysData.length; i++) {
            const option = <option value={weekdaysData[i]}>{weekdaysData[i]}</option>
            weekdayOptions.push(option)
        }
        return weekdayOptions;
    }

    //returns an array of options in the 'Duration" question in the form
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

    //returns an array of events that is added to the DOM
    const getUserEvents = () => {
        const events = [];
        
        userEvents.forEach(event => {
            const eventDiv = getEventDiv(event);
            events.push(eventDiv);
        })

        return events;
    }

    //adds event list to the DOM
    const getUserEventsList = () => {
        const events = [];

        userEvents.forEach(event => {
            const eventDiv = getEventListDiv(event);
            events.push(eventDiv);
        })

        return events;
    }

    //----------------END list of JSX----------------

    //----------------Positioning of events in calendar----------------


    //returns row position for the event in the calendar
    const getRowStartPosition = (timeOfDay) => {
        const index = timesData.indexOf(timeOfDay);
        return index + 2;
    }

    //returns how long the event will last in the calendar
    const getRowEndPosition = (eventDuration) => {
        return eventDuration * 2;
    }

    //returns what day to put the event
    const getColumnStartPosition = (weekday) => {
        // console.log(weekday);
        const index = weekdaysData.indexOf(weekday);
        return index + 2;
    }

    //----------------End of positioning of events in calendar----------------

    //----------------Handles js events---------------------

    //handles form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const newEvent = {
            eventName: eventName,
            eventDescription: eventDescription,
            eventWeekday: eventDayOfWeek,
            eventTime: eventTimeOfDay,
            eventDuration: eventDuration
        } 
        setUserEvents(userEvents => [...userEvents, newEvent]);
        clearForm();
    }

    //handles event deletion
    const handleEventDeletion = (event) => {
        const oldEventList = [];
        userEvents.map(item => {
            if(item.eventName !== event.eventName) {
                oldEventList.push(item);
            }
        })
        setUserEvents(oldEventList);
    }

    const clearForm = () => {
        updateForm('', '', weekdaysData[0], timesData[0], 0.5);
    }

    //Reset form
    const updateForm = (name, description, day, time, duration) => {
        //This way or create a new way to update
        setEventName(eventName => name);
        setEventDescription(eventDescription => description);
        setEventDayOfWeek(eventDayOfWeek => day);
        setEventTimeOfDay(eventTimeOfDay => time);
        setEventDuration(eventDuration => duration);
    }

    //Updates states in the app

    const handleNameChange = (e) => {
        setEventName(eventName =>  e.target.value);
    }

    const handleDescriptionChange = (e) => {
        console.log(e.target.value);
        setEventDescription(eventDesciption => e.target.value);
    }

    const handleDayOfWeek = (e) => {
        setEventDayOfWeek(eventDayOfWeek => e.target.value)
    }

    const handleTimeOfDay = (e) => {
        setEventTimeOfDay(eventTimeOfDay => e.target.value)
    }

    const handleDuration = (e) => {
        setEventDuration(eventDuration => e.target.value)
    }

    //----------------End of Handles js events---------------------

    return(
        <div>
            <div className="calendarInput">
                <form onSubmit={handleSubmit}>
                    <label for="eventName">Event Name: 
                        <input type="text" id="eventName" name="eventName" value={eventName} onChange={handleNameChange} placeholder="Hike to temple"/><br/>
                    </label>
                    <label for="eventDescription">Event Description: 
                        <input type="text" id="eventDescription" name="eventDescription" value={eventDescription} onChange={handleDescriptionChange} placeholder="1.5 hours up, 1 hour down"/><br/>
                    </label>
                    <label for="dayOfWeek">Day of the Week: </label>
                    <select id="dayOfWeek" name="dayOfWeek" value={eventDayOfWeek} onChange={handleDayOfWeek}>
                        {getWeekdayHeadersOptions()}
                    </select><br/>
                    <label for="timeOfDay">Time of the Day: </label>
                    <select id="timeOfDay" name="timeOfDay" value={eventTimeOfDay} onChange={handleTimeOfDay}>
                        {getTimeOfDayOptions()}
                    </select><br/>
                    <label for="durationOfEvent">Duration: </label>
                    <select id="durationOfEvent" name="durationEvent" value={eventDuration} onChange={handleDuration}>
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

