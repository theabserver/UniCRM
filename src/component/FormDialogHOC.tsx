import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import React from "react";
import CalendarEventEditForm from "./CalendarEventEditForm";

type FormRefType = {
  getData: () => any;
};

type FormDialogProps = {
  openDialog?: boolean;
  title: string;
  contentText: string;
  submitCB: (data: any) => void;
  closeCB?: () => void;
};
export default function FormDialog({
  openDialog = false,
  title,
  contentText,
  submitCB,
  closeCB,
}: FormDialogProps) {
  const [open, setOpen] = useState(openDialog);
  const formRef = useRef<FormRefType>(null);
  // can be called from calling component
  const handleClickOpen = () => {
    setOpen(openDialog);
  };
  const handleSubmit = () => {
    if (formRef.current) {
      const formData = formRef.current.getData();
      console.log("Form Data: ", formData);
      submitCB(formData);
    }
  };

  const handleClose = () => {
    sessionStorage.setItem("appointment", "");
    if (closeCB) {
      closeCB();
    } else {
      setOpen(false);
    }
  };
  const getStartDate = () => {
    const appointment = sessionStorage.getItem("appointment");
    return (appointment != null && JSON.parse(appointment).start) || "";
  };
  const getEndDate = () => {
    const appointment = sessionStorage.getItem("appointment");
    return (appointment != null && JSON.parse(appointment).end) || "";
  };
  const getEvent = () => {
    const appointment = sessionStorage.getItem("appointment");
    return (appointment != null && JSON.parse(appointment).title) || "";
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-apartment"
      >
        <DialogTitle id="edit-apartment">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
          <CalendarEventEditForm
            ref={formRef}
            event={getEvent()}
            defaultStartDate={getStartDate()}
            defaultEndDt={getEndDate()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
