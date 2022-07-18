import React from "react";
import calendarStyles from "./calendar.module.css";

export default function Calendar() {
    return(
        <div className={calendarStyles.container}>
            <div className={calendarStyles.weekdayHeaders}>
                <div className={calendarStyles.monday}><p>Monday</p></div>
            </div>
            <div className={calendarStyles.timeOfDay}>
                <ul>
                    <li>6:00 am</li>
                    <li>6:30 am</li>
                </ul>
            </div>
        </div>
    )
}