export const maxDuration = 60; 
export const dynamic = 'force-dynamic'; 

export async function POST(req: Request) {
    const API = process.env.NODE_ENV_BOT_NEW_API;
    
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
            const encoder = new TextEncoder();
            const stream = new TransformStream();
            const writer = stream.writable.getWriter();
            
            const response = new Response(stream.readable, {
                headers: { 'Content-Type': 'application/json' }
            });
            
            // Process in background
            (async () => {
                try {
                    // Add timeout using AbortController
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 45000); 
                    
                    const res = await fetch(`${API}`, {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ question: body }),
                        signal: controller.signal
                    }).finally(() => {
                        clearTimeout(timeoutId);
                    });
                    
                    const result = await res.json();
                    console.log("Result from API:", result);
                    
                    if (res.ok) {
                        await writer.write(
                            encoder.encode(JSON.stringify({
                                response: result,
                                status: "ok"
                            }))
                        );
                    } else {
                        await writer.write(
                            encoder.encode(JSON.stringify({
                                response: { answer: "Sorry, the service is unavailable right now." },
                                status: "notok"
                            }))
                        );
                    }
                } catch (error) {
                    console.error("Error fetching from external API:", error);
                    
                    if ((error as Error).name === 'AbortError') {
                        await writer.write(
                            encoder.encode(JSON.stringify({
                                response: { answer: "The AI is taking too long to respond. Please try a shorter question." },
                                status: "timeout"
                            }))
                        );
                    } else {
                        await writer.write(
                            encoder.encode(JSON.stringify({
                                response: { answer: "Sorry, an error occurred while processing your request." },
                                status: "notok"
                            }))
                        );
                    }
                } finally {
                    await writer.close();
                }
            })();
            
            return response;
            
        } catch (error) {
            console.error("Error in response handling:", error);
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


// export async function POST(req: Request) {
//     const API = process.env.NODE_ENV_BOT_NEW_API;
    
//     try {
//         const { body } = await req.json();
        
//         if (!API || !body) {
//             return new Response(
//                 JSON.stringify({
//                     response: { answer: "Sorry, I couldn't process your request." },
//                     status: "notok"
//                 }),
//                 { status: 400 }
//             );
//         }

//         try {
//             const controller = new AbortController();
//             const timeoutId = setTimeout(() => controller.abort(), 30000);
//             const res = await fetch(`${API}`, {
//                 method: 'POST',
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ question: body }),
//                 signal: controller.signal
//             }).finally(() => {
//                 clearTimeout(timeoutId);
//             });
            
//             const result = await res.json();
//             console.log("Result from API:", result);
            
//             if (res.ok) {
//                 return new Response(
//                     JSON.stringify({
//                         response: result,
//                         status: "ok"
//                     }),
//                     { status: 200 }
//                 );
//             } else {
//                 return new Response(
//                     JSON.stringify({
//                         response: { answer: "Sorry, the service is unavailable right now." },
//                         status: "notok"
//                     }),
//                     { status: res.status }
//                 );
//             }
//         } catch (error) {
//             console.error("Error fetching from external API:", error);
//             return new Response(
//                 JSON.stringify({
//                     response: { answer: "Sorry, an error occurred while processing your request." },
//                     status: "notok"
//                 }),
//                 { status: 500 }
//             );
//         }
//     } catch (error) {
//         console.error("Error parsing request:", error);
//         return new Response(
//             JSON.stringify({
//                 response: { answer: "Invalid request format." },
//                 status: "notok"
//             }),
//             { status: 400 }
//         );
//     }
// }