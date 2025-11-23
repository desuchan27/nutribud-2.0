"use server";

import db from "@/lib/db";
import * as z from "zod";
import { userInfoSchema } from "@/schema";
import { validateRequest } from "@/auth";

export const getUser = async (id: string) => {
	const user = await db.user.findFirst({
		where: {
			id: id,
		},
		include: {
			userInfo: true, // Include userInfo in the query
		},
	});

	if (!user) {
		return { redirect: "/login" };
	}

	const userInfo = user.userInfo;

	if (userInfo) {
		return { redirect: "/home" };
	}

	if (user && !userInfo) {
		return { redirect: `/onboarding/${id}` };
	}

	if (!user) {
		return { redirect: "/login" };
	}

	return { user };
};

export const submitUserInfo = async (userId: string, values: z.infer<typeof userInfoSchema>) => {
	const { birthDate, height, weight, monthlyBudget, allergies } = values;
	const session = await validateRequest();

	try {
		if (session.user?.id !== userId) {
			return { error: "User not found" };
		}

		// Check if UserInfo exists
		const userInfo = await db.userInfo.findUnique({
			where: { userId },
		});

		if (userInfo) {
			// If UserInfo exists, update it
			await db.allergies.deleteMany({
				where: {
					userInfoId: userInfo.id,
				},
			});

			await db.user.update({
				where: { id: userId },
				data: {
					userInfo: {
						update: {
							birthDate,
							height,
							weight,
							monthyBudget: monthlyBudget ?? 0,
							allergies: {
								create: allergies,
							},
						},
					},
				},
			});

			return { success: true };
		} else {
			// If UserInfo does not exist, create a new UserInfo record
			await db.user.update({
				where: { id: userId },
				data: {
					userInfo: {
						create: {
							birthDate,
							height,
							weight,
							monthyBudget: monthlyBudget ?? 0,
							allergies: {
								create: allergies,
							},
						},
					},
				},
			});

			return { success: true };
		}
	} catch (error) {
		console.error("Error updating user info:", error);
		return { error: "An unknown error occurred" };
	}
};
