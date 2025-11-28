"use server";

import * as z from "zod";
import { validateRequest } from "@/auth";
import db from "@/lib/db";
import { userRecipeSchema } from "@/schema";
import { revalidatePath } from "next/cache";
import { sanitizeText, sanitizeHtml } from "@/lib/sanitize";
import { logUnauthorizedAccess, logAccountChange } from "@/lib/logger";

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

	// Sanitize bio input to prevent XSS
	const sanitizedBio = sanitizeHtml(bio);

	const user = db.user.update({
		where: {
			id: id,
		},
		data: {
			bio: sanitizedBio,
		},
	});

	// Log account change
	logAccountChange(id, "bio_update");

	return user;
};

export const uploadProfileImage = async (id: string, image: string) => {
	try {
		const session = await validateRequest();
		
		if (!session.user) {
			return {
				error: "Unauthorized",
			};
		}

		// Verify that id parameter matches session user
		if (session.user.id !== id) {
			return {
				error: "Unauthorized",
			};
		}

		await db.user.update({
			where: {
				id: session.user.id,
			},
			data: {
				profileImage: image,
			},
		});
		
		return {
			success: "Profile updated successfully",
		};
	} catch (error) {
		// Log detailed error server-side, return generic message to client
		console.error("Error updating avatar:", error);
		const isProduction = process.env.NODE_ENV === "production";
		return {
			error: isProduction 
				? "An error occurred while updating the profile image"
				: error instanceof Error ? error.message : "An error occurred while updating the profile image",
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

		// Sanitize user-generated content to prevent XSS
		const sanitizedRecipe = {
			...recipes,
			title: sanitizeText(recipes.title),
			procedure: sanitizeHtml(recipes.procedure),
		};

		const sanitizedIngredients = ingredients.map((ing) => ({
			...ing,
			name: sanitizeText(ing.name),
		}));

		await db.recipe.create({
			data: {
				...sanitizedRecipe,
				ingredients: {
					create: sanitizedIngredients,
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
		// Verify that currentUserId matches the session user
		const session = await validateRequest();
		if (!session.user || session.user.id !== currentUserId) {
			logUnauthorizedAccess(`follow:${id}`, currentUserId);
			return {
				error: "Unauthorized",
			};
		}

		// Prevent self-following
		if (id === currentUserId) {
			return {
				error: "Cannot follow yourself",
			};
		}

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
		return { success: true };
	} catch (error) {
		console.log(error);
		return {
			error: "An error occurred while following the user",
		};
	}
};

export const userUnfollow = async (id: string, currentUserId: string, revalidate: string | undefined = undefined) => {
	try {
		// Verify that currentUserId matches the session user
		const session = await validateRequest();
		if (!session.user || session.user.id !== currentUserId) {
			logUnauthorizedAccess(`unfollow:${id}`, currentUserId);
			return {
				error: "Unauthorized",
			};
		}

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
		return { success: true };
	} catch (error) {
		console.log(error);
		return {
			error: "An error occurred while unfollowing the user",
		};
	}
};
