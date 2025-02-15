import { SignupForm } from "@/demo/signup-demo/SignupForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { LOGO_IMG, PUBLIC_WALLPAPER } from "@/constants/images";

const page = () => {
  return (
    <div className="grid grid-cols-2">
      <Image
        src={PUBLIC_WALLPAPER}
        width={1200}
        height={1200}
        alt="user-image"
        className="min-h-screen object-cover"
        />
      <div className="flex flex-col items-center justify-center gap-5">
        <Image src={LOGO_IMG} height={200} width={200} alt="robo-class-logo"/>
        <p className="text-4xl font-bold">Create an Account</p>
        <SignupForm />
        <div className="flex gap-2 items-center font-bold text-sm">
          <p>Already have an Account?</p>
          <Link href="/login" className="text-lime-600">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default page;
