'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

import { AttendanceUrl } from '@/constants'
import { toast } from '@/hooks/use-toast'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'

const EditAttendanceTable = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(`${AttendanceUrl}/${id}`)
        if (res.data && res.data.columns && res.data.rows) {
          setColumns(res.data.columns)
          setRows(res.data.rows)
          toast({
            title: 'Success✅',
            description: 'Data loaded successfully',
            variant: 'default',
          })
        } else {
          throw new Error('Invalid data structure received')
        }
      } catch (error) {
        console.error(error)
        toast({
          title: 'Error',
          description: 'Unable to fetch data',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [id])

  const handleInputChange = (rowId, columnId, value) => {
    setRows(
      rows.map((row) =>
        row.id === rowId ? { ...row, cells: { ...row.cells, [columnId]: value } } : row
      )
    )
  }

  const addColumn = (type) => {
    if (columns.length >= 60) {
      toast({
        title: 'Error',
        description: 'Maximum limit of 60 columns reached',
        variant: 'destructive',
      })
      return
    }

    const count = columns.filter((col) => col.type === type).length + 1
    const newColumn = {
      id: `${type}${count}`,
      name:
        type === 'assessment'
          ? 'Assessment'
          : `${type.charAt(0).toUpperCase() + type.slice(1)} ${count}`,
      type: type,
    }

    setColumns([...columns, newColumn])
  }

  const handleAddClass = () => addColumn('class')
  const handleAddAssessment = () => addColumn('assessment')

  const handleAddRow = () => {
    const newRow = {
      id: (rows.length + 1).toString(),
      cells: {},
    }
    setRows([...rows, newRow])
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${AttendanceUrl}/${id}`, { columns, rows })
      toast({
        title: 'Success✅',
        description: 'Data updated successfully',
        variant: 'default',
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Failed to update data',
        variant: 'destructive',
      })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
  <main className="p-10">
   <form onSubmit={handleUpdate} className="w-[1200px] space-y-2">
    <div className='flex justify-between items-center'>
      <div className="flex items-center gap-2">
        <Button onClick={handleAddClass}>Add Class</Button>
        <Button onClick={handleAddAssessment}>Add Assessment</Button>
        <Button onClick={handleAddRow}>Add Row</Button>
      </div>
      <Button type="submit">Update</Button>
    </div>
    <Table>
          <TableBody>
            {rows.map((row) => (
              <React.Fragment key={row.id}>
                {/* Start Date and Batch Name in the same row */}
                <TableRow>
                  <TableCell>
                    <Input
                      type="text"
                      placeholder="Start Date"
                      value={row.cells['startDate'] || ''}
                      onChange={(e) =>
                        handleInputChange(row.id, 'startDate', e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      placeholder="Batch Name"
                      value={row.cells['batchName'] || ''}
                      onChange={(e) =>
                        handleInputChange(row.id, 'batchName', e.target.value)
                      }
                    />
                  </TableCell>
                </TableRow>
                {/* Classes in a column format (one class per row) */}
                {columns
                  .filter((col) => col.type === 'class')
                  .map((column) => (
                    <TableRow key={`${row.id}-${column.id}`}>
                      <TableCell colSpan={2}>
                        <Input
                          type="text"
                          placeholder={column.name}
                          value={row.cells[column.id] || ''}
                          onChange={(e) =>
                            handleInputChange(row.id, column.id, e.target.value)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </React.Fragment>
            ))}
          </TableBody>
    </Table>
    </form>
    </main>
  )
}

export default EditAttendanceTable