import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
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
    async jwt({ profile, token }) {
      if (profile) {
        token.login = profile.login;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log('session token: ', session);
      return { ...session, user: { ...session.user, login: token.login } };
    },
  },
});
