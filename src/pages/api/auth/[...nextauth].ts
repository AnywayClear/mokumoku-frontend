import NextAuth, { NextAuthOptions } from 'next-auth';

import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
    {
      id: 'kakao2',
      name: 'Kakao2',
      type: 'oauth',
      authorization: `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/kakao`,
      profile(profile) {
        return {
          id: profile.id || '',
        };
      },
    },
  ],

  callbacks: {
    async session({ session, token, user, trigger, newSession }) {
      // session.user?.email = user;

      //   console.log({ name: 'hi' });
      //   if (trigger == 'update' && newSession?.name) {
      //     session.user = {};
      //     session.user.name = newSession.name;
      //   }

      session.user = token;

      return session;
    },
    async redirect({ url, baseUrl }) {
      return 'http://localhost:3000/oauth2/redirect';
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }

      return { ...token, ...user };
    },
  },
  pages: {
    signIn: `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/kakao`,
  },
};

export default NextAuth(authOptions);
