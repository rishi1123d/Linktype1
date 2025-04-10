import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { generateLinkedInPost } from "@/lib/openai-service";

// Define types
interface ContentGenerationParams {
  topic: string;
  tone?: string;
  length?: string;
  instructions?: string;
}

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Parse the request body
    const body = await request.json();
    const { topic, tone, length, instructions } = body as ContentGenerationParams;

    // Validate required fields
    if (!topic) {
      return NextResponse.json(
        { error: 'A topic is required to generate content' },
        { status: 400 }
      );
    }

    // For now, simulate AI generation with a timeout
    // In a real implementation, you would call an AI API like OpenAI here
    
    // This is a template for a winning hackathon post - customize based on topic
    const generateHackathonPost = (topic: string, tone: string = 'professional') => {
      if (topic.toLowerCase().includes('stanfordhacks') || topic.toLowerCase().includes('hackathon')) {
        return `🏆 Thrilled to announce that our team just won StanfordHacks 2023! 

After 36 intense hours of coding, debugging, and way too much caffeine, we built an AI-powered solution that helps small businesses automate customer support through natural language processing.

Here's what I learned from this incredible experience:

1️⃣ The power of diverse teams: Our success came from combining ML expertise, UX design, and business knowledge. Each perspective was essential to our solution.

2️⃣ Fail fast, iterate faster: Our initial approach hit roadblocks with sentiment analysis accuracy. Pivoting to a hybrid model improved accuracy by 34% and saved precious hours.

3️⃣ User testing matters even in hackathons: Getting feedback from potential users midway completely changed our UI approach and made our demo much more compelling to judges.

The most rewarding moment? Seeing a local business owner's reaction when we demonstrated how our tool could save them 15+ hours weekly on customer inquiries.

Has anyone else participated in hackathons recently? What unexpected lessons did you take away from the experience? 

#StanfordHacks #AIInnovation #TechForGood #HackathonWinners`;
      } else {
        // Generate a professional post based on the topic
        return `I've been researching ${topic} extensively over the past weeks, and I'm excited to share some key insights.

First, ${topic} is fundamentally changing how organizations approach challenges in our industry. Recent data shows that companies embracing these methods are seeing 23% better outcomes than traditional approaches.

Three critical success factors I've identified:

1️⃣ Cross-functional collaboration is essential - the most successful implementations involve teams across departments
2️⃣ Starting with small, measurable pilot projects builds momentum and executive buy-in
3️⃣ Continuous learning and adaptation is key as this field evolves rapidly

What's particularly interesting is how early adopters are gaining significant competitive advantages - with only about 15% of companies having fully implemented comprehensive strategies around ${topic}.

Has your organization started exploring ${topic}? What challenges or successes have you encountered? I'd love to hear your perspectives in the comments.

#${topic.replace(/\s+/g, '')} #ProfessionalInsights #IndustryTrends`;
      }
    };

    // Wait a short time to simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const content = generateHackathonPost(topic, tone);

    // Return generated content
    return NextResponse.json({ content });

  } catch (error: any) {
    console.error("Error in AI content generation API:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate content" },
      { status: 500 }
    );
  }
} 