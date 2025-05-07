export async function GET() {
    const API = process.env.NODE_ENV_BOT_NEW_API;
    try {
        if (!API) return new Response(JSON.stringify({ health: "notok" }));
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        const res = await fetch(`${API}/health`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
            signal: controller.signal
        }).finally(() => {
            clearTimeout(timeoutId);
        });
        if (!res.ok) return new Response(JSON.stringify({ health: "notok" }));
        if ((await res.json())?.status == "ok") {
            return new Response(JSON.stringify({ health: "ok" }));
        }
    } catch (error) {
        console.error((error as Error).message);
        return new Response(JSON.stringify({ health: "notOk" }));
    }
}
