import AssignmentOverviewDemo from "./AssignmentOverviewDemo"
import SearchAndFilterBarDemo from "./SearchAndFilterBarDemo"
import AssignmentTabsDemo from "./AssignmentTabsDemo"
import UpcomingDeadlinesDemo from "./UpcomingDeadlinesDemo"
import GradeSummaryDemo from "./GradeSummaryDemo"
import QuickActionDemo from "./QuickActionDemo"
import RecentActivityDemo from "./RecentActivityDemo"

export function SubmissionDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">

        <AssignmentOverviewDemo  />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Search and Filter Bar */}
                <SearchAndFilterBarDemo />

              {/* Assignment Tabs */}
                <AssignmentTabsDemo />
            </div>
          </div>

          <div className="space-y-6">
            <UpcomingDeadlinesDemo />
            <GradeSummaryDemo />
            <QuickActionDemo />
            <RecentActivityDemo />
          </div>
        </div>
      </div>
    </div>
  )
}
