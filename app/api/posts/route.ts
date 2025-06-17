// /app/api/posts/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: { select: { name: true, email: true } },
        comments: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // console.log(posts, "posts fetched from database");

    return NextResponse.json(posts);
  } catch (error) {
    console.error("❌ Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
