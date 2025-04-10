// Alternative approach without OpenID Connect
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { LinkedInProvider } from "@/lib/linkedin-provider"

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      linkedInProfile?: any;
    }
  }
}

// Determine if we're in development
const isDevelopment = process.env.NODE_ENV === 'development';
const cookiePrefix = isDevelopment ? '' : '__Secure-';

const handler = NextAuth({
  // Remove the adapter to use JWT-based sessions
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    LinkedInProvider()
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login", // Error code passed in query string as ?error=
  },
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: isDevelopment ? false : true
      }
    },
    callbackUrl: {
      name: `${cookiePrefix}next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: isDevelopment ? false : true
      }
    },
    csrfToken: {
      name: `${cookiePrefix}next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: isDevelopment ? false : true
      }
    },
    state: {
      name: `${cookiePrefix}next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: isDevelopment ? false : true,
        maxAge: 900 // 15 minutes
      }
    }
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      
      // Always set the name to "Rishi Kanaparti" and use the uploaded profile picture
      token.name = "Rishi Kanaparti";
      token.picture = "/1731544051828.jpeg";
      
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || "user-id";
        
        // Always set the user name to "Rishi Kanaparti"
        session.user.name = "Rishi Kanaparti";
        
        // Always use the uploaded profile picture
        session.user.image = "/1731544051828.jpeg";
        
        // Set a default email
        session.user.email = session.user.email || "rishi@example.com";
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  logger: {
    error(code, metadata) {
      console.error("NEXTAUTH_ERROR", { code, metadata });
    },
    warn(code) {
      console.warn("NEXTAUTH_WARNING", { code });
    },
    debug(code, metadata) {
      console.debug("NEXTAUTH_DEBUG", { code, metadata });
    }
  },
  debug: true,
  // Explicitly set the secure cookies based on environment
  useSecureCookies: !isDevelopment,
})

export { handler as GET, handler as POST }