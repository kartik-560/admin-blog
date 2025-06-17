import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: Fetch a post by ID
export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.post.findFirst({
      where: { slug: params.slug },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error: any) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

// PUT: Update a post by ID
export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await req.json();
    console.log("🔧 Updating post with slug:", params.slug);

    const updatedPost = await prisma.post.update({
      where: { slug: params.slug },
      data: {
        title: body.title,
        slug: body.slug,
        desc: body.desc,
        img: body.img,
        catSlug: body.catSlug,
        userEmail: body.userEmail,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error: any) {
    console.error("❌ Failed to update post:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// DELETE: Remove a post by ID
// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   console.log("Deleting post with ID:", params.id);

//   try {
//     await prisma.post.delete({
//       where: { id: params.id },
//     });

//     return NextResponse.json({ message: "Post deleted successfully" });
//   } catch (error: any) {
//     console.error("Failed to delete post:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   console.log("Incoming DELETE request for post ID:", params.id);

//   try {
//     // Check if post exists
//     const post = await prisma.post.findUnique({ where: { id: params.id } });
//     console.log("Fetched post:", post);

//     if (!post) {
//       console.error("Post not found for ID:", params.id);
//       return NextResponse.json({ error: "Post not found" }, { status: 404 });
//     }

//     // Proceed with delete
//     await prisma.post.delete({
//       where: { id: params.id },
//     });

//     return NextResponse.json({ message: "Post deleted successfully" });
//   } catch (error: any) {
//     console.error("Failed to delete post:", error.message, error.stack);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
