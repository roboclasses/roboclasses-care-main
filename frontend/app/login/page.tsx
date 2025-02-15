import Image from "next/image";
import Link from "next/link";
import React from "react";

import { LoginForm } from "@/demo/login-demo/LoginForm";
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
        <p className="text-4xl font-bold">Login to your Account</p>
        <LoginForm />
        <div className="flex gap-2 items-center font-bold text-sm">
          <p>Dont have an Account?</p>
          <Link href="/signup" className="text-lime-600">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default page;
