export async function POST(req: Request) {
    const API = process.env.NODE_ENV_BOT_API;
    try {
        const { body } = await req.json();
        if (!API || !body) return new Response(JSON.stringify({
            response: "something went wrong!",
            status: "notok"
        }))

        try {
            const res = await fetch(`${API}/predict`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ input: body })
            })
            const result = await res.json();
            console.log("result::", result);

            if (res.ok) {
                return new Response(JSON.stringify({
                    response: result,
                    ststus: "ok"
                }));
            }
        } catch (error) {
            return new Response(JSON.stringify({
                response: "something went wrong!",
                status: "notok"
            }))
        }
    } catch (error) {
        return new Response(JSON.stringify({
            response: "something went wrong!",
            status: "notok"
        }))
    }
}