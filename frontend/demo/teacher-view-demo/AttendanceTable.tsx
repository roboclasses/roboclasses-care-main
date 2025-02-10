'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import axios from 'axios'
import { toast } from '@/hooks/use-toast'
import { EditButton } from '../admin-dashboard/EditButton'

import useSWR from "swr"
import Link from 'next/link'
import { AttendanceUrl } from '@/constants'

type Column = {
  id: string
  name: string
  type: 'date' | 'batch' | 'class' | 'assessment'
}

type Row = {
  id: string
  cells: { [key: string]: string }
}

const fetcher = (url:string)=>axios.get(url).then(res=>res.data)

export default function AttendanceTable() {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'startDate', name: 'Start Date', type: 'date', },
    { id: 'batchName', name: 'Batch Name', type: 'batch' },
    { id: 'class1', name: 'Class 1', type: 'class' },
    // { id: 'assessment1', name: 'Assessment', type: 'assessment' },
  ])

  const [rows, setRows] = useState<Row[]>([
    { id: '1', cells: {} }
  ])

 

  const addColumn = (type: 'class' | 'assessment') => {
    if (columns.length >= 60) {
      alert('Maximum limit of 60 columns reached')
      return
    }

    const count = columns.filter(col => col.type === type).length + 1
    const newColumn: Column = {
      id: `${type}${count}`,
      name: type === 'assessment' ? 'Assessment' : `${type.charAt(0).toUpperCase() + type.slice(1)} ${count}`,
      type: type
    }

    setColumns([...columns, newColumn])
  }

  const handleAddClass = () => addColumn('class')

  const handleAddAssessment = () => addColumn('assessment')

  const handleAddRow = () => {
    const newRow: Row = {
      id: (rows.length + 1).toString(),
      cells: {}
    }
    setRows([...rows, newRow])
  }

  const handleInputChange = (rowId: string, columnId: string, value: string) => {
    setRows(rows.map(row => 
      row.id === rowId 
        ? { ...row, cells: { ...row.cells, [columnId]: value } }
        : row
    ))
  }

  const { data, isLoading, isValidating, error, mutate } = useSWR(AttendanceUrl,fetcher);

  
  // handle form submit
  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();

    const formData = {
      rows:rows,
      columns:columns
    }
    try {
      const res = await axios.post(AttendanceUrl,formData)
      console.log(res.data);
      mutate();
      const {message} = res.data
      toast({title:"Success✅",description:message, variant:"default"})
    } catch (error) {
      console.error(error);
      toast({title:"Failed",description:"unable to submit data!", variant:"destructive"})

    }
  }


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Data fetching error!</div>;
  if (isValidating) return <div>Refreshing...</div>;
  // if (data?.length === 0) return <div>Empty list for Batches.</div>;


  return (
    <div className="container mx-auto p-4 space-y-10">
      <div className="flex items-center gap-2">
        <Button onClick={handleAddClass}>Add Class</Button>
        <Button onClick={handleAddAssessment}>Add Assessment</Button>
        <Button onClick={handleAddRow}>Add Row</Button>
      </div>
      <form className="overflow-x-auto" onSubmit={handleSubmit}>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id}>{column.name}</TableHead>
              ))}
              
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={`${row.id}-${column.id}`}>
                    <Input 
                      type="text" 
                      placeholder={`Enter ${column.name}`}
                      value={row.cells[column.id] || ''}
                      onChange={(e) => handleInputChange(row.id, column.id, e.target.value)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button type='submit'>Save</Button>
      </form>
      <form>
      <Table className="border border-black">
        <TableCaption>A list of attendances</TableCaption>
        <TableHeader>
          <TableRow>
           {data[0]?.columns.map((column:any)=>(
            <TableHead className="w-[100px]" key={column.id}>{column.name}</TableHead>
           )) }
          </TableRow>
        </TableHeader>
        <TableBody>
        {data.map((record: any) => (
          <TableRow key={record._id}>
            {record.rows.map((row: any) => (
              <React.Fragment key={row.id}>
                {record.columns.map((column: any) => (
                  <TableCell key={column.id}>{row.cells[column.id]}</TableCell>
                ))}
              </React.Fragment>
            ))}
             <TableCell className="text-right">
              <Link href={`/teacherView/edit/${record._id}`}>
              <EditButton name="Edit" type="button" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>Total Rows</TableCell>
            <TableCell className="text-right">{data?.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      </form>
    </div>
  )
}

