"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  formatDate,
  DateSelectArg,
  EventClickArg,
  // EventApi,
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
import { getUserSession } from "@/lib/session";
import axios, { AxiosError } from "axios";
import { EventUrl } from "@/constants";
import { toast } from "@/hooks/use-toast";
import useSWR from "swr";
import { eventsType } from "@/types/Types";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Calender = () => {
  const { data, mutate } = useSWR<eventsType[]>(EventUrl, fetcher);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);

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
      if (
        user.role === "teacher" &&
        event.extendedProps?.createdBy !== user.name
      )
        return false;
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
  const handleEventClick = async (selected: EventClickArg) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event "${selected.event.title}"?`
      )
    ) {
      selected.event.remove();
      // try {
      //   const res = await axios.delete(`${EventUrl}/${eventId}`)
      //   console.log(res.data);

      //   const {message} = res.data;
      //   toast({title: "Success✅", description: message, variant: "default"});

      // } catch (error:unknown) {
      //   if(error instanceof AxiosError){
      //     console.error(error);

      //     const {message} = error.response?.data;
      //     toast({ title: "Failed", description: message, variant:"destructive" })
      //   }
      // }
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
          },
        };

        const res = await axios.post(EventUrl, newEvent);
        console.log(res.data);

        const { message } = res.data;

        calendarApi.addEvent(newEvent);
        // Instantly update the latest event list
        mutate();
        HandleCloseDialog();

        toast({ title: "Success✅", description: message, variant: "default" });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);

        const { message } = error.response?.data;
        toast({
          title: "Failed",
          description: message,
          variant: "destructive",
        });
      }
    }
  };

  // Handle edge cases
  //  if (data?.length === 0) return <div>Empty list for Events</div>;
  //  if (error instanceof AxiosError){
  //    const {message} = error.response?.data
  //    return <div>{message || 'An unknown error has occurred.'}</div>;
  //  }
  //  if (isLoading) return <div>Loading...</div>;
  //  if (isValidating) return <div>Refershing data...</div>;

  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1 w-full px-5 justify-start items-start gap-5">
        <div className="w-full">
          <div className="py-2 lg:text-4xl text-xl font-extrabold text-center">
            Calender Events
          </div>
          <ul className="space-y-4">
            {filteredData.length === 0 && (
              <div
                className="italic text-center text-sm"
                style={{ color: "gray" }}
              >
                No Events Present
              </div>
            )}
            {filteredData.length > 0 &&
              filteredData.map((event: eventsType) => (
                <li
                  className="border border-gray-200 shadow-none px-4 py-2 rounded-md text-blue-800"
                  key={event.id}
                >
                  <p>{event.extendedProps?.createdBy}</p>
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
            events={filteredData}
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
