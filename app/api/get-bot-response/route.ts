import { getUserIP } from "@/app/(utils)/ip";
import { rateLimiter } from "@/app/(utils)/limiter";
import { NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(req: Request) {
    const API_URL = process.env.NODE_ENV_BOT_NEW_API;
    const ip = await getUserIP();
    console.log("Received request from IP:", ip);
    console.log("API_URL configured as:", API_URL);
    try { await rateLimiter.consume(ip, 1); }
    catch {
        return NextResponse.json({ answer: "Rate limit exceeded.", status: "notok" }, { status: 429 });
    }

    let question: string | undefined;
    try {
        ({ question } = await req.json() as { question?: string });
    }
    catch {
        await rateLimiter.consume(ip, -1);
        return NextResponse.json({ answer: "Invalid JSON.", status: "notok" }, { status: 400 });
    }
    if (!API_URL || !question) {
        await rateLimiter.consume(ip, -1);
        return NextResponse.json({ answer: "Missing question or config.", status: "notok" }, { status: 400 });
    }

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), maxDuration * 1000);

        const apiRes = await fetch(`${API_URL}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question }),
            signal: controller.signal,
        }).finally(() => clearTimeout(timeout));

        const result = await apiRes.json();
        if (!apiRes.ok) {
            await rateLimiter.consume(ip, -1);
            return NextResponse.json({ answer: "Service error.", status: "notok" }, { status: apiRes.status });
        }

        // *** Return under the shape your client expects: ***
        return NextResponse.json({
            response: { answer: result.answer },
            status: "ok"
        }, { status: 200 });

    } catch (err) {
        await rateLimiter.consume(ip, -1);
        console.error(err);
        return NextResponse.json({ answer: "Internal error.", status: "notok" }, { status: 500 });
    }
}
