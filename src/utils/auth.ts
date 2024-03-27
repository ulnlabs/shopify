import { connectDB } from "@/app/mongoose/db";
import User from "@/app/mongoose/models/User";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign In",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = (await credentials) as {
          email: string;
          password: string;
        };
        
        if (!credentials || !email || !password) return null;
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) return null;
        const verifypassword = await bcrypt.compare(password, user.password);
        
        console.log(await bcrypt.compare(password,user.password));
        
        if (!verifypassword) return null;
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      interface ExtendedUser {
        role?: string;
      }
      const extendedUser = user as ExtendedUser;
      if (extendedUser?.role) {
        return {
          ...token,
          role: extendedUser.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
        },
      };
    },
  },
};
