import WelcomeBanner from "./WelcomeBanner";
import QuickLinksDemo from "./QuickLinksDemo";
import EnrolledCoursesDemo from "./EnrolledCoursesDemo";
import UpcomingClassesDemo from "./UpcomingClassesDemo";
import RecentAnnouncements from "./RecentAnnouncements";
import NotificationPanel from "./NotificationPanel";

export function StudentDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <WelcomeBanner />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Links Section */}
          <QuickLinksDemo />

          {/* Enrolled Courses Section */}
          <EnrolledCoursesDemo />

          {/* Upcoming Classes & Deadlines Section */}
          <UpcomingClassesDemo />
        </div>

        {/* Right Column - Sidebar Content */}
        <div className="space-y-8">
          {/* Recent Announcements Section */}
          <RecentAnnouncements />

          {/* Notifications Panel Section */}
          <NotificationPanel />
        </div>
      </div>
    </div>
  );
}
