import React from "react";
import calendarStyles from "./calendar.module.css";

export default function Calendar() {

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
        return <option value={`${hour}:${halfHour}0 ${amPm}m`}>{hour}:{half}0 {amPm}m</option>
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

    const getTimeOfDayDiv = () => {
        <div className={`${calendarStyles.timeOfDay} ${calendarStyles.sixAm}`}>6:00 am</div>
    }

    const getTimeOfDayDivs = () => {
        const times = []
    }

    return(
        <div>
            <div className="calendarInput">
                <form>
                    <label for="eventName">Event Name: </label>
                    <input type="text" id="eventName" name="eventName"></input><br/>
                    <label for="dayOfWeek">Day of the Week: </label>
                    <select id="dayOfWeek" name="dayOfWeek">
                        <option value="Sunday">Sunday</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                    </select><br/>
                    <label for="timeOfDay">Time of the Day: </label>
                    <select id="timeOfDay" name="timeOfDay">
                        {getTimeOfDayOptions()}
                    </select><br/>
                    <input type="submit" value="Add Event"></input>
                </form>
            </div>
            <div className={calendarStyles.container}>
                {/* Weekday Headers */}
                <div className={`${calendarStyles.weekdayHeaders} ${calendarStyles.sunday}`}><p>Sunday</p></div>
                <div className={`${calendarStyles.weekdayHeaders} ${calendarStyles.monday}`}><p>Monday</p></div>
                <div className={`${calendarStyles.weekdayHeaders} ${calendarStyles.tuesday}`}><p>Tuesday</p></div>
                <div className={`${calendarStyles.weekdayHeaders} ${calendarStyles.wednesday}`}><p>Wednesday</p></div>
                <div className={`${calendarStyles.weekdayHeaders} ${calendarStyles.thursday}`}><p>Thursday</p></div>
                <div className={`${calendarStyles.weekdayHeaders} ${calendarStyles.friday}`}><p>Friday</p></div>
                <div className={`${calendarStyles.weekdayHeaders} ${calendarStyles.saturday}`}><p>Saturday</p></div>
                {/* Time of Day */}
                {getTimeOfDayDivs()}
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.sixAm}`}>6:00 am</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.sixThirtyAm}`}>6:30 am</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.sevenAm}`}>7:00 am</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.sevenThirtyAm}`}>7:30 am</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.eightAm}`}>8:00 am</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.eightThirtyAm}`}>8:30 am</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.nineAm}`}>9:00 am</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.nineThirtyAm}`}>9:30 am</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.tenAm}`}>10:00 am</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.tenThirtyAm}`}>10:30 am</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.elevenAm}`}>11:00 am</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.elevenThirtyAm}`}>11:30 am</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.twelvePm}`}>12:00 pm</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.twelveThirtyPm}`}>12:30 pm</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.onePm}`}>1:00 pm</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.oneThirtyPm}`}>1:30 pm</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.twoPm}`}>2:00 pm</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.twoThirtyPm}`}>2:30 pm</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.threePm}`}>3:00 pm</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.threeThirtyPm}`}>3:30 pm</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.fourPm}`}>4:00 pm</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.fourThirtyPm}`}>4:30 pm</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.fivePm}`}>5:00 pm</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.fiveThirtyPm}`}>5:30 pm</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.sixPm}`}>6:00 pm</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.sixThirtyPm}`}>6:30 pm</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.sevenPm}`}>7:00 pm</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.sevenThirtyPm}`}>7:30 pm</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.eightPm}`}>8:00 pm</div>
                <div className={`${calendarStyles.timeOfDay} ${calendarStyles.eightThirtyPm}`}>8:30 pm</div>

                <div style={{...getBorderStyle(), ...getGridPlacement(6,6,7,7)}}>I'm a test</div>
                <div style={{gridArea: 2/4/3/5}}>I'm the second</div>


            </div>
            <div className="eventList">
                <div>
                    <p>Here's a list</p>
                </div>
            </div>
        </div>
    )
}

