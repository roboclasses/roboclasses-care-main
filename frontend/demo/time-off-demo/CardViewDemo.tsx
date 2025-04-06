
import { getUserSession } from "@/lib/session";
import { leaveType } from "@/types/Types";
import { TimeOffUrl } from "@/constants";

import CardApplyLeaves from "./CardApplyLeaves";
import { HolidayDialog } from "../dialog-demo/HolidayDialog";
import { ApplyLeaveDialog } from "../dialog-demo/ApplyLeaveDialog";

import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Cookies from "js-cookie";
import { adjustedNormalLeave, calculateLeaveDays, currentYear } from "@/lib/utils";
import { LEAVE_POLICY } from "@/data/dataStorage";

const fetcher = (url: string) => axios.get(url, {headers: { Authorization: Cookies.get("token") }}).then((res) => res.data);


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
      header: "Half Day",
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
  ], [usedAdjustedNormalLeaveDays, usedSickLeaveDays]);

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
