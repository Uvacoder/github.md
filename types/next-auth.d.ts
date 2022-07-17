import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      login: string;
      image: string;
      email: string;
    };
  }
}
