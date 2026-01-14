'use server'

import { cookies } from "next/headers";

// const cookie ={
//     options:{ httponly: true, secure: false, samesite: "lax", path: '/' },
//     // options:{ httponly: true, secure: process.env.NODE_ENV === "production", samesite: "Lax", path: '/' },
//     duration: 10 * 24 * 60 * 60 * 1000, //10 days

// }
// user session will expires in 10days
// const expires = new Date(Date.now()+cookie.duration);

// export async function createUserSession(token:string, role:string, _id:string, email:string, name:string){
//     const cookieStore = await cookies();
//     cookieStore.set("token", token, {...cookie.options, expires});
//     cookieStore.set("role", role, {...cookie.options, expires});
//     cookieStore.set("_id", _id, {...cookie.options, expires});
//     cookieStore.set("email", email, {...cookie.options, expires});
//     cookieStore.set("name", name, {...cookie.options, expires});
// }


export async function getUserSession() {
    const cookieStore = await cookies();
    return { 
        name: cookieStore.get("name")?.value, 
        role: cookieStore.get("role")?.value, 
        email: cookieStore.get("email")?.value, 
        token: cookieStore.get("token")?.value 
    };
}

export async function deleteUserSession(){
    const cookieStore = await cookies();
    cookieStore.delete("token");

}

