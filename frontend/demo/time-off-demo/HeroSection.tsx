"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

import { tabs } from "@/data/dataStorage";

import CardViewDemo from "./CardViewDemo";
import TableViewDemo from "./TableViewDemo";


const HeroSection = () => {
  const [activeTab, setActivetab] = useState("apply");

  // Handle render components
  const renderComponents = () => {
    switch (activeTab) {
      case "past":
        return <TableViewDemo />;
      case "apply":
        return <CardViewDemo />;
      default:
        return <CardViewDemo />;
    }
  };

  return (
    <>
      <div className="w-full border-b border-gray-200">
        <div className="flex gap-2"> 
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivetab(item.id)}
              className={cn(
                "tab-item",
                activeTab === item.id && "tab-item-active"
              )}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div>{renderComponents()}</div>
    </>
  );
};

export default HeroSection;
