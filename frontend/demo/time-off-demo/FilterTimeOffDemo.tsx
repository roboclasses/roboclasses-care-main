'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Filter } from "lucide-react";
import { useState } from "react";


interface filterLeavesType{
  onFilterLeaves: (filters:{type: string; status: string; fromDate:string})=>void;
}

export function FilterTimeOffDemo({onFilterLeaves}:filterLeavesType) {
const [type, setType] = useState("");
const [status, setStatus] = useState("");
const [fromDate, setFromDate] = useState("");

const handleApplyFilters = ()=>{
  onFilterLeaves({type, status, fromDate})
}

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="rounded-full shadow-none">
          <Filter />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 space-y-4">

        {/* Filter by type */}
        <div>
          <Label className="font-semibold">Filter by type</Label>
          <Select onValueChange={setType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Types</SelectLabel>
                <SelectItem value="Normal Leave">Normal Leave</SelectItem>
                <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                <SelectItem value="Half Day Leave">Half Day Leave</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

         {/* Filter by status */}
        <div>
          <Label className="font-semibold">Filter by status</Label>
          <Select onValueChange={setStatus}>
            <SelectTrigger className="w-full]">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="Requested">Requested</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Taken">Taken</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Filter by from date */}
        <div>
          <Label className="font-semibold">From date</Label>
          <Input type="date" value={fromDate} onChange={(e)=>setFromDate(e.target.value)}/>
        </div>

        <Button type="button" className="w-full" onClick={handleApplyFilters}>Apply</Button>
      </PopoverContent>
    </Popover>
  );
}
