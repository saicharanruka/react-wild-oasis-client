import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	providers: [
		GitHub({
			// ✅ Matches import name
			clientId: process.env.AUTH_GITHUB_ID,
			clientSecret: process.env.AUTH_GITHUB_SECRET,
		}),
	],
});
