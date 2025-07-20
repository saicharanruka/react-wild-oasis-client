"use client";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../_lib/actions";

function ReservationList({ bookings }) {
	const [optimisedBookings, setOptimisedBookings] = useOptimistic(
		bookings,
		(curr, bookingId) => {
			return curr.filter((b) => b.id !== bookingId);
		}
	);

	async function handleDelete(bookingId) {
		setOptimisedBookings(bookingId);
		await deleteReservation(bookingId);
	}

	return (
		<ul className="space-y-6">
			{optimisedBookings.map((booking) => (
				<ReservationCard
					booking={booking}
					onDelete={handleDelete}
					key={booking.id}
				/>
			))}
		</ul>
	);
}

export default ReservationList;
