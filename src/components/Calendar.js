import React, { useEffect, useState } from "react";
import { Calendar,  momentLocalizer,  Views } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { DateTime } from "luxon";
import moment from "moment";


moment.locale("fi");


export default function CalendarRender() {

    const localizer = momentLocalizer(moment);
    const [trainings, setTrainings] = useState([]);

    useEffect( () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(res => res.json())
        .then(data => setTrainings(data))

        .catch(err => console.error(err));
    }, []);

    const instances = trainings.map((training) => (
        {
            title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
            start: new Date(training.date),
            end: new Date(new Date(training.date).getTime() + (training.duration*60000))
          }
    ))

    //check later if works >>
    //const allViews = Object.keys(Calendar.Views).map(k => Calendar.Views[k]);


    return (
        <div>
         <Calendar
            defaultView={Views.WEEK}
            events={instances}
            localizer={localizer}
            popup={false}
            />
        </div>
    )
}