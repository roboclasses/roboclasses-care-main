import StudentHeader from "@/demo/students-demo/StudentHeader";
import React, { ReactNode } from "react";


interface ILayoutType {
  children: ReactNode;
}

export default function LayoutStudent({ children }: ILayoutType){
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header section with a profile image */}
      <StudentHeader />
      {children}
    </div>
  );
};

