import React from "react";
import { ApplyLeaveDialog } from "../dialog-demo/ApplyLeaveDialog";
import CardApplyLeaves from "./CardApplyLeaves";

// Time off cards
const cards = [
  {
    id: 1,
    cardHeader: "15 days of Normal leave available",
    cardContent: "You are entitled to 15 days of Normal leave this year",
    cardDialogComponent: <ApplyLeaveDialog name="Request Normal" />,
  },
  {
    id: 2,
    cardHeader: "5 days of Sick leave available",
    cardContent: "You are entitled to 5 days of Sick leave this year",
    cardDialogComponent: <ApplyLeaveDialog name="Request Sick" />,
  },
  {
    id: 3,
    cardHeader: "3 national holidays",
    cardContent:
      "UAE observes 3 national holidays. 2 holidays left to be celebrated this year.",
    cardDialogComponent: "",
  },
];

const CardViewDemo = () => {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 space-y-4">
      {cards.map((item) => (
        <CardApplyLeaves
          key={item.id}
          cardHeader={item.cardHeader}
          cardContent={item.cardContent}
          cardDialogComponent={item.cardDialogComponent}
        />
      ))}
    </div>
  );
};

export default CardViewDemo;
