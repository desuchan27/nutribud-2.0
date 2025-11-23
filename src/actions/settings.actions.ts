"use server";

import { validateRequest } from "@/auth";
import db from "@/lib/db";
import { userInfoSchema, userSettingsSchema } from "@/schema";
import { revalidatePath } from "next/cache";
import { Argon2id } from "oslo/password";
import * as z from "zod";

export const updateUserSettings = async (values: z.infer<typeof userSettingsSchema>) => {
	const { firstName, lastName, username, image, email, bio, currentPassword, newPassword, confirmNewPassword } = values;

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
		const updatedData: {
			firstName: string;
			lastName: string;
			username: string;
			email: string;
			profileImage: string;
			bio: string;
			password?: string;
		} = {
			firstName,
			lastName,
			username,
			email,
			profileImage: image,
			bio,
		};

		if (newPassword && confirmNewPassword) {
			if (newPassword !== confirmNewPassword) {
				return {
					error: "Passwords do not match",
				};
			} else {
				const validPassword = await new Argon2id().verify(existingUser.password, currentPassword as string);

				if (validPassword) {
					const hashedPassword = await new Argon2id().hash(newPassword);
					updatedData.password = hashedPassword;
				} else {
					return {
						error: "Incorrect current password",
					};
				}
			}
		}

		await db.user.update({
			where: {
				id: sessionId,
			},
			data: updatedData,
		});

		return {
			success: "User settings updated successfully",
		};
	}
};

export const updateUserInfo = async (values: z.infer<typeof userInfoSchema>) => {
	const { birthDate, height, weight, monthlyBudget, allergies } = values;

	const session = await validateRequest();
	const sessionId = session.user?.id;

	const existingUserInfo = await db.userInfo.findFirst({
		where: {
			userId: sessionId,
		},
	});

	if (!existingUserInfo) {
		return {
			error: "User info not found",
		};
	}

	await db.allergies.deleteMany({
		where: {
			userInfoId: existingUserInfo.id,
		},
	});

	await db.userInfo.update({
		where: {
			userId: sessionId,
		},
		data: {
			birthDate,
			height,
			weight,
			monthyBudget: monthlyBudget,
			allergies: {
				create: allergies,
			},
		},
	});
	revalidatePath("/home");
	if (!!session.user?.username) {
		revalidatePath(`/${session.user.username}`);
	}
	return {
		success: "User info updated successfully",
	};
};
