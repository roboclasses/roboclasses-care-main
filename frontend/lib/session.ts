'use server'

import { cookies } from "next/headers";


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
    cookieStore.delete("role");
    cookieStore.delete("_id");
    cookieStore.delete("email");
    cookieStore.delete("name");
}

