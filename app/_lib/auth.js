import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { createGuest, getGuest } from "./data-service";

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
	callbacks: {
		authorized({ auth }) {
			return !!auth?.user;
		},
		async signIn({ user }) {
			try {
				const existingGuest = await getGuest(user.email);

				if (!existingGuest) {
					await createGuest({ email: user.email, fullName: user.name });
				}
				return true;
			} catch {
				return false;
			}
		},
		async session({ session }) {
			const guest = await getGuest(session.user.email);
			session.user.guestId = guest.id;

			return session;
		},
	},
	pages: {
		signIn: "/login",
		signOut: "/",
	},
});
