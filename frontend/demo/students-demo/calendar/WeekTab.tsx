import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { upcomingEvents } from "./CalendarData";
import { TCalendarType } from "@/types/Types";

const WeekTab = ({ getEventTypeIcon, getStatusColor }: TCalendarType) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="text-xl text-gray-800">
            This Week&apos;s Events
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-purple-200 hover:bg-purple-50 bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-gray-700 px-3">
              March 15-21, 2024
            </span>
            <Button
              variant="outline"
              size="sm"
              className="border-purple-200 hover:bg-purple-50 bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 sm:space-y-6">
          {upcomingEvents.map((day, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-3">
                {day.date}
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {day.events.map((event) => (
                  <div
                    key={event.id}
                    className="p-3 sm:p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div
                          className={`w-8 h-8 bg-${event.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}
                        >
                          {getEventTypeIcon(event.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                            {event.title}
                          </h4>
                          <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-4 text-xs sm:text-sm text-gray-600">
                            <span>{event.time}</span>
                            <span className="truncate">{event.location}</span>
                            <span>{event.instructor}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        className={`text-xs ${getStatusColor(
                          event.status
                        )} flex-shrink-0`}
                      >
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeekTab;
