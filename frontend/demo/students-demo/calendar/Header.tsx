import { Button } from "@/components/ui/button";
import { Plus, FolderSyncIcon as Sync } from "lucide-react";

const Header = () => {
  return (
    <div className="bg-custom-gradient backdrop-blur-sm rounded-xl shadow-lg mb-4 sm:mb-6 p-4 sm:p-6 border border-purple-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Calendar & Schedule
          </h1>
          <p className="text-sm sm:text-base text-purple-100">
            Keep track of classes, deadlines, exams, and important events
          </p>
        </div>
        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/50 border-purple-200 hover:bg-purple-50 text-xs sm:text-sm"
          >
            <Sync className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Sync Calendar</span>
            <span className="xs:hidden">Sync</span>
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-xs sm:text-sm"
          >
            <Plus className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Add Event</span>
            <span className="xs:hidden">Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
