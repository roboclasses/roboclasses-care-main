import PerformanceOverview from "./PerformanceOverview";
import ProgressTabsDemo from "./ProgressTabsDemo";
import AcademicGoalsDemo from "./AcademicGoalsDemo";
import GradeNotificationsDemo from "./GradeNotificationsDemo";
import QuickActionDemo from "../assessments-and-assignments/QuickActionDemo";
import RecentActivityDemo from "../assessments-and-assignments/RecentActivityDemo";

export function ProgressDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        <PerformanceOverview />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <ProgressTabsDemo />
            </div>
          </div>

          <div className="space-y-6">
            <AcademicGoalsDemo />
            <GradeNotificationsDemo />
            <QuickActionDemo />
            <RecentActivityDemo />
          </div>
        </div>
      </div>
    </div>
  );
}
