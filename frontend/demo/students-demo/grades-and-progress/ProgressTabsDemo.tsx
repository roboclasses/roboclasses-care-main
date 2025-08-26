import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GradeSummaryDemo from "./GradeSummaryDemo";
import CoursesOverview from "./CoursesOverview";
import ProgressOverView from "./ProgressOverView";
import FeedbackOverview from "./FeedbackOverview";

const ProgressTabsDemo = () => {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4 text-xs sm:text-sm">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="courses">Courses</TabsTrigger>
        <TabsTrigger value="progress">Progress</TabsTrigger>
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <GradeSummaryDemo />
      </TabsContent>

      <TabsContent value="courses">
        <CoursesOverview />
      </TabsContent>

      <TabsContent value="progress">
        <ProgressOverView />
      </TabsContent>

      <TabsContent value="feedback">
        <FeedbackOverview />
      </TabsContent>
    </Tabs>
  );
};

export default ProgressTabsDemo;
