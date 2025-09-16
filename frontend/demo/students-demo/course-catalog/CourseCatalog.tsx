
import CoursesFilterDemo from "./CoursesFilterDemo";
import EnrolledCoursesDemo from "./EnrolledCoursesDemo"
import AvailableCoursesDemo from "./AvailableCoursesDemo";
import CourseUpdatesDemo from "./CourseUpdatesDemo";
import CourseNotificationDemo from "./CourseNotificationDemo";

export function CourseCatalog() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        {/* Courses filter section  */}
        <CoursesFilterDemo />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <EnrolledCoursesDemo />

            <AvailableCoursesDemo />
          </div>

          {/* Right Column - Sidebar Content */}
          <div className="space-y-8">
            <CourseUpdatesDemo />
            <CourseNotificationDemo />
          </div>
        </div>
      </div>
    </div>
  );
}
