// app/api/users/route.ts
import { prisma } from '@/lib/prisma'; // Adjust the import path as necessary
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        Post: true,
         // Ensure this matches your Prisma schema exactly
      },
    });

    return NextResponse.json(users);
  } catch (error: any) {
    console.error("❌ Failed to fetch users:", error); // ✅ Log actual error to terminal
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
