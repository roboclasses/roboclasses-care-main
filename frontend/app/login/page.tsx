import React from "react";
import Image from "next/image";
import Link from "next/link";

import { LOGO_IMG, PUBLIC_WALLPAPER } from "@/constants/images";
import { LoginForm } from "@/demo/login-demo/LoginForm";

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

         <div className="w-full px-5 space-y-2 text-center">
          <h1 className="lg:text-2xl text-xl font-semibold">Welcome back</h1>
          <p className="lg:text-base text-sm text-">
            Sign in to your account to continue!
          </p>
        </div>
        <LoginForm />

        <div className="flex gap-2 items-center text-sm">
          <p>Dont have an Account?</p>
          <Link href="/signup" className="text-lime-500 hover:underline ">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
