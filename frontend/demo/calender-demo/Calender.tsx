"use client";

import React, { useState, useEffect } from "react";
import {
  formatDate,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from "@fullcalendar/core";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Calender = () => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);

  // Get events from localstorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEvents = localStorage.getItem("events");
      if (savedEvents) {
        setCurrentEvents(JSON.parse(savedEvents));
      }
    }
  }, []);

  // set events in localstorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(currentEvents));
    }
  }, [currentEvents]);

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
  const handleEventClick = (selected: EventClickArg) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event "${selected.event.title}"?`
      )
    ) {
      selected.event.remove();
    }
  };

  // handle add events
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle && selectedDate) {
      const calendarApi = selectedDate.view.calendar;
      calendarApi.unselect();

      const newEvent = {
        id: `${selectedDate?.start.toISOString()}-${newEventTitle}`,
        title: newEventTitle,
        start: selectedDate?.start,
        end: selectedDate?.end,
        allDay: selectedDate?.allDay,
      };

      calendarApi.addEvent(newEvent);
      HandleCloseDialog();
    }
  };

  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1 w-full px-5 justify-start items-start gap-5">
        <div className="w-full">
          <div className="py-2 lg:text-4xl text-xl font-extrabold text-center">
            Calender Events
          </div>
          <ul className="space-y-4">
            {currentEvents.length === 0 && (
              <div className="italic text-center text-sm" style={{color:"gray"}}>
                No Events Present
              </div>
            )}
            {currentEvents.length > 0 &&
              currentEvents.map((event: EventApi) => (
                <li
                  className="border border-gray-200 shadow-none px-4 py-2 rounded-md text-blue-800"
                  key={event.id}
                >
                  <p>{event.title}</p>
                  <label className="text-slate-950">
                    {formatDate(event.start!, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </label>
                </li>
              ))}
          </ul>
        </div>
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
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={
              typeof window !== "undefined"
                ? JSON.parse(localStorage.getItem("events") || "[]")
                : []
            }
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
                dayHeaderFormat: { weekday: "short", day: "numeric" },
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
          }
        `}</style>
        
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new event details</DialogTitle>
          </DialogHeader>
          <form className="flex items-center gap-2" onSubmit={handleAddEvent}>
            <Input
              type="text"
              placeholder="Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              required
              className="border border-gray-200 p-3 rounded-md text-lg"
            />
            <Button type="submit">Add</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Calender;
