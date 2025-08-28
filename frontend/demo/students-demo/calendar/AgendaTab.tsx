import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Download, Share } from "lucide-react";
import { todayEvents, upcomingEvents } from "./CalendarData";
import { TCalendarType } from "@/types/Types";

const AgendaTab = ({getEventTypeIcon, getStatusColor}:TCalendarType) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">
          Upcoming Events Agenda
        </CardTitle>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search agenda..."
              className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-purple-200 hover:bg-purple-50 bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-purple-200 hover:bg-purple-50 bg-transparent"
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...todayEvents, ...upcomingEvents.flatMap((day) => day.events)].map(
            (event) => (
              <div
                key={event.id}
                className="flex flex-col sm:flex-row gap-3 p-3 sm:p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className={`w-10 h-10 bg-${
                      event.color || "purple"
                    }-100 rounded-lg flex items-center justify-center flex-shrink-0`}
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
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${getStatusColor(event.status)}`}>
                    {event.status}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-200 hover:bg-purple-50 bg-transparent text-xs"
                  >
                    Details
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgendaTab;
