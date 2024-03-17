// src/pages/api/generate.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { kv } from '@vercel/kv';

// Helper function to generate a unique code
const generateUniqueCode = () => {
    return Math.random().toString(36).substring(2, 10); // Adjust as needed
};

// Named export for the POST method
export async function POST(req: NextApiRequest, res: NextApiResponse) {
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
        res.status(200).json({ success: true, code: uniqueCode });
    } catch (error) {
        console.error("Error storing code in KV database:", error);
        res.status(500).json({ success: false, error: "Failed to generate and store the code." });
    }
}
