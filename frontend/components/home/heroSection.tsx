"use client";
import CardDemo from "@/demo/home-demo/cardDemo";
import React from "react";

const HeroSection = () => {
  return (
    <div className="justify-between bg-custom-gradient relative p-20 min-h-screen w-screen">
      <div className="lg:absolute top-0 left-0 w-48 h-1/4 bg-gray-200/20 rounded-br-full "></div>
      <div className="flex flex-col items-center gap-4 lg:mt-20 ">
        <CardDemo />
        <p className="lg:text-5xl text-2xl font-extrabold flex gap-1 items-center text-white">
          <span
            className="text-transparent bg-clip-text 
          bg-gradient-to-r from-orange-400 to-pink-500 "
          >
            We are
          </span>
          ROBOclasses
        </p>
        <p className="lg:text-xl lg:ml-0 ml-5 text-center text-md text-white">
          STEM Accredited robotics and coding courses
        </p>
      </div>
      <div className="lg:absolute bottom-0 right-0 w-32 h-1/6 bg-gray-200/20 rounded-tl-full "></div>
    </div>
  );
};

export default HeroSection;
