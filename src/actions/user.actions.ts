"use server";

import * as z from "zod";
import { validateRequest } from "@/auth";
import db from "@/lib/db";
import { userRecipeSchema } from "@/schema";
import { revalidatePath } from "next/cache";

export const getUserInfo = (id: string) => {
	const user = db.user.findFirst({
		where: {
			id: id,
		},
	});

	return user;
};

export const submitUserBio = async (id: string, bio: string) => {
	const session = await validateRequest();

	if (session.user?.id === undefined) {
		throw new Error("User ID is required");
	}

	if (session.user?.id !== id) {
		throw new Error("User ID does not match the session user ID");
	}

	const user = db.user.update({
		where: {
			id: id,
		},
		data: {
			bio: bio,
		},
	});

	return user;
};

export const uploadProfileImage = async (id: string, image: string) => {
	console.log("Received imageUrl:", image); // Log received imageUrl

	try {
		const session = await validateRequest();
		const sessionId = session.user?.id;

		const existingUser = await db.user.findFirst({
			where: {
				id: sessionId,
			},
		});

		if (!existingUser) {
			return {
				error: "Unauthorized",
			};
		} else {
			await db.user.update({
				where: {
					id: existingUser.id,
				},
				data: {
					profileImage: image,
				},
			});
			console.log("Profile updated successfully");
			return {
				success: "Profile updated successfully",
			};
		}
	} catch (error) {
		console.error("Error updating avatar:", error); // Log any errors
		return {
			error: "An error occurred while updating the profile image",
		};
	}
};

export const submitUserRecipe = async (
	values: Omit<z.infer<typeof userRecipeSchema>, "image"> & { totalSrp: number; image: { img: string }[] },
) => {
	try {
		const session = await validateRequest();

		if (!session.user) {
			throw new Error("User not found");
		}

		const { ingredients, image, ...recipes } = values;

		await db.recipe.create({
			data: {
				...recipes,
				ingredients: {
					create: ingredients,
				},
				recipeImage: {
					create: image,
				},
				userId: session.user.id,
			},
		});

		return {
			success: "Recipe posted successfully!",
		};
	} catch (error) {
		console.error("Error submitting recipe:", error);
		return {
			error: "An unknown error occurred",
		};
	}
};

export const userFollow = async (id: string, currentUserId: string, revalidate: string | undefined = undefined) => {
	try {
		await db.follows.create({
			data: {
				followerId: currentUserId, // The user initiating the follow
				userId: id, // The user being followed
			},
		});
		if (!!revalidate) {
			revalidatePath(revalidate);
		}
		revalidatePath("/home");
	} catch (error) {
		console.log(error);
	}
};

export const userUnfollow = async (id: string, currentUserId: string, revalidate: string | undefined = undefined) => {
	try {
		await db.follows.deleteMany({
			where: {
				followerId: currentUserId,
				userId: id,
			},
		});
		if (!!revalidate) {
			revalidatePath(revalidate);
		}
		revalidatePath("/home");
	} catch (error) {
		console.log(error);
	}
};
