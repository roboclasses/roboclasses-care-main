import React, { useEffect, useMemo, useState } from "react";
import { ApplyLeaveDialog } from "../dialog-demo/ApplyLeaveDialog";
import CardApplyLeaves from "./CardApplyLeaves";
import { getUserSession } from "@/lib/session";
import { leaveType } from "@/types/Types";
import { TimeOffUrl } from "@/constants";
import useSWR from "swr";
import axios from "axios";
import Cookies from "js-cookie";

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
    total: 6,
    name: "Half Day Leave",
    description: "For early leave",
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
        const days =
          Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) +
          1;
        return total + days;
      }
      return total;
    }, 0);
};

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

  const usedHalfDayLeaves = useMemo(
    () =>
      user.role === "teacher"
        ? calculateLeaveDays(leaves, LEAVE_POLICY.half.name, user.name)
        : 0,
    [leaves, user]
  );

  // For mapping the cards
  const cards = useMemo(() => [
    {
      id: 1,
      header: `${LEAVE_POLICY.normal.total - usedNormalLeaveDays} of ${
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
          name="Request"
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
          name="Request"
          variant="secondary"
          defaultValue={LEAVE_POLICY.sick.name}
        />
      ),
    },
    {
      id: 3,
      header: `${LEAVE_POLICY.half.total - usedHalfDayLeaves} of ${
        LEAVE_POLICY.half.total
      } days remaining`,
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
          name="Request"
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
  ], [usedHalfDayLeaves, usedNormalLeaveDays, usedSickLeaveDays]);

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
