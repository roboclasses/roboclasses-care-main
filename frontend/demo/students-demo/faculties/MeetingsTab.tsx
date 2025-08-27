"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Video, Plus, Calendar, Clock, User } from "lucide-react";
import { virtualMeetings } from "./FacutiesData";

const MeetingsTab = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="text-lg sm:text-xl">Virtual Meetings</CardTitle>
          <Button
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-indigo-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-4">
          {virtualMeetings.map((meeting) => (
            <Card key={meeting.id} className="border">
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-sm sm:text-base">
                        {meeting.title}
                      </h3>
                      {meeting.status === "live" && (
                        <Badge className="bg-red-500 text-white text-xs animate-pulse">
                          LIVE
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      <span>{meeting.instructor}</span>
                      <span>•</span>
                      <Clock className="h-4 w-4" />
                      <span>{meeting.time}</span>
                      <span>•</span>
                      <Users className="h-4 w-4" />
                      <span>{meeting.participants} participants</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {meeting.status === "live" ? (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Join Now
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 sm:flex-none bg-transparent"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Add to Calendar
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingsTab;
