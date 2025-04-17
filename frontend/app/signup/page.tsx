import React from "react";
import Image from "next/image";
import Link from "next/link";

import { LOGO_IMG, PUBLIC_WALLPAPER } from "@/constants/images";
import { SignupForm } from "@/demo/signup-demo/SignupForm";

const page = () => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1">
      <Image
        src={PUBLIC_WALLPAPER}
        width={1200}
        height={1200}
        alt="user-image"
        className="lg:min-h-screen h-10 lg:object-cover lg:visible invisible"
      />
      <div className="flex flex-col items-center justify-center gap-5">
        <Image src={LOGO_IMG} height={200} width={200} alt="robo-class-logo"/>

        {/* <p className="lg:text-4xl text-lg font-bold">Create an Account</p> */}
        <SignupForm />

        <div className="flex gap-2 items-center font-bold lg:text-sm text-xs">
          <p>Already have an Account?</p>
          <Link href="/login" className="text-lime-600 focus:underline transition-colors duration-150 delay-75">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
