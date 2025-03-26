import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Filter } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function FilterTimeOffDemo() {
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
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Types</SelectLabel>
                <SelectItem value="Normal Leave">Normal Leave</SelectItem>
                <SelectItem value="Sick Leave">Sick Leave</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

         {/* Filter by status */}
        <div>
          <Label className="font-semibold">Filter by status</Label>
          <Select>
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
          <Input type="date" />
        </div>

        <Button type="button" className="w-full" >Apply</Button>
      </PopoverContent>
    </Popover>
  );
}
