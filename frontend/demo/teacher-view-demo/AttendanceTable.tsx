'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from '@/hooks/use-toast'
import { EditButton } from '../admin-dashboard/EditButton'
import { AttendanceUrl, NewBatchEntryUrl } from '@/constants'
import axios from 'axios'
import useSWR from "swr"
import Link from 'next/link'
import Cookies from "js-cookie"
import { format } from 'date-fns'

interface dataType {
  startDate: string;
  batch: string;
  numberOfClasses: string;
}

type Column = {
  id: string
  name: string
  type: 'date' | 'batch' | 'class' | 'assessment'
}

type Row = {
  id: string
  cells: { [key: string]: string }
}

const fetcher = (url: string) => axios.get(url).then(res => res.data)

export default function AttendanceTable() {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'startDate', name: 'Start Date', type: 'date' },
    { id: 'batchName', name: 'Batch Name', type: 'batch' },
  ])

  const [rows, setRows] = useState<Row[]>([])

  const [batch, setBatch] = useState<dataType[]>([])

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

  // Fetch batches
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(NewBatchEntryUrl, { headers: { Authorization: Cookies.get("token") } })
        console.log(res.data);
        setBatch(res.data)

        // Generate rows and columns based on batch data
        const newRows: Row[] = res.data.map((batchItem: dataType, index: number) => {
          const row: Row = {
            id: (index + 1).toString(),
            cells: {
              startDate: batchItem.startDate ? format(batchItem.startDate, 'MMM dd, yyyy') : "",
              batchName: batchItem.batch,
            }
          }

          // Add class columns based on numberOfClasses
          for (let i = 1; i <= parseInt(batchItem.numberOfClasses); i++) {
            const classColumnId = `class${i}`
            row.cells[classColumnId] = ''
          }

          return row
        })

        // Generate class columns based on the maximum numberOfClasses
        const maxClasses = Math.max(...res.data.map((batchItem: dataType) => parseInt(batchItem.numberOfClasses)))
        const newColumns: Column[] = [
          { id: 'startDate', name: 'Start Date', type: 'date' },
          { id: 'batchName', name: 'Batch Name', type: 'batch' },
        ]

        for (let i = 1; i <= maxClasses; i++) {
          newColumns.push({ id: `class${i}`, name: `Class ${i}`, type: 'class' })
        }

        setColumns(newColumns)
        setRows(newRows)

      } catch (error) {
        console.error(error);
      }
    }
    handleFetch();
  }, [])

  const { data, isLoading, isValidating, error, mutate } = useSWR(AttendanceUrl, fetcher);

  // handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      rows: rows,
      columns: columns
    }
    try {
      const res = await axios.post(AttendanceUrl, formData)
      console.log(res.data);
      mutate();
      const { message } = res.data
      toast({ title: "Success✅", description: message, variant: "default" })
    } catch (error) {
      console.error(error);
      toast({ title: "Failed", description: "unable to submit data!", variant: "destructive" })

    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Data fetching error!</div>;
  if (isValidating) return <div>Refreshing...</div>;

  return (
    <div className="container mx-auto p-4 space-y-10">
      <div className="flex items-center gap-2">
        <Button onClick={handleAddClass}>Add Class</Button>
        <Button onClick={handleAddAssessment}>Add Assessment</Button>
        <Button onClick={handleAddRow}>Add Row</Button>
      </div>
      <form className="overflow-x-auto space-y-2 w-[1200px]" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 p-2">
          {rows.map((row) => (
            <div key={row.id} className="grid grid-cols-1 gap-2">
              {/* Start Date and Batch Name in a single row */}
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter Start Date"
                  value={row.cells['startDate'] || ''}
                  onChange={(e) => handleInputChange(row.id, 'startDate', e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Enter Batch Name"
                  value={row.cells['batchName'] || ''}
                  onChange={(e) => handleInputChange(row.id, 'batchName', e.target.value)}
                />
              </div>

              {/* Classes in a single column */}
              <div className="grid grid-cols-1 gap-2">
                {columns
                  .filter(col => col.type === 'class')
                  .map((column) => (
                    <Input
                      key={`${row.id}-${column.id}`}
                      type="text"
                      placeholder={`Enter ${column.name}`}
                      value={row.cells[column.id] || ''}
                      onChange={(e) => handleInputChange(row.id, column.id, e.target.value)}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
        <Button type='submit'>Save</Button>
      </form>
        <Table className="border border-black">
          <TableCaption>A list of attendances</TableCaption>
          <TableHeader>
            <TableRow>
              {data[0]?.columns.map((column: any) => (
                <TableHead className="w-[100px]" key={column.id}>{column.name}</TableHead>
              ))}
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
    </div>
  )
}