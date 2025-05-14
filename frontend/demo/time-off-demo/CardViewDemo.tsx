
import { leaveType } from "@/types/Types";
import { TimeOffUrl } from "@/constants";
import { LEAVE_POLICY } from "@/data/dataStorage";
import { getUserSession } from "@/lib/session";
import { adjustedNormalLeave, calculateLeaveDays, currentYear } from "@/lib/utils";

import CardApplyLeaves from "./CardApplyLeaves";
import { HolidaySheet } from "./HolidaySheet";
const DynamicApplyLeaveDialog = dynamic(() => import('../dialog-demo/ApplyLeaveDialog'), {ssr: false})

import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Cookies from "js-cookie";
import { MdHolidayVillage } from "react-icons/md";
import { FaHandHoldingMedical } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import dynamic from "next/dynamic";

const fetcher = (url: string) => axios.get(url, {headers: { Authorization: Cookies.get("token") }}).then((res) => res.data);


const CardViewDemo = () => {
  const { data: leaves = [] } = useSWR<leaveType[]>(TimeOffUrl, fetcher);
  const [user, setUser] = useState({ role: "", name: "" });

  // Get user session
  useEffect(() => {
    const handleFetch = async () => {
      const user = await getUserSession();
      if (!user.role || !user.name) {
        throw new Error('No user session is found')
      }
      setUser({ role: user.role || "", name: user.name || "" });
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
      icon: (<FaCalendar size={30} color="pink"/>),
      content: (
        <div>
          <p>{LEAVE_POLICY.normal.description}</p>
          <p className="text-sm text-gray-500 mt-1">
            Policy renews on January 1, {currentYear + 1}
          </p>
        </div>
      ),
      dialog: (
        <DynamicApplyLeaveDialog
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
      icon: (<FaHandHoldingMedical size={30} color="pink"/>),
      content: (
        <div>
          <p>{LEAVE_POLICY.sick.description}</p>
          <p className="text-sm text-gray-500 mt-1">
            Policy renews on January 1, {currentYear + 1}
          </p>
        </div>
      ),
      dialog: (
        <DynamicApplyLeaveDialog
          name="Request Sick"
          variant="secondary"
          defaultValue={LEAVE_POLICY.sick.name}
        />
      ),
    },
    // {
    //   id: 3,
    //   header: "Half Day",
    //   icon: (<FaHourglassHalf size={30} color="pink"/>),
    //   content: (
    //     <div>
    //       <p>{LEAVE_POLICY.half.description}</p>
    //       <p className="text-sm text-gray-500 mt-1">
    //         Policy renews on January 1, {currentYear + 1}
    //       </p>
    //     </div>
    //   ),
    //   dialog: (
    //     <ApplyLeaveDialog
    //       name="Request Half"
    //       variant="secondary"
    //       defaultValue={LEAVE_POLICY.half.name}
    //     />
    //   ),
    // },
    {
      id: 3,
      header: LEAVE_POLICY.holidays.name,
      icon: (<MdHolidayVillage size={30} color="pink"/>),
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
      id: 4,
      header: "Quick Settings",
      icon: (<HolidaySheet />),
      content: (
        <div>
          <p>{"Reason: Enter or edit holidays"}</p>      
        </div>
      ),
      dialog: null,
    },
  ], [usedAdjustedNormalLeaveDays, usedSickLeaveDays]);

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 space-y-4">
      {cards.map((item) => (
        <CardApplyLeaves
          key={item.id}
          cardHeader={item.header}
          icon={item.icon}
          cardContent={item.content}
          cardDialogComponent={item.dialog}
        />
      ))}
    </div>
  );
};

export default CardViewDemo;
