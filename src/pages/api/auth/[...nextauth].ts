import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      // @ts-ignore
      clientId: process.env.GITHUB_ID,
      // @ts-ignore
      clientSecret: process.env.GITHUB_SECRET,
      async profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          login: profile.login,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ profile, token, account }) {
      if (profile) {
        token.login = profile.login;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    // @ts-ignore
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        user: { ...session.user, login: token.login },
      };
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
