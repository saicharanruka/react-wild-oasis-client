"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function getCurrentGuestBookingIds() {
	const session = await auth();
	if (!session) throw new Error("You must be logged in");

	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingIds = guestBookings.map((booking) => booking.id);

	return guestBookingIds;
}

export async function signInAction() {
	await signIn("github", { redirectTo: "/account" });
}

export async function signOutAction() {
	await signOut({ redirectTo: "/" });
}

export default async function updateGuest(formData) {
	const session = await auth();
	if (!session) throw new Error("You must be loggin in");

	const nationalID = formData.get("nationalID");
	const [nationality, countryFlag] = formData.get("nationality").split("%");

	if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
		throw new Error("Invalid National ID");
	}

	const updateData = { nationality, countryFlag, nationalID };

	const { error } = await supabase
		.from("guests")
		.update(updateData)
		.eq("id", session.user.guestId);

	if (error) {
		throw new Error("Booking could not be updated");
	}

	revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
	await new Promise((res) => setTimeout(res, 3000)); //delay
	const guestBookingIds = await getCurrentGuestBookingIds();

	if (!guestBookingIds.includes(bookingId)) {
		throw new Error("You do not have this reservation");
	}

	const { error } = await supabase
		.from("bookings")
		.delete()
		.eq("id", bookingId);

	if (error) throw new Error("Booking could not be deleted");

	revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
	const bookingId = Number(formData.get("bookingId"));
	const updateData = {
		numGuests: Number(formData.get("numGuests")),
		observations: formData.get("observations").slice(0, 200),
	};

	// Checking for authorization
	const guestBookingIds = await getCurrentGuestBookingIds();
	if (!guestBookingIds.includes(bookingId)) {
		throw new Error("You do not have this reservation");
	}

	const { error } = await supabase
		.from("bookings")
		.update(updateData)
		.eq("id", bookingId)
		.select()
		.single();
	if (error) throw new Error("Booking could not be updated");

	revalidatePath("/account/reservations");
	revalidatePath(`/account/reservations/edit/${bookingId}`);

	redirect("/account/reservations");
}
