import React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { TimeOffApprovalDemo } from "./timeOffApprovalDemo";
import { FilterTimeOffDemo } from "./FilterTimeOffDemo";

const TableViewDemo = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <FilterTimeOffDemo />
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of past leaves</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead>Teacher Name</TableHead>
              <TableHead>Time off date</TableHead>
              <TableHead className="text-right">Additional note</TableHead>
              <TableHead className="text-right">Manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Requested</TableCell>
              <TableCell>Monty</TableCell>
              <TableCell>25-03-2025</TableCell>
              <TableCell className="text-right">Urgent work</TableCell>
              <TableCell className="text-right">
                <TimeOffApprovalDemo />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TableViewDemo;
