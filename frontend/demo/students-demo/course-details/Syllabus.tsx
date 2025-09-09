import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Data = [
  {
    id: 1,
    objective: "Understand and apply object-oriented programming principles",
  },
  {
    id: 2,
    objective:
      "Design and implement classes, objects, and inheritance hierarchies",
  },
  {
    id: 3,
    objective: "Apply polymorphism and abstraction in software design",
  },
  {
    id: 4,
    objective: "Develop debugging and testing skills for OOP applications",
  },
];

const Syllabus = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Syllabus & Description</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Course Description</h3>
          <p className="text-gray-600">
            This course introduces students to the fundamental concepts of
            object-oriented programming including encapsulation, inheritance,
            polymorphism, and abstraction. Students will learn to design and
            implement object-oriented solutions using Java programming language.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Learning Objectives</h3>
          <ul className="space-y-2 text-gray-600">
            {Data.map((item) => (
              <li key={item.id} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                {item.objective}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Course Schedule</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Week 1-3: Introduction to OOP</p>
                <p className="text-sm text-gray-600">
                  Classes, Objects, and Basic Concepts
                </p>
              </div>
              <Badge variant="secondary">Completed</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div>
                <p className="font-medium">
                  Week 4-6: Inheritance & Polymorphism
                </p>
                <p className="text-sm text-gray-600">Advanced OOP Concepts</p>
              </div>
              <Badge className="bg-purple-600">Current</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Week 7-9: Design Patterns</p>
                <p className="text-sm text-gray-600">
                  Common OOP Design Patterns
                </p>
              </div>
              <Badge variant="outline">Upcoming</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Syllabus;
