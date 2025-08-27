import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { onlineFaculty } from "./FacutiesData";

const OnlineFaculty = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg">Online Faculty</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {onlineFaculty.map((faculty, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`/assets/images/student-profile.png?height=32&width=32&query=faculty-${index}`}
                  />
                  <AvatarFallback>
                    {faculty.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                    faculty.status === "available"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                ></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-xs sm:text-sm truncate">
                  {faculty.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {faculty.department}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OnlineFaculty;
