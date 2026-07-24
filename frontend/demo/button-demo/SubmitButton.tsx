"use client";

import React from "react";

import { btnType } from "@/types/Types";
import { Input } from "@/components/ui/input";

const SubmitButton = ({ name, type, onClick, disabled }: btnType) => {
  return (
    <Input
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-black text-white font-semibold hover:bg-accent-foreground transition-transform delay-100 duration-150 "
      name={name}
    />
  );
};

export default SubmitButton;
