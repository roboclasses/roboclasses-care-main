"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, PlusCircle } from "lucide-react"

export type DateTimeEntry = {
  date: string
  time: string
}

type DateTimePickerProps = {
  onEntriesChange: (entries: DateTimeEntry[]) => void // Callback to pass entries to the parent
}

export default function MultiDateTimeEntry({ onEntriesChange }: DateTimePickerProps) {
  const [entries, setEntries] = useState<DateTimeEntry[]>([])

  const addEntry = () => {
    const newEntries = [...entries, { date: "", time: "" }]
    setEntries(newEntries)
    onEntriesChange(newEntries) // Notify parent of changes
  }

  const removeEntry = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index)
    setEntries(newEntries)
    onEntriesChange(newEntries) // Notify parent of changes
  }

  const updateEntry = (index: number, field: keyof DateTimeEntry, value: string) => {
    const newEntries = [...entries]
    newEntries[index][field] = value
    setEntries(newEntries)
    onEntriesChange(newEntries) // Notify parent of changes
  }

  return (
    <div className="space-y-6">
      {entries.map((entry, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Entry {index + 1}</h3>
            <Button type="button" variant="destructive" size="icon" onClick={() => removeEntry(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`date-${index}`}>Date</Label>
              <Input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                id={`date-${index}`}
                value={entry.date}
                onChange={(e) => updateEntry(index, "date", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor={`time-${index}`}>Time</Label>
              <Input
                type="time"
                id={`time-${index}`}
                value={entry.time}
                onChange={(e) => updateEntry(index, "time", e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
      <Button type="button" onClick={addEntry} className="w-full">
        <PlusCircle className="h-4 w-4 mr-2" /> Add Date and Time
      </Button>
    </div>
  )
}