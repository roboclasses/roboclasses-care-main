import React from "react";
import Image from "next/image";
import Link from "next/link";

import { LoginForm } from "@/demo/login-demo/LoginForm";
import { LOGO_IMG, PUBLIC_WALLPAPER } from "@/constants/images";

const page = () => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 h-full">  
      <Image
        src={PUBLIC_WALLPAPER}
        width={1200}
        height={1200}
        alt="user-image"
        className="lg:min-h-screen h-10 lg:object-cover lg:visible invisible"
      />
      <div className="flex flex-col items-center justify-center gap-5">
        <Image src={LOGO_IMG} height={200} width={200} alt="robo-class-logo" />

        {/* <p className="lg:text-4xl text-lg font-bold">Login to your Account</p> */}
        <LoginForm />

        <div className="flex gap-2 items-center font-bold lg:text-sm text-xs">
          <p>Dont have an Account?</p>
          <Link href="/signup" className="text-lime-600 focus:underline transition-colors duration-150 delay-75">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
