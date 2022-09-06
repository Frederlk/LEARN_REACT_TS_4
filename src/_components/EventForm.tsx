import { FC, useState } from "react";
import { Form, Input, Button, DatePicker, Row, Select } from "antd";
import { rules } from "../utils/rules";
import { IUser } from "../models/IUser";
import { IEvent } from "../models/IEvent";
import { Moment } from "moment";
import { formateDate } from "../utils/date";
import { useTypedSelector } from "../hooks/useTypedSelector";

interface EventFormProps {
    guests: IUser[];
    submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = (props) => {
    const [event, setEvent] = useState<IEvent>({
        author: "",
        date: "",
        description: "",
        guest: "",
    } as IEvent);

    const { user } = useTypedSelector((state) => state.auth);

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({ ...event, date: formateDate(date?.toDate()) });
        }
    };

    const submitForm = () => {
        props.submit({ ...event, author: user.username });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form name="basic" onFinish={submitForm} onFinishFailed={onFinishFailed}>
            <Form.Item label="Event Description" name="description" rules={[rules.required()]}>
                <Input
                    value={event.description}
                    onChange={(e) => setEvent({ ...event, description: e.target.value })}
                />
            </Form.Item>

            <Form.Item
                label="Event Date"
                name="date"
                rules={[rules.required(), rules.isDateAfter("You cannot create an event in the past")]}>
                <DatePicker onChange={(date) => selectDate(date)} />
            </Form.Item>

            <Form.Item label="Event Guest" name="guest" rules={[rules.required()]}>
                <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
                    {props.guests.map(({ username }) => (
                        <Select.Option key={username} value={username}>
                            {username}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Row justify="end">
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};

export default EventForm;
