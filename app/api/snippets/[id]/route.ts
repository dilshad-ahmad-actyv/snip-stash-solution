import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { categorizeSnippet } from "@/lib/categorize";
import { authOptions } from "../../auth/[...nextauth]/route";
import { z } from "zod";

const snippetUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  code: z.string().min(1).optional(),
  language: z.string().min(1).optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const snippet = await prisma.snippet.findUnique({
      where: { id: params.id },
      include: { tags: true },
    });

    if (!snippet) {
      return new NextResponse("Snippet not found", { status: 404 });
    }

    if (snippet.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const body = await req.json();
    const validatedData = snippetUpdateSchema.parse(body);

    // Generate smart tags if code is updated
    let allTags = validatedData.tags || [];
    if (validatedData.code) {
      const smartTags = categorizeSnippet(validatedData.code);
      allTags = [...new Set([...allTags, ...smartTags])];
    }

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

    const updatedSnippet = await prisma.snippet.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        tags: {
          set: [], // Clear existing tags
          connect: tagConnections,
        },
      },
      include: {
        tags: true,
      },
    });

    return NextResponse.json(updatedSnippet);
  } catch (error) {
    console.error("Error updating snippet:", error);
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request data", { status: 400 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const snippet = await prisma.snippet.findUnique({
      where: { id: params.id },
    });

    if (!snippet) {
      return new NextResponse("Snippet not found", { status: 404 });
    }

    if (snippet.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await prisma.snippet.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting snippet:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const snippet = await prisma.snippet.findUnique({
      where: { id: params.id },
      include: { tags: true },
    });

    if (!snippet) {
      return new NextResponse("Snippet not found", { status: 404 });
    }

    if (snippet.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    return NextResponse.json(snippet);
  } catch (error) {
    console.error("Error fetching snippet:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
