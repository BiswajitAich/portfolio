// export async function POST(req: Request) {
//     const API = process.env.NODE_ENV_BOT_API;
//     try {
//         const { body } = await req.json();
//         if (!API || !body) return new Response(JSON.stringify({
//             response: "something went wrong!",
//             status: "notok"
//         }))

//         try {
//             const res = await fetch(`${API}/predict`, {
//                 method: 'POST',
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ input: body })
//             })
//             const result = await res.json();
//             console.log("result::", result);

//             if (res.ok) {
//                 return new Response(JSON.stringify({
//                     response: result,
//                     ststus: "ok"
//                 }));
//             }
//         } catch (error) {
//             return new Response(JSON.stringify({
//                 response: "something went wrong!",
//                 status: "notok"
//             }))
//         }
//     } catch (error) {
//         return new Response(JSON.stringify({
//             response: "something went wrong!",
//             status: "notok"
//         }))
//     }
// }

export async function POST(req: Request) {
    const API = process.env.NODE_ENV_BOT_API2;
    
    try {
        const { body } = await req.json();
        
        if (!API || !body) {
            return new Response(
                JSON.stringify({
                    response: { answer: "Sorry, I couldn't process your request." },
                    status: "notok"
                }),
                { status: 400 }
            );
        }

        try {
            const res = await fetch(`${API}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: body })
            });
            
            const result = await res.json();
            console.log("Result from API:", result);
            
            if (res.ok) {
                return new Response(
                    JSON.stringify({
                        response: result,
                        status: "ok"
                    }),
                    { status: 200 }
                );
            } else {
                return new Response(
                    JSON.stringify({
                        response: { answer: "Sorry, the service is unavailable right now." },
                        status: "notok"
                    }),
                    { status: res.status }
                );
            }
        } catch (error) {
            console.error("Error fetching from external API:", error);
            return new Response(
                JSON.stringify({
                    response: { answer: "Sorry, an error occurred while processing your request." },
                    status: "notok"
                }),
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Error parsing request:", error);
        return new Response(
            JSON.stringify({
                response: { answer: "Invalid request format." },
                status: "notok"
            }),
            { status: 400 }
        );
    }
}