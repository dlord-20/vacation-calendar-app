import { React, useState } from "react";
import calendarStyles from "./calendar.module.css";
import { weekdaysData, timesData, categoryColorsData } from "../../data/data";

//Change color of list to corresponding category color
//Change event list to be in chronological order
//Refactor userEvents to use Redux instead of useState
//Make event list tell us the events under each day
//Move creating an event to lightbox -> Possibly make it possible so when you click on the calendar you can add an event right at that time and day


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
            <div className={calendarStyles.timeOfDay} style={{gridArea: `${row}/1/${row + 1}/2`}} id={`timeHeader${row}`}>
                <p>{time}</p>
            </div>
        );
    }

    //returns an event div for the calendar
    const getEventDiv = (event) => {
        const rowStart = getRowStartPosition(event.eventTime);
        const rowEnd = getRowEndPosition(event.eventDuration);
        const colStart = getColumnStartPosition(event.eventWeekday);
        const selectedColor = event.eventColor;
        const nameOfClass = `event${selectedColor}`;

        return (
            <div className={calendarStyles.calendarUserEvents} style={getGridPlacement(rowStart, colStart, rowStart + rowEnd, colStart + 1)}>
                <p className={calendarStyles[nameOfClass]}>{event.eventName}</p>
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
            const newDay = (
                <div className={calendarStyles.weekdayHeaders} style={{gridArea: `1/${col}/2/${col + 1}`}} id={`weekdayHeader${i}`}>
                    <p>{weekdaysData[i]}</p>
                </div>
            );
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
        categoryColorsData.forEach(color => {
            colorsList.push(getColorOption(color));
        })

        return colorsList;

    }

    const getBlankGrid = () => {
        const blankGrids = [];
        let col = 2;
        let row = 2;
        for(let i = 0; i < timesData.length; i++) {
            col = 2;
            for(let j = 0; j < weekdaysData.length; j++) {
                const blankGrid = (
                    <div 
                    className={calendarStyles.blankGridBlock} 
                    style={{gridArea: `${row}/${col}/${row+1}/${col + 1}`}} 
                    onMouseEnter={handleGridMouseEnter} 
                    onMouseLeave={handleGridMouseLeave} 
                    onClick={handleGridClick}
                    id={`blankitem${row}${col}`}/>
                    );
                    blankGrids.push(blankGrid);
                col++;
            }
            row++;
        }

        return blankGrids;
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

    //Pop up with lightbox to add event
    //Maybe add a onDragStart and onDragEnd to edit duration as well
    const handleGridClick = (event) => {
        const rowStart = getRowPositionOnGrid(event);
        const colStart = getColPositionOnGrid(event);
        updateForm(eventName, eventDescription, weekdaysData[colStart], timesData[rowStart - 2], eventColor, eventDuration);

    }

    const getRowPositionOnGrid = (event) => {
        const gridArea = event.target.style.gridArea;
        const rowStart = gridArea.slice(0, gridArea.indexOf('/'));
        return rowStart * 1;
    }

    const getColPositionOnGrid = (event) => {
        const gridArea = event.target.style.gridArea;
        const temp = gridArea.slice(gridArea.indexOf('/') + 1, gridArea.lastIndexOf('/'));
        const colStart = temp.slice(1, gridArea.indexOf('/'));
        return colStart - 2;
    }

    //Highlights day and time mouse is located on
    const handleGridMouseEnter = (event) => {
        const rowStart = getRowPositionOnGrid(event);
        const colStart = getColPositionOnGrid(event);
        const currentTimeStyle = "2px white solid"

        //This is bad... Shouldn't access elements like this but it works
        
        const weekdayElement = document.getElementById(`weekdayHeader${colStart}`);
        weekdayElement.style.borderBottom = currentTimeStyle;
        const timeElement = document.getElementById(`timeHeader${rowStart}`);
        timeElement.style.borderRight = currentTimeStyle
    }

    const handleGridMouseLeave = (event) => {
        const rowStart = getRowPositionOnGrid(event);
        const colStart = getColPositionOnGrid(event);
        const currentTimeStyle = "2px rgba(0, 0, 0, 0) solid";

        //This is bad... Shouldn't access elements like this but it works
        
        const weekdayElement = document.getElementById(`weekdayHeader${colStart}`);
        weekdayElement.style.borderBottom = currentTimeStyle;
        const timeElement = document.getElementById(`timeHeader${rowStart}`);
        timeElement.style.borderRight = currentTimeStyle;
    }

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
        updateForm('', '', weekdaysData[0], timesData[0], categoryColorsData[0], 0.5,);
    }

    //Change form
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
            <h1>Weekly Planner</h1>
            <div className="calendarInput">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="eventName">Event Name: 
                        <input type="text" id="eventName" name="eventName" value={eventName} onChange={handleNameChange} placeholder="Hike to temple"/><br/>
                    </label>
                    <label htmlFor="eventDescription">Event Description: 
                        <input type="text" id="eventDescription" name="eventDescription" value={eventDescription} onChange={handleDescriptionChange} placeholder="1.5 hours up, 1 hour down"/><br/>
                    </label>
                    <label htmlFor="dayOfWeek">Day of the Week: </label>
                    <select id="dayOfWeek" name="dayOfWeek" value={eventDayOfWeek} onChange={handleDayOfWeek}>
                        {getWeekdayHeadersOptions()}
                    </select><br/>
                    <label htmlFor="timeOfDay">Time of the Day: </label>
                    <select id="timeOfDay" name="timeOfDay" value={eventTimeOfDay} onChange={handleTimeOfDay}>
                        {getTimeOfDayOptions()}
                    </select><br/>
                    <label htmlFor="color">Category:
                        <select id="color" name="color" value={eventColor} onChange={handleColor}>
                            {getColorOptions()}
                        </select><br/> 
                    </label>
                    <label htmlFor="durationOfEvent">Duration: </label>
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
                {/* Blank grid events for effects */}
                {getBlankGrid()}
                {/* User Events */}
                {getUserEvents()}
            </div>
            <div className="eventList">
                <div>
                    <p>Here's a list</p>
                    {getUserEventsList()}
                </div>
            </div>

            {/* Possibly insert crazy background here */}
            <div className={calendarStyles.bg}></div>
            <div className={`${calendarStyles.bg} ${calendarStyles.bg2}`}></div>
            <div className={`${calendarStyles.bg} ${calendarStyles.bg3}`}></div>
            {/* End of code */}
        </div>
    )
}

