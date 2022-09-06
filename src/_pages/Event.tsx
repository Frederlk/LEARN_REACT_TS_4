import { FC, useState, useEffect } from "react";
import { Layout, Row, Button, Modal } from "antd";
import EventCalendar from "../_components/EventCalendar";
import EventForm from "../_components/EventForm";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";

const Event: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { fetchGuests, createEvent, fetchEvents } = useActions();
    const { guests, events } = useTypedSelector((state) => state.event);
    const { user } = useTypedSelector((state) => state.auth);

    useEffect(() => {
        fetchGuests();
        fetchEvents(user.username);
    }, []);

    const addNewEvent = (event: IEvent) => {
        setIsModalOpen(false);
        createEvent(event, user.username);
    };

    return (
        <Layout>
            <EventCalendar events={events} />
            <Row justify="center">
                <Button onClick={() => setIsModalOpen(true)}>Add event</Button>
            </Row>
            <Modal
                title="Add new event"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}>
                <EventForm guests={guests} submit={(event) => addNewEvent(event)} />
            </Modal>
        </Layout>
    );
};

export default Event;
