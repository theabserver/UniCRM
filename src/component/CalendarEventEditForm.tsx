import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useRef, useImperativeHandle, forwardRef } from "react";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

export type CalendarEventEditFormProps = {
  event: string;
  defaultStartDate: Dayjs;
  defaultEndDt: Dayjs;
};

type CalendarEventEditFormRef = {
  getData: () => {
    meeting: string;
    meetingStart: Dayjs | null;
    meetingEnd: Dayjs | null;
  };
};

const CalendarEventEditForm = forwardRef<
  CalendarEventEditFormRef,
  CalendarEventEditFormProps
>((props, formRef) => {
  const meetingRef = useRef<string>(props.event);
  const meetingStartRef = useRef<Dayjs | null>(null);
  const meetingEndRef = useRef<Dayjs | null>(null);

  // Expose the `getData` function to the parent component using `useImperativeHandle`
  useImperativeHandle(formRef, () => ({
    getData() {
      return {
        meeting: meetingRef.current,
        meetingStart: meetingStartRef.current,
        meetingEnd: meetingEndRef.current,
      };
    },
  }));

  const updateEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    meetingRef.current = e.target.value;
  };

  const updateMeetingStart = (value: Dayjs) => {
    meetingStartRef.current = value;
  };

  const updateMeetingEnd = (value: Dayjs) => {
    meetingEndRef.current = value;
  };

  return (
    <>
      <TextField
        sx={{ mt: 5, mb: 3 }}
        autoFocus
        margin="dense"
        id="eventName"
        label="Event Name"
        type="text"
        fullWidth
        defaultValue={props.event}
        inputRef={meetingRef}
        onChange={updateEvent}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          format="DD/MM/YYYY hh:mm a"
          // inputRef={meetingStartRef}
          onChange={updateMeetingStart}
          // defaultValue={dayjs(props.defaultStartDate)}
          value={props.defaultStartDate}
          sx={{ mr: 3 }}
          label="Meeting starts at"
        />
        <DateTimePicker
          format="DD/MM/YYYY hh:mm a"
          // inputRef={meetingEndRef}
          onChange={updateMeetingEnd}
          defaultValue={dayjs(props.defaultEndDt)}
          value={props.defaultStartDate}
          label="Meeting ends at"
        />
      </LocalizationProvider>
    </>
  );
});

export default CalendarEventEditForm;
