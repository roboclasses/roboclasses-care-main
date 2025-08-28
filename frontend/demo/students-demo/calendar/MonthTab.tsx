import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { calendarEvents } from "./CalendarData";

const MonthTab = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="text-xl text-gray-800">March 2024</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-purple-200 hover:bg-purple-50 bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-purple-200 hover:bg-purple-50 bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 ml-2"
            >
              Today
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="p-2 text-center text-xs sm:text-sm font-semibold text-gray-600"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {Array.from({ length: 35 }, (_, i) => {
            const date = i - 6 + 1;
            const hasEvents = calendarEvents.find((e) => e.date === date);
            const isToday = date === 15;
            const isCurrentMonth = date > 0 && date <= 31;

            return (
              <div
                key={i}
                className={`aspect-square p-1 sm:p-2 border border-purple-100 rounded-lg text-center cursor-pointer transition-colors ${
                  isCurrentMonth
                    ? isToday
                      ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white"
                      : hasEvents
                      ? "bg-purple-50 hover:bg-purple-100"
                      : "hover:bg-purple-50"
                    : "text-gray-300"
                }`}
              >
                <div className="text-xs sm:text-sm font-medium">
                  {isCurrentMonth ? date : ""}
                </div>
                {hasEvents && isCurrentMonth && (
                  <div className="flex justify-center mt-1">
                    <div
                      className={`w-1 h-1 sm:w-2 sm:h-2 rounded-full ${
                        hasEvents.type === "exam"
                          ? "bg-orange-500"
                          : hasEvents.type === "deadline"
                          ? "bg-red-500"
                          : hasEvents.type === "lecture"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthTab;
