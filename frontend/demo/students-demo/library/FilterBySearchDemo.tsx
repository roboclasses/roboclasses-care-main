"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Grid, List } from "lucide-react";
import { useState } from "react";

const FilterBySearchDemo = ({viewMode, setViewMode}:{viewMode:string, setViewMode: (item:string)=>void}) => {
const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="bg-white rounded-lg shadow-sm mb-4 sm:mb-6 p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent flex-1 sm:flex-none min-h-[40px]"
          >
            <Filter className="h-4 w-4 mr-2" />
            <span className="hidden xs:inline">Filter</span>
          </Button>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={`min-h-[40px] px-3 ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600"
                  : ""
              }`}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={`min-h-[40px] px-3 ${
                viewMode === "list"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600"
                  : ""
              }`}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBySearchDemo;
