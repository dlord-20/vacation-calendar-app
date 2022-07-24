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
    )
}

