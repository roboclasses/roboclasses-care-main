"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Clock,
  MapPin,
  Users,
  Filter,
  Bell,
  Video,
  Eye,
} from "lucide-react";
import { todayEvents } from "./CalendarData";
import { TCalendarType } from "@/types/Types";

const TodayTab = ({getEventTypeIcon, getStatusColor}: TCalendarType) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="text-xl sm:text-2xl text-gray-800">
              Today&apos;s Schedule
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-purple-200 hover:bg-purple-50 bg-transparent text-xs sm:text-sm"
              >
                <Filter className="h-4 w-4 mr-1 sm:mr-2" />
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-200 hover:bg-purple-50 bg-transparent text-xs sm:text-sm"
              >
                <Eye className="h-4 w-4 mr-1 sm:mr-2" />
                View
              </Button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {todayEvents.map((event) => (
              <div
                key={event.id}
                className="p-3 sm:p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col xs:flex-row xs:items-center gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-8 h-8 bg-${event.color}-100 rounded-lg flex items-center justify-center`}
                          >
                            {getEventTypeIcon(event.type)}
                          </div>
                          <h3 className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                            {event.title}
                          </h3>
                        </div>
                        <Badge
                          className={`text-xs ${getStatusColor(event.status)}`}
                        >
                          {event.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-1 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1 xs:col-span-2">
                          <Users className="h-3 w-3" />
                          <span>{event.instructor}</span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {event.description}
                      </p>
                    </div>
                    <div className="flex flex-row xs:flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-200 hover:bg-purple-50 bg-transparent text-xs flex-1 xs:flex-none"
                      >
                        <Video className="h-3 w-3 mr-1" />
                        Join
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-200 hover:bg-purple-50 bg-transparent text-xs flex-1 xs:flex-none"
                      >
                        <Bell className="h-3 w-3 mr-1" />
                        Remind
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodayTab;
