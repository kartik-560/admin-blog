import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalPosts = await prisma.post.count();
    const totalViews = await prisma.post.aggregate({
      _sum: { views: true },
    });

    const totalUsers = await prisma.user.count();
    const totalComments = await prisma.comment.count();

    return NextResponse.json({
      totalPosts,
      totalViews: totalViews._sum.views || 0,
      totalUsers,
      totalComments,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
