"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface filterTypes{
  onFilterActiveBatches: ()=> void,
  onFilterCompletedBatches: ()=>void,
}

export function CollapsibleDemo({onFilterActiveBatches, onFilterCompletedBatches}:filterTypes) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="p-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4 ">
        <h4 className="text-xl font-semibold">Filter Views</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <Link
      href="#"
      onClick={onFilterActiveBatches}
      className="rounded-md border flex items-center p-2 h-10 font-bold text-sm hover:underline"
      >
        Active Batches
      </Link>
      <CollapsibleContent className="space-y-2">
        <Link
          href="#"
          onClick={onFilterCompletedBatches}
          className="rounded-md border flex items-center p-2 h-10 font-bold text-sm hover:underline"
        >
          Completed Batches
        </Link>

      </CollapsibleContent>
    </Collapsible>
  );
}
