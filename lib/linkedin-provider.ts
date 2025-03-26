// lib/linkedin-provider.ts
import type { OAuthConfig } from "next-auth/providers/oauth"

export const LinkedInCustomProvider: OAuthConfig<any> = {
  id: "linkedin",
  name: "LinkedIn",
  type: "oauth",
  clientId: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  
  authorization: {
    url: "https://www.linkedin.com/oauth/v2/authorization",
    params: {
      scope: "profile email openid",
      response_type: "code"
    }
  },
  
  token: {
    url: "https://www.linkedin.com/oauth/v2/accessToken",
    async request(context) {
      const { provider, params } = context;
      
      const body = new URLSearchParams({
        client_id: provider.clientId as string,
        client_secret: provider.clientSecret as string,
        grant_type: "authorization_code",
        code: params.code as string,
        redirect_uri: provider.callbackUrl
      });
      
      const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body
      });
      
      const tokens = await res.json();
      return { tokens };
    }
  },
  
  userinfo: {
    url: "https://api.linkedin.com/v2/userinfo",
    async request({ tokens }) {
      const res = await fetch("https://api.linkedin.com/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`
        }
      });
      
      return await res.json();
    }
  },
  
  checks: ["state"],
  
  profile(profile) {
    return {
      id: profile.sub || profile.id,
      name: profile.name,
      email: profile.email,
      image: profile.picture
    }
  }
} 