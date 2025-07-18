import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";

const josefin = Josefin_Sans({ subsets: ["latin"] });

export const metadata = {
	// title: "The Wild Oasis",
	title: { template: "%s | The Wild Oasis ", default: "The Wild Oasis" },

	description: "A place to relax and enjoy the outdoors.",
};

export default function Layout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${josefin.className} antialiased min-h-screen bg-primary-950 text-primary-100 flex flex-col`}
			>
				<Header />
				<div className="flex-1 px-8 py-12 grid">
					<main className="maw-w-7xl mx-auto w-full">{children}</main>
				</div>
			</body>
		</html>
	);
}
