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
                        <option value="6:00 am">6:00 am</option>
                        <option value="6:30 am">6:30 am</option>
                        <option value="7:00 am">7:00 am</option>
                        <option value="7:30 am">7:30 am</option>
                        <option value="8:00 am">8:00 am</option>
                        <option value="8:30 am">8:30 am</option>
                        <option value="9:00 am">9:00 am</option>
                        <option value="9:30 am">9:30 am</option>
                        <option value="10:00 am">10:00 am</option>
                        <option value="10:30 am">10:30 am</option>
                        <option value="11:00 am">11:00 am</option>
                        <option value="11:30 am">11:30 am</option>
                        <option value="12:00 pm">12:00 pm</option>
                        <option value="12:30 pm">12:30 pm</option>
                        <option value="1:00 pm">1:00 pm</option>
                        <option value="1:30 pm">1:30 pm</option>
                        <option value="2:00 pm">2:00 pm</option>
                        <option value="2:30 pm">2:30 pm</option>
                        <option value="3:00 pm">3:00 pm</option>
                        <option value="3:30 pm">3:30 pm</option>
                        <option value="4:00 pm">4:00 pm</option>
                        <option value="4:30 pm">4:30 pm</option>
                        <option value="5:00 pm">5:00 pm</option>
                        <option value="5:30 pm">5:30 pm</option>
                        <option value="6:00 pm">6:00 pm</option>
                        <option value="6:30 pm">6:30 pm</option>
                        <option value="7:00 pm">7:00 pm</option>
                        <option value="7:30 pm">7:30 pm</option>
                        <option value="8:00 pm">8:00 pm</option>
                        <option value="8:30 pm">8:30 pm</option>
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

