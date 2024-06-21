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
        const { username, password } = (await credentials) as {
          username: string;
          password: string;
        };
        
        if (!credentials || !username || !password) return null;
        await connectDB();
        const user = await User.findOne({ username });
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
        username?: string;
      }
      const extendedUser = user as ExtendedUser;      
      if (extendedUser?.role) {
        return {
          ...token,
          role: extendedUser.role,
          username:extendedUser.username,
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
          username:token.username
        },
      };
    },
  },
};
