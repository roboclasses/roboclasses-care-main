"use client";

import { formatDate, DateSelectArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ScrollArea } from "@/components/ui/scroll-area";
import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo";
import { toast } from "@/hooks/use-toast";

import { getUserSession } from "@/lib/session";
import { eventsType } from "@/types/Types";
import { EventUrl } from "@/constants";

import React, { useState, useEffect, useMemo } from "react";
import axios, { AxiosError } from "axios";
import useSWR from "swr";
import { Label } from "@/components/ui/label";


const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Calender = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<eventsType[]>( EventUrl, fetcher );

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const [eventType, setEventType] = useState("");
  const [user, setUser] = useState({ role: "", name: "" });

  // Handle fetching user session
  useEffect(() => {
    const handleFetch = async () => {
      const session = await getUserSession();
      if (!session.role || !session.name) {
        throw new Error("No user session is found.");
      }
      setUser({ role: session.role, name: session.name });
    };
    handleFetch();
  }, []);

  // Handle filter events
  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((event) => {
      if ( user.role === "teacher" && event.extendedProps?.createdBy !== user.name ) return false;
      return true;
    });
  }, [data, user]);

  // handle open the event dialog
  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedDate(selected);
    setIsDialogOpen(true);
  };

  // handle close the event dialog
  const HandleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEventTitle("");
  };

  // handle delete event
  const handleDeleteEvent = async (eventId: string) => {
    try {
      const res = await axios.delete(`${EventUrl}/${eventId}`);
      console.log(res.data);

      // Instantly updated with latest event list
      mutate();

      const { message } = res.data;
      toast({ title: "Success✅", description: message, variant: "default" });

    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);

        const { message } = error.response?.data;
        toast({ title: "Failed", description: message, variant: "destructive" });
      }
    }
  };

  // handle add events
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (newEventTitle && selectedDate) {
        const calendarApi = selectedDate.view.calendar;
        calendarApi.unselect();

        const newEvent = {
          id: `${selectedDate?.start.toISOString()}-${newEventTitle}`,
          title: newEventTitle,
          start: selectedDate?.start,
          end: selectedDate?.end,
          allDay: selectedDate?.allDay,
          extendedProps: {
            createdBy: user.name,
            eventType: eventType === "demo" ? "Demo Class": eventType === "normal" ? "Normal Class" : "",
          },
        };

        const res = await axios.post(EventUrl, newEvent);
        console.log(res.data);

        const { message } = res.data;

        calendarApi.addEvent(newEvent);
        HandleCloseDialog();

        // Instantly update the latest event list
         mutate();

        toast({ title: "Success✅", description: message, variant: "default" });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);

        const { message } = error.response?.data;
        toast({ title: "Failed", description: message, variant: "destructive" });
      }
    }
  };

  // Handle edge cases
  function handleEdgeCases() {
    if (data?.length === 0) return <div>Empty list for Events</div>;
    if (error instanceof AxiosError) {
      const { message } = error.response?.data;
      return <div>{message || "An unknown error has occurred."}</div>;
    }
    if (isLoading) return <div>Loading...</div>;
    if (isValidating) return <div>Refershing data...</div>;
  }

  return (
    <>
      <div className="grid lg:grid-cols-1 grid-cols-1 w-full px-5 justify-start items-start gap-5">

        <div className="w-full mt-4">
          <FullCalendar
            height={"85vh"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next toady",
              center: "title",
              right: "dayGridMonth, timeGridWeek, timeGridDay",
            }}
            initialView="timeGridWeek"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            events={filteredData}
            eventClassNames={(arg) => {
              const type = arg.event.extendedProps?.eventType;
              console.log("event type is"+type);
              
              if(type === 'Demo Class'){
                return ["demo-event"]
              }
              return []
            }}
            views={{
              dayGridMonth: {
                titleFormat: { year: "numeric", month: "short" },
              },
              timeGridWeek: {
                titleFormat: {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
                dayHeaderFormat: { weekday: "short" },
              },
              timeGridDay: {
                titleFormat: {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
              },
            }}
          />
        </div>

        <div className="w-full">
          <div className="py-2 mb-6 lg:text-4xl text-xl font-extrabold text-center">
            Calender Events
          </div>

          <ScrollArea className="h-[300px] w-auto rounded-md border">
            <ul className="space-y-4 p-10">
              {handleEdgeCases()}

              {filteredData.length > 0 &&
                filteredData.map((event: eventsType) => (
                  <li
                    className="border border-gray-200 shadow-none px-4 py-2 rounded-md text-blue-800 
                    flex flex-col items-center justify-center gap-2"
                    key={event.id}
                  >
                    <p>Organizer: {event.extendedProps?.createdBy}</p>
                    <p>Event Type: {event.extendedProps?.eventType}</p>
                    <p>Event Title: {event.title}</p>
                    <label className="text-slate-950">
                      Full Date: {formatDate(event.start!, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </label>
                    <DeleteAlertDemo
                      onDelete={() => handleDeleteEvent(event._id)}
                      onCancel={() => console.log("Delete event cancelled.")}
                    />
                  </li>
                ))}
            </ul>
          </ScrollArea>
        </div>

        {/* CSS-in-JS style  */}
        <style jsx global>{`
          /* Responsive styles for FullCalendar */
          @media (max-width: 768px) {
            .fc-header-toolbar {
              flex-direction: column;
              gap: 0.5rem;
            }

            .fc-toolbar-chunk {
              display: flex;
              justify-content: center;
              width: 100%;
              margin-bottom: 0.5rem;
            }

            .fc .fc-button {
              padding: 0.25rem 0.5rem;
              font-size: 0.8rem;
            }

            .fc-timegrid-axis {
              font-size: 0.7rem;
            }

            .fc-timegrid-slot-label {
              font-size: 0.7rem;
            }

            .fc-daygrid-day-number {
              font-size: 0.8rem;
            }

            .fc-event-title {
              font-size: 0.7rem;
            }

            .fc-col-header-cell-cushion {
              font-size: 0.7rem;
            }
            
            .demo-event {
              background-color: #ef4444 !important; /* Tailwind red-500 */
              border-color: #ef4444 !important;
              color: white !important;
            }
          }
        `}</style>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="lg:text-lg text-base">Add new event details</DialogTitle>
          </DialogHeader>
          <form
            className="w-full px-5 space-y-4"
            onSubmit={handleAddEvent}
          >
            {/* Event type dropdown */}
            <div className="flex flex-col gap-2">
            <Label>Event Type</Label>

            <Select onValueChange={(value) => setEventType(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Events" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="demo">Demo Class</SelectItem>
                <SelectItem value="normal">Normal Class</SelectItem>
              </SelectContent>
            </Select>
            </div>
            
            {/* Event title text input field */}
            <div className="flex flex-col gap-2">
            <Label>Event Title</Label>

            <Input
              type="text"
              placeholder="Monty - Java B10"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              required
            />
            </div>
            
            <Button type="submit">Add</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Calender;
