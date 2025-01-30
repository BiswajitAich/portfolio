import { NextResponse } from 'next/server';
import { z } from 'zod';

const emailSchema = z.object({
  access_key: z.string().min(1),
  name: z.string().min(3).max(100),
  email: z.string().email(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(5000)
});

export async function POST(request: Request) {
  try {
    const API = process.env.NODE_ENV_FORM_API;
    const body = await request.json();

    if (!API || !body) return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );

    const validatedData = emailSchema.parse({
      ...body,
      access_key: process.env.NODE_ENV_FORMS_ACCESS_KEY
    });

    const response = await fetch(`${API}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Failed to send email');
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Email error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}