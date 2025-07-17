import Image from "next/image";
import Link from "next/link";
import Navigation from "./_components/Navigation";

export default function Home() {
	return (
		<div>
			<h1>The Wild Oasis</h1>
			<Link href="/cabins">Cabins</Link>
		</div>
	);
}
