"use client";
import { useState } from "react";

function Counter({ users }) {
	const [count, setCount] = useState(0);

	return (
		<div>
			<p>There are {users.length} users.</p>
			<button onClick={() => setCount((c) => c + 1)}>Click me! {count}</button>
		</div>
	);
}

export default Counter;
