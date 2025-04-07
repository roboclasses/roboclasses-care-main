import React, { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface cardApplyLeavesType {
  cardHeader: string;
  cardContent: ReactNode;
  cardDialogComponent: ReactNode;
  icon: ReactNode;
}

const CardApplyLeaves = ({
  cardHeader,
  cardContent,
  cardDialogComponent,
  icon
}: cardApplyLeavesType) => {
  return (
    <Card className="shadow-sm border-0">
      <CardHeader className="flex flex-row justify-between items-center">
        <p className="text-lg font-semibold">{cardHeader}</p>
        <div>{icon}</div>
      </CardHeader>
      <CardContent>
        <div style={{color:"GrayText", fontSize: "14px"}}>{cardContent}</div>
      </CardContent>
      <CardFooter>{cardDialogComponent}</CardFooter>
    </Card>
  );
};

export default CardApplyLeaves;
