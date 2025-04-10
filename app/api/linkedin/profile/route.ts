import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    
    // Always use "Rishi Kanaparti" as the user's name
    const profileData = {
      id: session.user.id || "user-id",
      firstName: "Rishi",
      lastName: "Kanaparti",
      email: "rishi@example.com",
      pictureUrl: "/1731544051828.jpeg" // Use the uploaded profile picture
    };
    
    // Generate consistent stats
    const stats = {
      followers: 782,
      connections: 348,
      profileViews: 42,
      postImpressions: 2006
    };
    
    // Create realistic looking posts
    const recentPosts = [
      {
        id: "post1",
        content: "Just shared my thoughts on the latest AI advancements. Check out my article!",
        likes: 57,
        comments: 23,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      {
        id: "post2",
        content: "Excited to announce our latest product launch! #Innovation #Growth",
        likes: 124,
        comments: 32,
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      {
        id: "post3",
        content: "Grateful for the amazing feedback on my recent presentation at the conference.",
        likes: 89,
        comments: 17,
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }
    ];
    
    return NextResponse.json({
      profile: profileData,
      stats,
      recentPosts
    });
    
  } catch (error) {
    console.error("Error in LinkedIn profile API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 