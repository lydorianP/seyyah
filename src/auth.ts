import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const users = await sql`
          SELECT * FROM "user" WHERE email = ${credentials.email as string}
        `;
        const user = users[0];
        if (!user) return null;

        // If the user has a hashed password, compare it
        if (user.password) {
          const bcrypt = (await import("bcryptjs")).default;
          const valid = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
          if (!valid) return null;
        } else {
          // Temporary admin password
          if (user.role === "admin" && (credentials.password as string) === "admin123") {
            // allowed
          } else {
            return null;
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
});