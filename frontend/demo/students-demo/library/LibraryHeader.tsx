import { Button } from "@/components/ui/button";
import { Settings, Bell } from "lucide-react";

const LibraryHeader = () => {
  return (
    <div className="bg-custom-gradient rounded-lg shadow-sm mb-4 sm:mb-6 p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            Learning Resources & Library
          </h1>
          <p className="text-sm sm:text-base mt-1 text-purple-100">
            Access supplementary materials and resources
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Bell className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Notifications</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Settings className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LibraryHeader;
