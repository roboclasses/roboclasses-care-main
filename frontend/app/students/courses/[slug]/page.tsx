import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoursesUrl } from "@/constants";
import UpcomingDeadlinesDemo from "@/demo/students-demo/assessments-and-assignments/UpcomingDeadlinesDemo";
import Assignments from "@/demo/students-demo/course-details/Assignments";
import CourseResources from "@/demo/students-demo/course-details/CourseResources";
import Discussions from "@/demo/students-demo/course-details/Discussions";
import Grades from "@/demo/students-demo/course-details/Grades";
import Header from "@/demo/students-demo/course-details/Header";
import InstructorDemo from "@/demo/students-demo/course-details/InstructorDemo";
import Lecture from "@/demo/students-demo/course-details/Lecture";
import Syllabus from "@/demo/students-demo/course-details/Syllabus";
import { courseType } from "@/types/Types";

const TabsData = [
  {
    id: 1,
    value: "syllabus",
    name: "Syllabus",
  },
  {
    id: 2,
    value: "lectures",
    name: "Lectures",
  },
  {
    id: 3,
    value: "assignments",
    name: "Assignments",
  },
  {
    id: 4,
    value: "discussions",
    name: "Discussions",
  },
  {
    id: 5,
    value: "grades",
    name: "Grades",
  },
];

const page = async({params}:{params:{slug:string}}) => {
  const {slug} = await params;
  const response = await fetch(CoursesUrl);
  const Course : courseType[] = await response.json();
  const selectedCourse = Course.find((item:courseType)=>item.course.trim().toLowerCase() === slug.trim().toLowerCase());

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="syllabus" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                {TabsData.map((item) => (
                  <TabsTrigger key={item.id} value={item.value}>
                    {item.name} 
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="syllabus">
                {selectedCourse?.syllabus && (<Syllabus items={selectedCourse?.syllabus}/>)}
              </TabsContent>

              <TabsContent value="lectures">
                <Lecture />
              </TabsContent>

              <TabsContent value="assignments">
                <Assignments />
              </TabsContent>

              <TabsContent value="discussions">
                <Discussions />
              </TabsContent>

              <TabsContent value="grades">
                <Grades />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <InstructorDemo />

            <UpcomingDeadlinesDemo />

            <CourseResources />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
