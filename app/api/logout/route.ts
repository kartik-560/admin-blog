// app/api/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().set("admin-auth", "", {
    maxAge: 0,
    path: "/",
  });

  return NextResponse.json({ success: true });
}
