import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

export const metadata = {
	title: "The Wild Oasis",
	description: "A place to relax and enjoy the outdoors.",
};

export default function Layout({ children }) {
	return (
		<html lang="en">
			<body>
				<header>
					<Logo />
				</header>
				<Navigation />
				<main>{children}</main>
			</body>
		</html>
	);
}
