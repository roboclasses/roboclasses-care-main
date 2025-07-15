import { TableNormalClass } from "@/demo/admin-dashboard/TableNormalClass";
import { PtmTable } from "@/demo/ptm-demo/PtmTable";
import React from "react";

const page = () => {
  return (
    <div className="space-y-10">
      <PtmTable />
      <TableNormalClass />
    </div>
  );
};

export default page;
