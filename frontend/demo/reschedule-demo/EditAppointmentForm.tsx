import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

import { format } from "date-fns";
import { appointmentTypes } from "@/types/Types";

const EditAppointmentForm = ({ date, time, handleDateChange, handleTimeChange, handleSubmit, handleDelete }: appointmentTypes) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
      <Input required type="date" value={format(date, "yyyy-MM-dd")} onChange={handleDateChange}/>
      <Input required type="time" value={time} onChange={handleTimeChange}/>

      <Button type="submit" >Reschedule</Button>
      <Button type="button" onClick={handleDelete} variant={"destructive"}>Cancel Appointment</Button>

    </form>
  );
};

export default EditAppointmentForm;
