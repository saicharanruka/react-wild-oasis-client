"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

const filterItems = [
	{ filter: "all", text: "All cabins" },
	{ filter: "small", text: "1-3 guests" },
	{ filter: "medium", text: "4-7 guests" },
	{ filter: "large", text: "8-12 guests" },
];

function Filter() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const activeFilter = searchParams.get("capacity") ?? "all";

	function handleFilter(filter) {
		const params = new URLSearchParams(searchParams);
		params.set("capacity", filter);

		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	}

	return (
		<div className="border border-primary-800 flex">
			{filterItems.map((item) => (
				<Button
					key={item.filter}
					text={item.text}
					filter={item.filter}
					activeFilter={activeFilter}
					handleFilter={handleFilter}
				/>
			))}
		</div>
	);
}

function Button({ text, filter, activeFilter, handleFilter }) {
	return (
		<button
			className={`px-5 py-2 hover:bg-primary-700 ${
				activeFilter === filter ? "bg-primary-700" : ""
			}`}
			onClick={() => handleFilter(filter)}
		>
			{text}
		</button>
	);
}

export default Filter;

// <div className="border border-primary-800 flex">
// 	<button
// 		className="px-5 py-2 hover:bg-primary-700"
// 		onClick={() => handleFilter("all")}
// 	>
// 		All cabins
// 	</button>
// 	<button
// 		className="px-5 py-2 hover:bg-primary-700"
// 		onClick={() => handleFilter("small")}
// 	>
// 		1-3 guests
// 	</button>
// 	<button
// 		className="px-5 py-2 hover:bg-primary-700"
// 		onClick={() => handleFilter("medium")}
// 	>
// 		4-7 guests
// 	</button>
// 	<button
// 		className="px-5 py-2 hover:bg-primary-700"
// 		onClick={() => handleFilter("large")}
// 	>
// 		8-12 guests
// 	</button>
// </div>
