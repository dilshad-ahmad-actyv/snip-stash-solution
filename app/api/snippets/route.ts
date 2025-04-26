import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { categorizeSnippet } from "@/lib/categorize";
import { authOptions } from "../auth/[...nextauth]/route";
import { z } from "zod";

const snippetSchema = z.object({
  title: z.string().min(1),
  code: z.string().min(1),
  language: z.string().min(1),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const validatedData = snippetSchema.parse(body);

    // Generate smart tags
    const smartTags = categorizeSnippet(validatedData.code);
    const allTags = [...new Set([...(validatedData.tags || []), ...smartTags])];

    // Create or connect tags
    const tagConnections = await Promise.all(
      allTags.map(async (tagName) => {
        const tag = await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        });
        return { id: tag.id };
      })
    );

    const snippet = await prisma.snippet.create({
      data: {
        title: validatedData.title,
        code: validatedData.code,
        language: validatedData.language,
        description: validatedData.description,
        userId: session.user.id,
        tags: {
          connect: tagConnections,
        },
      },
      include: {
        tags: true,
      },
    });

    return NextResponse.json(snippet);
  } catch (error) {
    console.error("Error creating snippet:", error);
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request data", { status: 400 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const language = searchParams.get("language");
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");

    const where = {
      userId: session.user.id,
      ...(language ? { language } : {}),
      ...(tag ? { tags: { some: { name: tag } } } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { code: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const snippets = await prisma.snippet.findMany({
      where,
      include: {
        tags: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(snippets);
  } catch (error) {
    console.error("Error fetching snippets:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
