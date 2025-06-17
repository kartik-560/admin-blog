import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  console.log("Deleting comment with ID:", id);

  try {
    // ✅ Check if comment exists first
    const existing = await prisma.comment.findUnique({
      where: { id },
    });

    if (!existing) {
      console.log("Comment not found:", id);
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // ✅ Safe to delete
    await prisma.comment.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (error: any) {
    console.error("Failed to delete comment:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
