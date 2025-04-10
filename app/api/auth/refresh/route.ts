import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    
    // Return the current session data
    return NextResponse.json({
      success: true,
      user: session.user
    });
    
  } catch (error) {
    console.error("Error refreshing auth session:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 