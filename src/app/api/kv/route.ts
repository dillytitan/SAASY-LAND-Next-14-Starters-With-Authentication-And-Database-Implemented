// src/pages/api/generate.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { kv } from '@vercel/kv';

// Helper function to generate a unique code
const generateUniqueCode = () => {
    return Math.random().toString(36).substring(2, 10); // Adjust as needed
};

// Named export for the POST method
export async function POST(req: NextRequest) {
  // Log the request method for debugging purposes
  console.log('Request received:', req.method);

  // Generate the unique code
  const uniqueCode = generateUniqueCode();
  console.log('Generated unique code:', uniqueCode);

  // Prepare the data to be stored
  const value = JSON.stringify({ redeemed: false, discordId: '' });

  try {
    // Store the code and its associated data in the KV database
    await kv.set(uniqueCode, value);
    console.log(`Stored code ${uniqueCode} successfully.`);

    // Respond with the generated code
    return new NextResponse(JSON.stringify({ success: true, code: uniqueCode }), {
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
