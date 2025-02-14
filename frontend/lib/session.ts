'use server'
import { cookies } from "next/headers"


 const cookie ={
    options:{ httponly: true, secure: false, samesite: "lax", path: '/' },
    duration:10 * 24 * 60 * 60 * 1000, //10 days

}
// user session will expires in 10days
const expires = new Date(Date.now()+cookie.duration);

export async function createUserSession(token:string, role:string, _id:string, email:string, name:string){
    cookies().set("token", token, {...cookie.options, expires})
    cookies().set("role", role, {...cookie.options, expires})
    cookies().set("_id", _id, {...cookie.options, expires})
    cookies().set("email", email, {...cookie.options, expires})
    cookies().set("name", name, {...cookie.options, expires})
}

export async function getUserSession() {
    return { name: cookies().get("name")?.value, role: cookies().get("role")?.value, email: cookies().get("email")?.value, token: cookies().get("token")?.value };
}

export async function deleteUserSession(){
    cookies().delete("token")
    cookies().delete("role")
    cookies().delete("_id",)
    cookies().delete("email")
    cookies().delete("name")
}

