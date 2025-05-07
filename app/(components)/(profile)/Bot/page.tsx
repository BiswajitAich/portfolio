"use client";
import React, { useRef, useState, useCallback, useEffect } from 'react';
import styles from '@/app/styles/profile/Bot.module.css';
import Image from 'next/image';
import assistant from "@/public/static/assistant.png";

interface Message {
    q: string;
    ans: string;
}

const Bot = () => {
    const [message, setMessage] = useState<Message>({
        q: "",
        ans: "Hi How can I help you!\nAsk me anything about Biswajit Aich..."
    });
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [wordCount, setWordCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [isOnline, setIsOnline] = useState<boolean>(false);
    const [displayStatusMessage, setDisplayStatusMessage] = useState<boolean>(true);

    const CHAR_LIMIT = 100;

    useEffect(() => {
        const check = async () => {
            await checkBotStatus();
            setDisplayStatusMessage(true);
        };
        check();
    }, []);

    const linkifyText = useCallback((text: string) => {
        if (!text) return "";

        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = text.split(urlRegex);

        const result: React.ReactNode[] = [];

        parts.forEach((part, i) => {
            if (urlRegex.test(part)) {
                result.push(
                    <a
                        key={i}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.botLink}
                    >
                    {part}
                    </a>
                );
            } else {
                result.push(part);
            }
        });

        return result;
    }, []);

    const checkBotStatus = async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10005);
            const res = await fetch('/api/check-bot-health', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                signal: controller.signal
            }).finally(() => {
                clearTimeout(timeoutId);
            });
            const data = await res.json();

            if (!res.ok) {
                setIsOnline(false);
                setDisplayStatusMessage(true);
                console.error('Health check failed with status:', res.status);
                return;
            }
            const newOnlineStatus = data.health === "ok";

            if (newOnlineStatus !== isOnline) {
                setDisplayStatusMessage(true);
            }

            setIsOnline(newOnlineStatus);
            if (newOnlineStatus) {
                setTimeout(() => {
                    setDisplayStatusMessage(false);
                }, 2000)
            }
        } catch (error) {
            setIsOnline(false);
            throw new Error('Failed to get status(checkBotStatus)');
        }
    }

    const getBotResponse = async (input: string) => {
        if (!isOnline) {
            setDisplayStatusMessage(true);
            return "Sorry, the bot is currently offline. Please try again later.";
        }
        try {
            if (!isOnline) { return; }
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000);

            const res = await fetch('/api/get-bot-response', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ body: input }),
                signal: controller.signal
            }).finally(() => {
                clearTimeout(timeoutId);
            });

            if (!res.ok) {
                throw new Error('Failed to get response');
            }

            const data = await res.json();

            if (data.response && data.status === "ok") {
                return data.response.answer || "Sorry, I didn't understand that.";
            } else {
                return "Sorry, I couldn't process that request.";
            }
        } catch (error) {
            console.error("Error fetching bot response:", error);
            if ((error as Error).name === 'AbortError') {
                return "Request timed out. The server might be busy, please try again.";
            }

            return "An error occurred. Please try again.";
        }
    }

    const handleSendMessage = async () => {
        if (input.trim() === '' || input.trim().length <= 5) return;

        setLoading(true);
        const userQuestion = input;
        setInput('');

        setMessage({
            q: userQuestion,
            ans: ""
        });

        try {
            if (!isOnline) {
                await checkBotStatus();
            }

            const botResponse = await getBotResponse(userQuestion);
            setMessage(prev => ({
                q: prev.q,
                ans: typeof botResponse === 'string' ? botResponse : "Sorry, I didn't understand that."
            }));
        } catch (error) {
            console.error("Error handling message:", error);
            setMessage(prev => ({
                q: prev.q,
                ans: "Sorry, an error occurred. Please try again."
            }));
        } finally {
            setLoading(false);
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        const len = text.length;
        if (len <= CHAR_LIMIT) {
            setInput(text);
            setWordCount(len);
        }

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>I'm Biswajit Aich's AI - ask me anything.</div>
            <div className={styles.chatWindow}>
                <div className={styles.assistant_img}>
                    <Image
                        src={assistant}
                        alt='Assistant'
                        height={600}
                        width={400}
                        priority
                    />
                </div>
                {isOnline ? (
                    <div className={styles.botMessage}>
                        {message.q && <div className={styles.userQuestion}>{message.q}</div>}
                        {loading ? (
                            <div className={styles.thinking}>Thinking...</div>
                        ) : (
                            <div className={styles.answer}>{linkifyText(message.ans)}</div>
                        )}
                    </div>
                ) : (null)}

            </div>
            <div className={styles.inputSection}>
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleInput}
                    className={styles.input}
                    placeholder="Type your question here..."
                    onKeyDown={(e) => {
                        if (loading || !isOnline) {
                            e.preventDefault();
                        }
                        else if (e.key === "Enter" && !e.shiftKey && input.trim().length > 5) {
                            e.preventDefault();
                            handleSendMessage();
                        } else if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                        }
                    }}
                />
                <button
                    onClick={handleSendMessage}
                    className={styles.sendButton}
                    disabled={loading || !isOnline || input.trim().length <= 5}
                    style={{ background: loading ? "#051669" : "" }}
                >
                    Send
                </button>
            </div>
            <div className={styles.wordCounter}>
                {wordCount}/{CHAR_LIMIT} characters
            </div>
            {displayStatusMessage && (
                <div className={styles.online} style={{ boxShadow: isOnline ? "0 0 1rem mediumspringgreen" : "0 0 1rem red" }}>
                    <span>The Bot is: </span>
                    <strong style={{ color: isOnline ? "mediumspringgreen" : "red" }}>{isOnline ? "ONLINE" : "OFFLINE"}</strong>
                    {!isOnline && <p>It may take a minute for the backend to restart. come back later!</p>}
                </div>
            )}
        </div>
    );
};

export default Bot;
