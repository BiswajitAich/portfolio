"use client";
import React, { useEffect, useRef, useState } from 'react';
import styles from '@/app/styles/profile/Bot.module.css';
import Image from 'next/image';
import bot from "@/public/static/bot.gif";
import user from "@/public/static/user.gif";

interface Message {
    sender: string,
    text: string
}

interface HealthState {
    message: string,
    isOnline: boolean,
    isChecking: boolean
}

interface BotResponse {
    response: {
        output: string
    },
    status: string
}

const Bot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [wordCount, setWordCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [health, setHealth] = useState<HealthState>({
        message: "Checking server status please wait...",
        isOnline: false,
        isChecking: false
    });
    const CHAR_LIMIT = 100;

    useEffect(() => {
        let interval: NodeJS.Timeout;

        const checkHealth = async () => {
            setHealth(prev => ({ ...prev, isChecking: true }));
            try {
                const res = await fetch("/api/check-bot-health");

                if (!res.ok) {
                    throw new Error(`Server responded with status: ${res.status}`);
                }

                const data = await res.json();

                if (data.health === "ok") {
                    setHealth(prev => ({ ...prev, message: "Server is online", isOnline: true }));
                    interval = setInterval(() => {
                        setHealth(prev => ({ ...prev, isChecking: false }));
                    }, 2000);
                } else {
                    setHealth(prev => ({ ...prev, message: "Something went wrong." }));
                    throw new Error("Server health check failed");
                }
            } catch (error) {
                setHealth(prev => ({
                    ...prev,
                    message: "Server is currently unavailable. Please try again later.",
                    isOnline: false
                }));
            }
        };

        checkHealth();

        return () => clearInterval(interval);
    }, []);

    const getBotResponse = async (input: string) => {
        try {
            const res = await fetch('/api/get-bot-response', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ body: input })
            });
            const data: BotResponse = await res.json();
            return data.response.output || "Sorry, I didn't understand that.";
        } catch (error) {
            console.error("Error fetching bot response:", error);
            return "An error occurred. Please try again.";
        }
    }

    const handleSendMessage = async () => {
        if (input.trim() === '') return;
        setLoading(true);
        try {
            const userMessage: Message = { text: input, sender: 'user' };
            setMessages(prevMessages => [...prevMessages, userMessage]);

            const botResponse = await getBotResponse(input);
            const botMessage: Message = { 
                text: typeof botResponse === 'string' ? botResponse : "Sorry, I didn't understand that.", 
                sender: 'bot' 
            };
            setMessages(prevMessages => [...prevMessages, botMessage]);

        } catch (error) {
            console.error("Error handling message:", error);
        } finally {
            setLoading(false);
            setInput('');
        }
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        const len = text.length;
        if (len <= CHAR_LIMIT) {
            setInput(text);
            setWordCount(len === 0 ? 0 : len);
        }

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>Ask Me Anything</div>
            <div className={styles.chatWindow}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={
                            message.sender === 'user'
                                ? styles.userMessage
                                : styles.botMessage
                        }
                    >
                        <Image
                            className={styles.senderImg}
                            style={{
                                left: message.sender === 'bot' ? "0" : "",
                                right: message.sender === 'bot' ? "" : "0"
                            }}
                            src={message.sender === 'bot' ? bot : user}
                            height={50} width={50}
                            alt={message.sender}
                        />

                        <div style={{ marginTop: "50px" }}>
                            {message.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className={styles.botMessage}>
                        <Image
                            className={styles.senderImg}
                            style={{ left: "0" }}
                            src={bot}
                            height={50} width={50}
                            alt="bot"
                        />
                        <div style={{ marginTop: "50px" }}>
                            Thinking...
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.inputSection}>
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleInput}
                    className={styles.input}
                    placeholder="Type your question here..."
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey && input.trim().length > 5) {
                            e.preventDefault();
                            handleSendMessage();
                        } else if (e.key === "Enter") {
                            e.preventDefault();
                        }
                    }}
                />
                <button
                    onClick={handleSendMessage}
                    className={styles.sendButton}
                    disabled={loading || !health.isOnline || health.isChecking}
                    style={{ background: loading || !health.isOnline ? "#051669" : "" }}
                >
                    Send
                </button>
            </div>
            <div className={styles.wordCounter}>
                {wordCount}/{CHAR_LIMIT} words
            </div>
            {health.isChecking && (
                <span
                    className={styles.warning}
                    style={{
                        border: health.isOnline ? '4px solid green' : '4px solid red',
                        boxShadow: health.isOnline ? '0 0 1rem green' : '0 0 1rem red'
                    }}
                >
                    {health.message}
                </span>
            )}
        </div>
    );
};

export default Bot;