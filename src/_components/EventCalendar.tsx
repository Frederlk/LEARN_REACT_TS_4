import { FC } from "react";
import { Calendar } from "antd";
import { IEvent } from "../models/IEvent";
import { Moment } from "moment";
import { formateDate } from "../utils/date";

interface EventCalendarProps {
    events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {
    function dateCellRender(value: Moment) {
        const formatedDate = formateDate(value.toDate());
        const currentDayEvents = props.events.filter((ev) => ev.date === formatedDate);

        return (
            <div>
                {currentDayEvents.map((ev, i) => (
                    <div key={i}>{ev.description}</div>
                ))}
            </div>
        );
    }

    return <Calendar dateCellRender={dateCellRender} />;
};

export default EventCalendar;
