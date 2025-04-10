import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { improveContent, ContentImprovementParams } from "@/lib/openai-service";

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Parse the request body
    const body = await request.json();
    const { content, action, tone } = body as ContentImprovementParams;

    // Validate required fields
    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }
    
    if (!action) {
      return NextResponse.json({ error: "Action is required" }, { status: 400 });
    }

    // Check if action is valid
    const validActions = ['improve-readability', 'check-grammar', 'generate-hooks', 'add-statistics', 'rewrite'];
    if (!validActions.includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    // Improve content
    const improvedContent = await improveContent({ content, action, tone });

    // Return improved content
    return NextResponse.json({ content: improvedContent });

  } catch (error: any) {
    console.error("Error in AI content improvement API:", error);
    return NextResponse.json(
      { error: error.message || "Failed to improve content" },
      { status: 500 }
    );
  }
} 