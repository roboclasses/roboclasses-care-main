"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, PlusCircle } from "lucide-react"
import { weekDays } from "@/data/dataStorage"

export type DayTimeEntry = {
  day: string
  time: string
}

type DayTimePickerProps = {
  onEntriesChange?: (entries: DayTimeEntry[]) => void // Make the callback optional
}


export default function MultiDayTimeEntry({ onEntriesChange }: DayTimePickerProps) {
  const [entries, setEntries] = useState<DayTimeEntry[]>([])

  const updateParent = (newEntries: DayTimeEntry[]) => {
    if (onEntriesChange) {
      onEntriesChange(newEntries)
    }
  }

  const addEntry = () => {
    const newEntries = [...entries, { day: "", time: "" }]
    setEntries(newEntries)
    updateParent(newEntries)
  }

  const removeEntry = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index)
    setEntries(newEntries)
    updateParent(newEntries)
  }

  const updateEntry = (index: number, field: keyof DayTimeEntry, value: string) => {
    const newEntries = [...entries]
    newEntries[index][field] = value
    setEntries(newEntries)
    updateParent(newEntries)
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
            <div className="space-y-2">
              <Label htmlFor={`day-${index}`}>Day</Label>
              <Select value={entry.day} onValueChange={(value) => updateEntry(index, "day", value)}>
                <SelectTrigger id={`day-${index}`} className="w-full">
                  <SelectValue placeholder="Select a day" />
                </SelectTrigger>
                <SelectContent>
                  {weekDays.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
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
        <PlusCircle className="h-4 w-4 mr-2" /> Add Day and Time
      </Button>
    </div>
  )
}

