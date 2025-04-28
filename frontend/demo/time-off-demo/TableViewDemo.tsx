import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableFooter,
} from "@/components/ui/table";

import { FilterTimeOffDemo } from "./FilterTimeOffDemo";
import { TimeOffApprovalDemo } from "./TimeOffApprovalDemo";
import { TimeOffUrl } from "@/constants";
import { getUserSession } from "@/lib/session";
import { leaveType } from "@/types/Types";
import { adjustedNormalLeave, calculateLeaveDays } from "@/lib/utils";
import { LEAVE_POLICY } from "@/data/dataStorage";

import React, { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import axios, { AxiosError } from "axios";
import useSWR from "swr";
import Cookies from "js-cookie";
import { RefreshCcw, Search } from "lucide-react";


const fetcher = (url: string) => axios.get(url, {headers: { Authorization: Cookies.get("token") }}).then((res) => res.data);

const TableViewDemo = () => {
  const { data: leaves = [], error, isLoading, isValidating} = useSWR<leaveType[]>(TimeOffUrl, fetcher);

  const [filters, setFilters] = useState<{ type: string; status: string; fromDate: string }>({ type: "", status: "", fromDate: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const [user, setUser] = useState({ role: "", name: "" });

  // Get user session
  useEffect(() => {
    const handleFetch = async () => {
      const user = await getUserSession();
      if (!user.role || !user.name) {
        throw new Error("No user session is found.");
      }
      setUser({ role: user.role, name: user.name });
    };
    handleFetch();
  }, []);

  // Get the teacher name from search query or current user
  const targetTeacher = useMemo(() => {
    if (searchQuery && user.role === "admin") {

      // Find the first matching teacher name from leaves
      const matchedLeave = leaves.find((leave) => leave.teacherName.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchedLeave?.teacherName || "";
    }
    return user.name;
  }, [searchQuery, user, leaves]);

  // Calculate used leave days for both types
  const usedNormalLeaveDays = useMemo(
    () =>
      user.role === "teacher" || (user.role === "admin" && targetTeacher)
        ? calculateLeaveDays(leaves, LEAVE_POLICY.normal.name, targetTeacher)
        : 0,
    [leaves, user, targetTeacher]
  );

  const usedSickLeaveDays = useMemo(
    () =>
      user.role === "teacher" || (user.role === "admin" && targetTeacher)
        ? calculateLeaveDays(leaves, LEAVE_POLICY.sick.name, targetTeacher)
        : 0,
    [leaves, user, targetTeacher]
  );

  const usedHalfLeavesDays = useMemo(
    () =>
      user.role === "teacher" || (user.role === "admin" && targetTeacher)
        ? calculateLeaveDays(leaves, LEAVE_POLICY.half.name, targetTeacher)
        : 0,
    [leaves, user, targetTeacher]
  );

  const usedAdjustedNormalLeaveDays = useMemo(
    () =>
      user.role === "teacher" || (user.role === "admin" && targetTeacher)
        ? adjustedNormalLeave(usedNormalLeaveDays, usedHalfLeavesDays)
        : LEAVE_POLICY.normal.total,
    [usedHalfLeavesDays, usedNormalLeaveDays, user, targetTeacher]
  );

  // Advance Filter logic for leaves leaves
  const filteredData = useMemo(() => {
    if (!leaves) return [];

    return leaves.filter((item) => {
      if (user.role === "teacher" && item.teacherName !== user.name) return false;
      if (filters.type && item.timeOffType !== filters.type) return false;
      if (filters.status && item.status !== filters.status) return false;
      if (filters.fromDate && item.dateRange?.from && new Date(item.dateRange?.from) < new Date(filters.fromDate)) return false;
      if (searchQuery && !item.teacherName.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())) return false;
      return true;
    });
  }, [leaves, filters, user, searchQuery]);

  // Reset applied filters
  const resetFilters = () => setFilters({ type: "", status: "", fromDate: "" });

  // Handle edge cases
  const handleEdgeCases = () => {
    if (leaves?.length === 0) return <div>Empty list for Leaves</div>;
    if (error instanceof AxiosError) {
      const { message } = error.response?.data;
      return <div>{message || "An unknown error has occurred."}</div>;
    }
    if (isLoading) return <div>Loading...</div>;
    if (isValidating) return <div>Refershing leaves...</div>;
  };

  return (
    <Card className="lg:w-full w-[380px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2 mr-2">
          <FilterTimeOffDemo onFilterLeaves={setFilters} />
          {Object.values(filters).some(Boolean) && (
            <Button
              variant="outline"
              className="rounded-full shadow-none"
              onClick={resetFilters}
            >
              <RefreshCcw />
              Reset
            </Button>
          )}
        </div>
        <div className="flex lg:w-full w-[300px] max-w-sm items-center border border-gray-300 rounded-lg px-2 py-1">
          <Search className="h-4 w-4 mr-2.5" />
          <Input
            type="search"
            placeholder="Search Teacher..."
            className="w-full border-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="w-full overflow-x-auto">
        {error ?? leaves?.length === 0 ?? isLoading ?? isValidating ? (
          handleEdgeCases()
        ) : (
          <Table>
            <TableCaption>A list of past leaves</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead>Teacher Name</TableHead>
                <TableHead>Time off type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead className="text-right">Additional note</TableHead>
                {user.role === 'admin' && <TableHead className="text-right">Manage</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item: leaveType) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item.status}</TableCell>
                  <TableCell>{item.teacherName}</TableCell>
                  <TableCell>{item.timeOffType}</TableCell>
                  <TableCell>
                    {item.dateRange?.from ? format(new Date(item.dateRange?.from), "MMM dd, yyyy") : ""}
                  </TableCell>
                  <TableCell>
                    {item.dateRange?.to ? format(new Date(item.dateRange?.to), "MMM dd, yyyy") : ""}
                  </TableCell>
                  <TableCell className="text-right">{item.notes}</TableCell>
                  {user.role === 'admin' && <TableCell className="text-right">
                    <TimeOffApprovalDemo timeOffId={item._id} />
                  </TableCell>}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              {user.role === "teacher" || (user.role === "admin" && searchQuery) ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-right">
                    {`Normal leave remaining: ${usedAdjustedNormalLeaveDays}`}
                  </TableCell>

                  <TableCell colSpan={2} className="text-right">
                    {`Sick leave remaining: ${ LEAVE_POLICY.sick.total - usedSickLeaveDays }`}
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>Total Rows</TableCell>
                  <TableCell className="text-right"> {filteredData.length} </TableCell>
                </TableRow>
              )}
            </TableFooter>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default TableViewDemo;
