"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StudentRegUrl } from "@/constants";
import { studentSearchType, studentType } from "@/types/Types";
import axios from "axios";
import React, { useEffect, useState } from "react";

const StudentSearch = ({ onSelect, selectedStudent }: studentSearchType) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<studentType[]>([]);

  // Get students details
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(StudentRegUrl);
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    handleFetch();
  }, []);

  const filteredStudents = data.filter((student) =>
    student.studentName.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild title="Student Search">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-12 shadow-none rounded-xl bg-accent"
          >
            {selectedStudent
              ? selectedStudent.studentName
              : "Select student..."}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              title="Students"
              placeholder="Search student..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>No student found.</CommandEmpty>
              <CommandGroup>
                {filteredStudents.map((student) => (
                  <CommandItem
                    key={student._id}
                    onSelect={() => {
                      onSelect(student);
                      setOpen(false);
                    }}
                  >
                    <ScrollArea>{student.studentName}</ScrollArea>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        type="hidden"
        name="selectedStudentId"
        value={selectedStudent?._id ?? ""}
      />
    </div>
  );
};

export default StudentSearch;
