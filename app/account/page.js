import { auth } from "../_lib/auth";

export const metadata = {
	title: "Account",
};

async function Page() {
	const session = await auth();

	return (
		<h2 className="font-semibold text-2xl text-accent-400 mb-7">
			Welcome, {session.user.name}
		</h2>
	);
}

export default Page;
