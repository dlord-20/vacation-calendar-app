import { React, useState } from "react";
import calendarStyles from "./calendar.module.css";
import { weekdaysData, timesData, categoryColorsData } from "../../data/data";

//Add borders for each day
//Change category colors to className instead of inline - Can add better effects this way
//Change color of list to corresponding category color
//Change list to be in chronological order
//Refactor userEvents to use Redux instead of useState

export default function Calendar() {
    
    const [userEvents, setUserEvents] = useState([]);
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventDayOfWeek, setEventDayOfWeek] = useState('Sunday');
    const [eventTimeOfDay, setEventTimeOfDay ] = useState('6:00 am');
    const [eventColor, setEventColor] = useState('Blue');
    const [eventDuration, setEventDuration ]  = useState(0.5);

    //----------------Determine inline CSS---------------------

    //Place event in correct position on the calendar
    const getGridPlacement = (rowStart, colStart, rowEnd, colEnd) => {
        return {
            gridArea: `${rowStart}/${colStart}/${rowEnd}/${colEnd}`
        }
    }

    //----------------End of determining inline CSS---------------------

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

    // <div className={`event${getBorderStyle(selectedColor)}`} style={{...getBorderStyle(selectedColor), ...getGridPlacement(rowStart, colStart, rowStart + rowEnd, colStart + 1)}}>

    //returns an event div for the calendar
    const getEventDiv = (event) => {
        const rowStart = getRowStartPosition(event.eventTime);
        const rowEnd = getRowEndPosition(event.eventDuration);
        const colStart = getColumnStartPosition(event.eventWeekday);
        const selectedColor = event.eventColor;
        const nameOfClass = `event${selectedColor}`;

        return (
            <div className={calendarStyles[nameOfClass]} style={getGridPlacement(rowStart, colStart, rowStart + rowEnd, colStart + 1)}>
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

    const getColorOption = (color) => {
        return <option value={color}>{color}</option>
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

    const getColorOptions = () => {
        const colorsList = [];
        categoryColorsData.forEach(category => {
            colorsList.push(getColorOption(category.colorName));
        })

        return colorsList;

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
            eventDuration: eventDuration,
            eventColor: eventColor
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
        updateForm('', '', weekdaysData[0], timesData[0],'Blue', 0.5,);
    }

    //Reset form
    const updateForm = (name, description, day, time, color, duration ) => {
        //This way or create a new way to update
        setEventName(name);
        setEventDescription(description);
        setEventDayOfWeek(day);
        setEventTimeOfDay(time);
        setEventColor(color)
        setEventDuration(duration);
    }

    //Updates states in the app

    const handleNameChange = (e) => {
        setEventName(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setEventDescription(e.target.value);
    }

    const handleDayOfWeek = (e) => {
        setEventDayOfWeek(e.target.value)
    }

    const handleTimeOfDay = (e) => {
        setEventTimeOfDay(e.target.value)
    }

    const handleColor = (e) => {
        setEventColor(e.target.value)
    }

    const handleDuration = (e) => {
        setEventDuration(e.target.value)
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
                    <label for="color">Category:
                        <select id="color" name="color" value={eventColor} onChange={handleColor}>
                            {getColorOptions()}
                        </select><br/> 
                    </label>
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

