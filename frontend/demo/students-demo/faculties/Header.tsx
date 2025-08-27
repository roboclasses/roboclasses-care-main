import { Button } from "@/components/ui/button";
import { Bell, Settings } from "lucide-react";

const Header = () => {
  return (
    <div className="bg-custom-gradient rounded-lg shadow-sm mb-4 sm:mb-6 p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            Communication & Collaboration
          </h1>
          <p className="text-sm sm:text-base text-purple-100 mt-1">
            Connect with peers and faculty
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none bg-white"
          >
            <Bell className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Notifications</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none bg-white"
          >
            <Settings className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
