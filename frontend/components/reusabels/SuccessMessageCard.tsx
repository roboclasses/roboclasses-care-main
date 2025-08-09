import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaCircleArrowRight } from "react-icons/fa6";

const SuccessMessageCard = ({content, to}:{content:string, to:string}) => {
  return (
    <Card className="p-2 rounded flex flex-col items-center">
      <CardHeader className="text-2xl">✅</CardHeader>
      <CardContent className="text-pretty text-lg font-serif">
        {content}
      </CardContent>
      <CardFooter>
        <Link className="flex items-center gap-2" href={to}>
          <Button>
            Back to Dashboard <FaCircleArrowRight size={25} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SuccessMessageCard;
