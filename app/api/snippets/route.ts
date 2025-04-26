import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const snippetSchema = z.object({
  title: z.string().min(1, "Title is required"),
  code: z.string().min(1, "Code is required"),
  language: z.string().min(1, "Language is required"),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, code, language, description, tags } =
      snippetSchema.parse(body);

    const snippet = await prisma.snippet.create({
      data: {
        title,
        code,
        language,
        description,
        userId: session.user.id,
        tags: tags
          ? {
              connectOrCreate: tags.map((tag) => ({
                where: { name: tag },
                create: { name: tag },
              })),
            }
          : undefined,
      },
      include: {
        tags: true,
      },
    });

    return NextResponse.json(snippet, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const language = searchParams.get("language") || "";
    const tag = searchParams.get("tag") || "";

    const snippets = await prisma.snippet.findMany({
      where: {
        userId: session.user.id,
        AND: [
          {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
              { code: { contains: search, mode: "insensitive" } },
            ],
          },
          language
            ? {
                language: {
                  equals: language,
                  mode: "insensitive",
                },
              }
            : {},
          tag
            ? {
                tags: {
                  some: {
                    name: {
                      equals: tag,
                      mode: "insensitive",
                    },
                  },
                },
              }
            : {},
        ],
      },
      include: {
        tags: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(snippets);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
