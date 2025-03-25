'use client'

import React, { useState } from "react";

import { tabs } from "@/data/dataStorage";
import Link from "next/link";
import { cn } from "@/lib/utils";
import CardViewDemo from "./CardViewDemo";
import TableViewDemo from "./TableViewDemo";

const HeroSection = () => {
    const [activeTab, setActivetab] = useState("apply")

    // Handle render components
    const renderComponents = ()=>{
        switch(activeTab){
            case "past":
                return <TableViewDemo />
            case "apply":
                return <CardViewDemo />
            default:
                return <CardViewDemo />
        }
    }

  return (
    <>
    <div className="w-full border-b border-gray-200">
      <div className="flex gap-2">
        {tabs.map((item) => (
          <Link
            key={item.id}
            onClick={()=>setActivetab(item.id)}
            href={"#"}
            className={cn("py-3 px-1 text-sm text-gray-700 hover:text-gray-900 hover:border-gray-300",
                activeTab === item.id && "text-lime-600 border-b border-lime-600 font-semibold transition-opacity duration-150 delay-75"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
    <div>
        {renderComponents()}
    </div>
    </>
  );
};

export default HeroSection;
