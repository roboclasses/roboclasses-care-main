import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "./Header"
import Syllabus from "./Syllabus"
import Lecture from "./Lecture"
import Assignments from "./Assignments"
import Discussions from "./Discussions"
import Grades from "./Grades"
import InstructorDemo from "./InstructorDemo"
import UpcomingDeadlinesDemo from "../assessments-and-assignments/UpcomingDeadlinesDemo"
import CourseResources from "./CourseResources"

const TabsData = [{
  id:1,
  value:"syllabus",
  name:"Syllabus",
},
{
  id:2,
  value:"lectures",
  name:"Lectures",
},
{
  id:3,
  value:"assignments",
  name:"Assignments",
},
{
  id:4,
  value:"discussions",
  name:"Discussions",
},
{
  id:5,
  value:"grades",
  name:"Grades",
},]

export function CourseDetailsDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="syllabus" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                {TabsData.map((item)=>(
                  <TabsTrigger key={item.id} value={item.value}>{item.name}</TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="syllabus">
               <Syllabus />
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
  )
}
