// src/pages/api/generate.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { kv } from '@vercel/kv';

const generateUniqueCode = () => {
    return Math.random().toString(36).substring(2, 10);
};

export async function POST(req: NextRequest) {
  console.log('Request received:', req.method);

  const uniqueCode = generateUniqueCode();
  console.log('Generated unique code:', uniqueCode);

  const value = JSON.stringify({ redeemed: false, discordId: '' });

  try {
    await kv.set(uniqueCode, value);
    console.log(`Stored code ${uniqueCode} successfully.`);

    // Ensure the response object uses 'uniqueCode' to match the frontend expectation
    return new NextResponse(JSON.stringify({ success: true, uniqueCode }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error storing code in KV database:", error);
    return new NextResponse(JSON.stringify({ success: false, error: "Failed to generate and store the code." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
