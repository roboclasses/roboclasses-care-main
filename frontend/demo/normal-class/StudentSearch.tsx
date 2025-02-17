'use client'
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { students } from '@/data/dataStorage';
import { studentSearchType} from '@/types/Types';
import React, { useState } from 'react'

const StudentSearch = ({onSelect, selectedStudent}:studentSearchType) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = students.filter((student)=>student.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()))

  return (
    <div className="w-full">
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {selectedStudent ? selectedStudent.name : "Select student..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search student..." value={searchQuery} onValueChange={setSearchQuery} />
          <CommandList>
            <CommandEmpty>No student found.</CommandEmpty>
            <CommandGroup>
              {filteredStudents.map((student) => (
                <CommandItem
                  key={student.id}
                  onSelect={() => {
                    onSelect(student);
                    setOpen(false);
                  }}
                >
                  <ScrollArea>
                    {student.name}
                  </ScrollArea>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    <Input type="hidden" name="selectedStudentId" value={selectedStudent?.id ?? ""} />
  </div>
  )
}

export default StudentSearch