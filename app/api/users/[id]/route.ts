import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log(params.id)
  
  try {
    const { id } = params;

    // Step 1: Get the user to extract the email (foreign key)
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Step 2: Delete related posts first
    // await prisma.post.deleteMany({
    //   where: { userEmail: user.email },
    // });

    // Step 3: Delete the user
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete user" },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // First get the user by ID (for name, email, etc.)
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Then fetch posts using user.email (since relation is on userEmail)
    const posts = await prisma.post.findMany({
      where: { userEmail: user.email },
    });

    return NextResponse.json({ ...user, Post: posts });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
