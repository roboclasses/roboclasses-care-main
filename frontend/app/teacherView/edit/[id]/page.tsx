"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Separator } from '@radix-ui/react-separator';
import { AttendanceUrl } from '@/constants';

type Column = {
  id: string;
  name: string;
  type: "date" | "batch" | "class" | "assessment";
};

type Row = {
  id: string;
  cells: { [key: string]: string };
};

const AttendanceForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [columns, setColumns] = useState<Column[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${AttendanceUrl}/${id}`);
        if (res.data && res.data.columns && res.data.rows) {
          setColumns(res.data.columns);
          setRows(res.data.rows);
          toast({
            title: "Success✅",
            description: "Data loaded successfully",
            variant: "default"
          });
        } else {
          throw new Error("Invalid data structure received");
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Unable to fetch data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (rowId: string, columnId: string, value: string) => {
    setRows(rows.map(row =>
      row.id === rowId
        ? { ...row, cells: { ...row.cells, [columnId]: value } }
        : row
    ));
  };

  const addColumn = (type: "class" | "assessment") => {
    if (columns.length >= 60) {
      toast({
        title: "Error",
        description: "Maximum limit of 60 columns reached",
        variant: "destructive"
      });
      return;
    }

    const count = columns.filter(col => col.type === type).length + 1;
    const newColumn: Column = {
      id: `${type}${count}`,
      name: type === "assessment" ? "Assessment" : `${type.charAt(0).toUpperCase() + type.slice(1)} ${count}`,
      type: type,
    };

    setColumns([...columns, newColumn]);
  };

  const handleAddClass = () => addColumn("class");
  const handleAddAssessment = () => addColumn("assessment");

  const handleAddRow = () => {
    const newRow: Row = {
      id: (rows.length + 1).toString(),
      cells: {},
    };
    setRows([...rows, newRow]);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${AttendanceUrl}/${id}`,{ columns, rows });
      toast({
        title: "Success✅",
        description: "Data updated successfully",
        variant: "default"
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update data",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <SidebarInset className="w-screen">
       <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Scheduler</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{"Edit Attendance"}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className='p-10'>
      <div className="flex items-center gap-2">
        <Button onClick={handleAddClass}>Add Class</Button>
        <Button onClick={handleAddAssessment}>Add Assessment</Button>
        <Button onClick={handleAddRow}>Add Row</Button>
      </div>
      <form onSubmit={handleUpdate} className="overflow-x-auto">
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
                      value={row.cells[column.id] || ""}
                      onChange={(e) => handleInputChange(row.id, column.id, e.target.value)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button type="submit" className="mt-4">Update</Button>
      </form>
      </main>
      </SidebarInset>
  );
};

export default AttendanceForm;

