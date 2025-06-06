import { headers } from "next/headers";

export async function getUserIP() {
    const headersList = await headers();
    const ip = headersList.get('x-forworded-for')?.split('.')[0]||headersList.get('x-real-ip')||'127.0.0.1';
    return ip;
}