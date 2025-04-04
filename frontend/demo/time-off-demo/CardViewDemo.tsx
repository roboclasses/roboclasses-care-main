import React, { useEffect, useMemo, useState } from "react";
import { ApplyLeaveDialog } from "../dialog-demo/ApplyLeaveDialog";
import CardApplyLeaves from "./CardApplyLeaves";
import { getUserSession } from "@/lib/session";
import { leaveType } from "@/types/Types";
import { TimeOffUrl } from "@/constants";
import useSWR from "swr";
import axios from "axios";
import Cookies from "js-cookie";
import { HolidayDialog } from "../dialog-demo/HolidayDialog";

const fetcher = (url: string) => axios.get(url, {headers: { Authorization: Cookies.get("token") }}).then((res) => res.data);

const currentYear = new Date().getFullYear();

const LEAVE_POLICY = {
  normal: {
    total: 15,
    name: "Normal Leave",
    description: "Annual personal leave allowence",
  },
  sick: {
    total: 5,
    name: "Sick Leave",
    description: "For medical absences with doctor's note",
  },
  half: {
    total: 30,
    name: "Half Day Leave",
    description: "Reason for Leave: Early leave",
  },
  holidays: {
    total: 3,
    name: "National Holidays",
    description: "UAE public holidays",
  },
};

const calculateLeaveDays = (
  leaves: leaveType[],
  type: string,
  userName: string
) => {
  return leaves
    .filter(
      (leave) =>
        leave.teacherName === userName &&
        leave.timeOffType === type &&
        leave.status === "Taken"
    )
    .reduce((total, leave) => {
      if (leave.dateRange?.from && leave.dateRange?.to) {
        const from = new Date(leave.dateRange?.from);
        const to = new Date(leave.dateRange?.to);
        if(leave.timeOffType === "Normal Leave"){

        }
        const days = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        return total + days;
      }
      return total;
    }, 0);
};

// Calculated adjusted normal leave
const adjustedNormalLeave = (
  normalLeaveUsed: number,
  halfLeaveUsed: number
)=>{
  const halfDayDeduction = Number(halfLeaveUsed) * 0.5;
   
  const remaining =  LEAVE_POLICY.normal.total - Number(normalLeaveUsed) - halfDayDeduction;
  return parseFloat(remaining.toFixed(2))

}

const CardViewDemo = () => {
  const { data: leaves = [] } = useSWR<leaveType[]>(TimeOffUrl, fetcher);
  const [user, setUser] = useState({ role: "", name: "" });

  // Get user session
  useEffect(() => {
    const handleFetch = async () => {
      const user = await getUserSession();
      if (user) {
        setUser({ role: user.role || "", name: user.name || "" });
      }
    };
    handleFetch();
  }, []);

  // Calculate used leave days for both types
  const usedNormalLeaveDays = useMemo(
    () =>
      user.role === "teacher"
        ? calculateLeaveDays(leaves, LEAVE_POLICY.normal.name, user.name)
        : 0,
    [leaves, user]
  );

  const usedSickLeaveDays = useMemo(
    () =>
      user.role === "teacher"
        ? calculateLeaveDays(leaves, LEAVE_POLICY.sick.name, user.name)
        : 0,
    [leaves, user]
  );

  const usedHalfLeavesDays = useMemo(
    () =>
      user.role === "teacher"
        ? calculateLeaveDays(leaves, LEAVE_POLICY.half.name, user.name)
        : 0,
    [leaves, user]
  );

  const usedAdjustedNormalLeaveDays = useMemo(()=>
    user.role === "teacher"
    ? adjustedNormalLeave(usedNormalLeaveDays, usedHalfLeavesDays )
    : LEAVE_POLICY.normal.total,
    [usedHalfLeavesDays, usedNormalLeaveDays, user]
  
  )

  // For mapping the cards
  const cards = useMemo(() => [
    {
      id: 1,
      header: `${usedAdjustedNormalLeaveDays} of ${
        LEAVE_POLICY.normal.total
      } days remaining`,
      content: (
        <div>
          <p>{LEAVE_POLICY.normal.description}</p>
          <p className="text-sm text-gray-500 mt-1">
            Policy renews on January 1, {currentYear + 1}
          </p>
        </div>
      ),
      dialog: (
        <ApplyLeaveDialog
          name="Request Normal"
          variant="secondary"
          defaultValue={LEAVE_POLICY.normal.name}
        />
      ),
    },
    {
      id: 2,
      header: `${LEAVE_POLICY.sick.total - usedSickLeaveDays} of ${
        LEAVE_POLICY.sick.total
      } days remaining`,
      content: (
        <div>
          <p>{LEAVE_POLICY.sick.description}</p>
          <p className="text-sm text-gray-500 mt-1">
            Policy renews on January 1, {currentYear + 1}
          </p>
        </div>
      ),
      dialog: (
        <ApplyLeaveDialog
          name="Request Sick"
          variant="secondary"
          defaultValue={LEAVE_POLICY.sick.name}
        />
      ),
    },
    {
      id: 3,
      header: `${LEAVE_POLICY.half.total - usedHalfLeavesDays} of ${
        LEAVE_POLICY.half.total
      } half day leave remaining`,
      content: (
        <div>
          <p>{LEAVE_POLICY.half.description}</p>
          <p className="text-sm text-gray-500 mt-1">
            Policy renews on January 1, {currentYear + 1}
          </p>
        </div>
      ),
      dialog: (
        <ApplyLeaveDialog
          name="Request Half"
          variant="secondary"
          defaultValue={LEAVE_POLICY.half.name}
        />
      ),
    },
    {
      id: 4,
      header: LEAVE_POLICY.holidays.name,
      content: (
        <div>
          <p>{LEAVE_POLICY.holidays.description}</p>
          <p className="text-sm text-gray-500 mt-1">
            {currentYear} holiday schedule available
          </p>
        </div>
      ),
      dialog: null,
    },
    {
      id: 5,
      header: "Quick Settings",
      content: (
        <div>
          <p>{"Reason: Enter or edit holidays"}</p>      
        </div>
      ),
      dialog: (<HolidayDialog />),
    },
  ], [usedAdjustedNormalLeaveDays, usedHalfLeavesDays, usedSickLeaveDays]);

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 space-y-4">
      {cards.map((item) => (
        <CardApplyLeaves
          key={item.id}
          cardHeader={item.header}
          cardContent={item.content}
          cardDialogComponent={item.dialog}
        />
      ))}
    </div>
  );
};

export default CardViewDemo;
