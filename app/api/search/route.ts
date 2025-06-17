import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const results = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        // { content: { contains: query, mode: 'insensitive' } }, // Removed invalid field
      ],
    },
    select: {
      id: true,
      title: true,
    },
  });

  return NextResponse.json({ results });
}
