import { Button } from "@/components/ui/button";
import { Settings, CheckCircle } from "lucide-react";

const colorMap : Record<string, string> = {
  red: "bg-gradient-to-r from-red-500 to-red-600",
  orange: "bg-gradient-to-r from-orange-500 to-orange-600",
  blue: "bg-gradient-to-r from-blue-500 to-blue-600",
  green: "bg-gradient-to-r from-green-500 to-green-600",
}

const Data = [{
  id:1, 
  count: "2",
  name: "Urgent",
  color:"red",
},
{
  id:2, 
  count: "3",
  name: "Unread",
  color:"orange",
},
{
  id:3, 
  count: "4",
  name: "Course Updates",
  color:"blue",
},
{
  id:4, 
  count: "6",
  name: "Total Today",
  color:"green",
},]

const Header = () => {
  return (
    <div className="bg-custom-gradient backdrop-blur-sm rounded-xl shadow-lg mb-4 sm:mb-6 p-4 sm:p-6 border border-purple-100">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Announcements & News
            </h1>
            <p className="text-sm sm:text-base text-purple-100">
              Stay informed with the latest school-wide announcements and course
              updates
            </p>
          </div>
          <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/50 border-purple-200 hover:bg-purple-50 text-xs sm:text-sm"
            >
              <Settings className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Preferences</span>
              <span className="xs:hidden">Settings</span>
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-xs sm:text-sm"
            >
              <CheckCircle className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Mark All Read</span>
              <span className="xs:hidden">Mark Read</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {Data.map((item)=>(
              <div key={item.id} className={`${colorMap[item.color]} text-white p-3 rounded-lg text-center`}>
            <div className="text-lg sm:text-xl font-bold">{item.count}</div>
            <div className="text-xs sm:text-sm opacity-90">{item.name}</div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
