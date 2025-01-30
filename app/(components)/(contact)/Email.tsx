"use client";
import styles from "@/app/styles/contact/EMail.module.css";
import { FormEvent, useState } from "react";

interface Emailtype {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const Email = ({ clicked }: { clicked: (display: boolean) => void }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateForm = (data: Emailtype): string | null => {
        if (!data.name || data.name.length < 3) return "Name must be at least 3 characters.";
        if (!data.email.includes("@")) return "Enter a valid email address.";
        if (!data.message || data.message.length < 10) return "Message must be at least 10 characters.";
        return null;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const form = e.target as HTMLFormElement;
        const data: Emailtype = {
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            email: (form.elements.namedItem('email') as HTMLInputElement).value,
            subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
            message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
        };

        const validationError = validateForm(data);
        if (validationError) {
            setError(validationError);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Email sent successfully!');
                form.reset();
            } else {
                setError('Failed to send email. Please try again.');
            }
        } catch (error: any) {
            setError(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.form_container}>
            <button onClick={() => clicked(false)} className={styles.x}>&#10007;</button>
            <form onSubmit={handleSubmit} className={styles.form}>
                {error && <button onClick={()=>setError(null)} className={styles.error}>{error}</button>}
                <div>
                    <label htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Your Full Name"
                        autoComplete="name"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="your.email@example.com"
                        autoComplete="email"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="subject">Subject</label>
                    <input
                        id="subject"
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        autoComplete="subject"
                    />
                </div>

                <div className={styles.msg}>
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        rows={4}
                        name="message"
                        placeholder="Type your message here"
                        required
                    ></textarea>
                </div>
                <div className={styles.btns}>
                    <button type="submit" disabled={loading} title="Click to send message!">
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Email;
