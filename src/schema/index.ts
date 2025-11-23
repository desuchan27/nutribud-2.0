import * as z from "zod";

export const registerUserSchema = z
	.object({
		email: z.string().email({
			message: "Email is required",
		}),
		firstName: z.string().min(1, {
			message: "First Name is required",
		}),
		lastName: z.string().min(1, {
			message: "Last Name is required",
		}),
		username: z
			.string()
			.min(6, {
				message: "Username must be at least 6 characters",
			})
			.max(20, {
				message: "Username must be at most 20 characters",
			}),
		password: z
			.string()
			.min(6, { message: "Password must be at least 6 characters" })
			.regex(/[A-Z]/, {
				message: "Password must contain at least one uppercase letter",
			})
			.regex(/[^a-zA-Z0-9]/, {
				message: "Password must contain at least one special character",
			}),
		confirmPassword: z.string().min(1, {
			message: "Enter the same password",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"], // Set the path of the error to 'confirmPassword'
	});

export const loginUserSchema = z.object({
	email: z.string().email({
		message: "Invalid Email/Doesn't exist",
	}),
	password: z.string().min(6, {
		message: "Wrong Password",
	}),
});

export const userInfoSchema = z.object({
	birthDate: z
		.string()
		.refine((val) => !isNaN(Date.parse(val)), {
			message: "Invalid Date",
		})
		.transform((val) => new Date(val)), // Ensure it converts to a Date object
	height: z.coerce.number().min(140, {
		message: "Height must be greater than 140 cm",
	}),
	weight: z.coerce.number().min(40, {
		message: "Weight must be greater than 40 kg",
	}),
	monthlyBudget: z.number().min(1, "Please add your monthly budget."),
	allergies: z.array(
		z.object({
			name: z.string(),
		}),
	),
});

export const userBioSchema = z.object({
	bio: z.string().max(500, {
		message: "Bio must be less than 500 characters",
	}),
});

export const userProfileImageSchema = z.object({
	imageUrl: z.string(),
});

export const userRecipeSchema = z.object({
	title: z
		.string()
		.min(5, {
			message: "Title is required",
		})
		.max(50, {
			message: "Title must be less than 50 characters",
		}),
	ingredients: z
		.array(
			z.object({
				name: z.string().min(2, {
					message: "Ingredients is/are required",
				}),
				srp: z
					.number({ message: "SRP for ingredient is required" })
					.nonnegative()
					.refine((num) => num > 0, "SRP for ingredient is required"),
			}),
		)
		.min(1, "Ingredients is/are required"),
	procedure: z.string().min(5, {
		message: "Procedure is required",
	}),
	image: z.array(z.string()),
	Calories: z.number({ message: "Calories for ingredient is required" }).nonnegative(),
	Protein: z.number({ message: "Protein for ingredient is required" }).nonnegative(),
	Carbs: z.number({ message: "Carbs for ingredient is required" }).nonnegative(),
	Fat: z.number({ message: "Fat for ingredient is required" }).nonnegative(),
	Fiber: z.number({ message: "Fiber for ingredient is required" }).nonnegative(),
	Sugar: z.number({ message: "Sugar for ingredient is required" }).nonnegative(),
	Sodium: z.number({ message: "Sodium for ingredient is required" }).nonnegative(),
	Potassium: z.number({ message: "Potassium for ingredient is required" }).nonnegative(),
	VitaminC: z.number({ message: "VitaminC for ingredient is required" }).nonnegative(),
	VitaminA: z.number({ message: "VitaminA for ingredient is required" }).nonnegative(),
	Calcium: z.number({ message: "Calcium for ingredient is required" }).nonnegative(),
	Iron: z.number({ message: "Iron for ingredient is required" }).nonnegative(),
});

export const userSettingsSchema = z
	.object({
		image: z.string(),
		email: z.string().email({
			message: "Email is required",
		}),
		firstName: z.string().min(1, {
			message: "First Name is required",
		}),
		lastName: z.string().min(1, {
			message: "Last Name is required",
		}),
		username: z
			.string()
			.min(6, {
				message: "Username must be at least 6 characters",
			})
			.max(20, {
				message: "Username must be at most 20 characters",
			}),
		bio: z.string().max(500, {
			message: "Bio must be less than 500 characters",
		}),
		currentPassword: z.string().optional(),

		newPassword: z.string().optional(),
		confirmNewPassword: z.string().optional(),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"], // Set the path of the error to 'confirmPassword'
	});
