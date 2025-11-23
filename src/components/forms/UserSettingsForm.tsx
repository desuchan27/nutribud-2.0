"use client";
import { Control, useFieldArray, useForm } from "react-hook-form";
import Image from "next/image";
import { User, Prisma } from "@prisma/client";
import * as z from "zod";
import { startTransition, useRef, useState } from "react";
import { userSettingsSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionContainerStart } from "../containers/SectionContainer";
import { UploadButton } from "@/utils/uploadthing";
import { updateUserInfo, updateUserSettings } from "@/actions/settings.actions";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";

interface UserSettingsFormProps {
	userData: User | null;
}

export function UserSettingsForm({ userData }: UserSettingsFormProps) {
	const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

	const form = useForm<z.infer<typeof userSettingsSchema>>({
		resolver: zodResolver(userSettingsSchema),
		defaultValues: userData
			? {
					image: userData?.profileImage || "",
					email: userData?.email || "",
					firstName: userData?.firstName || "",
					lastName: userData?.lastName || "",
					username: userData?.username || "",
					bio: userData?.bio || "",
					currentPassword: "",
					newPassword: "",
					confirmNewPassword: "",
			  }
			: {
					image: "",
					email: "",
					firstName: "",
					lastName: "",
					username: "",
					bio: "",
					currentPassword: "",
					newPassword: "",
					confirmNewPassword: "",
			  },
	});

	const errorFirstName = form.formState.errors.firstName;
	const errorLastName = form.formState.errors.lastName;
	const errorEmail = form.formState.errors.email;
	const errorUsername = form.formState.errors.username;
	const errorBio = form.formState.errors.bio;
	const errorCurrentPassword = form.formState.errors.currentPassword;
	const errorNewPassword = form.formState.errors.newPassword;
	const errorConfirmNewPassword = form.formState.errors.confirmNewPassword;

	const errorMessage = "text-sm text-red-500 font-semibold text-right";
	const normalMessage = "text-sm text-zinc-700";

	const onSubmit = (values: z.infer<typeof userSettingsSchema>) => {
		startTransition(() => {
			updateUserSettings(values).then((data) => {
				if (data?.error) {
					form.reset();
					console.log(data.error);
				} else {
					toast.success("Settings updated successfully!");
					// router.refresh();
				}
			});
		});
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-1/2">
			<SectionContainerStart>
				{/* Title */}
				<h2 className="text-xl font-semibold pb-5">Personal Info</h2>
				{/* Form */}
				<div className="w-full flex flex-col gap-10">
					{/* Profile Image */}
					<div className="w-full flex flex-col gap-5 items-center">
						<h3 className="font-semibold text-left w-full">Profile Image</h3>
						<div className="aspect-square w-[300px] h-[300px] overflow-hidden relative">
							<Image
								src={uploadedImageUrl || userData?.profileImage || ""}
								alt="Uploaded Image"
								fill
								objectFit="cover"
								className="rounded-full"
							/>
						</div>
						<UploadButton
							className="mt-4 ut-button:bg-primary hover:ut-button:bg-primary/75 ut-button:ut-readying:bg-primary/50"
							endpoint="imageUploader"
							onClientUploadComplete={(res) => {
								if (res && res.length > 0) {
									const uploadedFile = res[0];
									const uploadedUrl = uploadedFile.url;
									setUploadedImageUrl(uploadedUrl);
									form.setValue("image", uploadedUrl);
									form.handleSubmit(onSubmit)();
								} else {
									alert("No files uploaded.");
								}
							}}
							onUploadError={(error: Error) => {
								alert(`ERROR! ${error.message}`);
							}}
						/>
					</div>

					{/* Full Name */}
					<div className="w-full flex flex-col gap-5">
						<h3 className="font-semibold">Full Name</h3>
						{/* First Name */}
						<span className="w-full flex flex-col md:flex-row gap-2 ">
							<span className="w-full md:w-1/2 flex flex-col gap-2">
								<label htmlFor="name" className={normalMessage}>
									{errorFirstName ? <span className={errorMessage}>{errorFirstName.message}</span> : <span>First Name</span>}
								</label>
								<input {...form.register("firstName")} className="w-full px-8 py-4 rounded-md bg-gray-200/75" />
							</span>
							{/* Last Name */}
							<span className="w-full md:w-1/2 flex flex-col gap-2">
								<label htmlFor="name" className={normalMessage}>
									{errorLastName ? <span className={errorMessage}>{errorLastName.message}</span> : <span>Last Name</span>}
								</label>
								<input {...form.register("lastName")} className="w-full px-8 py-4 rounded-md bg-gray-200/75" />
							</span>
						</span>
					</div>

					{/* Email and username */}
					<div className="w-full flex flex-col gap-5">
						<h3 className="font-semibold">Email and Username</h3>
						{/* Email */}
						<span className="w-full flex flex-col md:flex-row gap-2">
							<span className="w-full md:w-1/2 flex flex-col gap-2">
								<label htmlFor="email" className={normalMessage}>
									{errorEmail ? <span className={errorMessage}>{errorEmail.message}</span> : <span>Email</span>}
								</label>
								<input {...form.register("email")} type="email" className="w-full px-8 py-4 rounded-md bg-gray-200/75" />
							</span>

							{/* Username */}

							<span className="w-full md:w-1/2 flex flex-col gap-2">
								<label htmlFor="username" className={normalMessage}>
									{errorUsername ? <span className={errorMessage}>{errorUsername.message}</span> : <span>Username</span>}
								</label>
								<input {...form.register("username")} className="w-full px-8 py-4 rounded-md bg-gray-200/75" />
							</span>
						</span>
					</div>

					{/* Bio */}

					<span className="w-full flex flex-col gap-2">
						<label htmlFor="bio" className={normalMessage}>
							{errorBio ? <span className={errorMessage}>{errorBio.message}</span> : <span>Bio</span>}
						</label>
						<textarea {...form.register("bio")} className="w-full px-8 py-4 rounded-md bg-gray-200/75" />
					</span>

					{/* Password */}
					<div className="w-full flex flex-col gap-5">
						<h3 className="font-semibold">Password</h3>

						<span className="w-full flex flex-col gap-4">
							{/* current password */}
							<span className="w-full flex flex-col gap-2">
								<label htmlFor="currentPassword" className={normalMessage}>
									{errorCurrentPassword ? (
										<span className={errorMessage}>{errorCurrentPassword.message}</span>
									) : (
										<span>Current Password</span>
									)}
								</label>
								<input
									{...form.register("currentPassword")}
									type="password"
									className="w-full px-8 py-4 rounded-md bg-gray-200/75"
								/>
							</span>
							<span className="w-full flex flex-col md:flex-row gap-2">
								{/* new password */}
								<span className="w-full md:w-1/2 flex flex-col gap-2">
									<label htmlFor="newPassword" className={normalMessage}>
										{errorNewPassword ? (
											<span className={errorMessage}>{errorNewPassword.message}</span>
										) : (
											<span>New Password</span>
										)}
									</label>
									<input
										{...form.register("newPassword")}
										type="password"
										className="w-full px-8 py-4 rounded-md bg-gray-200/75"
									/>
								</span>

								{/* confirm new password */}
								<span className="w-full md:w-1/2 flex flex-col gap-2">
									<label htmlFor="confirmNewPassword" className={normalMessage}>
										{errorConfirmNewPassword ? (
											<span className={errorMessage}>{errorConfirmNewPassword.message}</span>
										) : (
											<span>Confirm New Password</span>
										)}
									</label>
									<input
										{...form.register("confirmNewPassword")}
										type="password"
										className="w-full px-8 py-4 rounded-md bg-gray-200/75"
									/>
								</span>
							</span>
						</span>
					</div>

					<button
						type="submit"
						className="w-full px-8 py-4 rounded-lg bg-primary text-white hover:bg-opacity-90 transition-hover duration-200">
						Save Changes
					</button>
				</div>
			</SectionContainerStart>
		</form>
	);
}

const userInfoSchema = z.object({
	birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
		message: "Invalid Date",
	}),
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

interface UserInfoSettingsFormProps {
	userInfoData: Prisma.UserInfoGetPayload<{
		include: {
			allergies: true;
		};
	}> | null;
}

export function UserInfoSettingsForm({ userInfoData }: UserInfoSettingsFormProps) {
	const form = useForm<z.infer<typeof userInfoSchema>>({
		resolver: zodResolver(userInfoSchema),
		defaultValues: {
			birthDate: userInfoData?.birthDate ? new Date(userInfoData.birthDate).toISOString().split("T")[0] : "",
			height: userInfoData?.height,
			weight: userInfoData?.weight,
			monthlyBudget: userInfoData?.monthyBudget,
			allergies: userInfoData?.allergies,
		},
	});

	const errorBirthDate = form.formState.errors.birthDate;
	const errorHeight = form.formState.errors.height;
	const errorWeight = form.formState.errors.weight;
	const errorBudget = form.formState.errors.monthlyBudget;

	const errorMessage = "text-sm text-red-500 font-semibold text-right";
	const normalMessage = "text-sm text-zinc-700";

	const onSubmit = async (values: z.infer<typeof userInfoSchema>) => {
		const response = await updateUserInfo({
			...values,
			birthDate: new Date(values.birthDate),
		});
		if (response.error) {
			toast.error(response.error);
		} else {
			toast.success("User info updated successfully!");
		}
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-1/2">
			<SectionContainerStart>
				<h2 className="text-xl font-semibold pb-5">Nutritional Info</h2>
				<div className="w-full flex flex-col gap-10">
					{/* Birth Date */}
					<span className="w-full flex flex-col gap-2">
						<label htmlFor="birthDate" className={normalMessage}>
							{errorBirthDate ? <span className={errorMessage}>{errorBirthDate.message}</span> : <span>Birth Date</span>}
						</label>
						<input {...form.register("birthDate")} type="date" className="w-full px-8 py-4 rounded-md bg-gray-200/75" />
					</span>

					{/* Height */}
					<span className="w-full flex flex-col gap-2">
						<label htmlFor="height" className={normalMessage}>
							{errorHeight ? <span className={errorMessage}>{errorHeight.message}</span> : <span>Height</span>}
						</label>
						<input {...form.register("height")} type="number" className="w-full px-8 py-4 rounded-md bg-gray-200/75" />
					</span>

					{/* Weight */}
					<span className="w-full flex flex-col gap-2">
						<label htmlFor="weight" className={normalMessage}>
							{errorWeight ? <span className={errorMessage}>{errorWeight.message}</span> : <span>Weight</span>}
						</label>
						<input {...form.register("weight")} type="number" className="w-full px-8 py-4 rounded-md bg-gray-200/75" />
					</span>

					{/* Monthly Budget */}
					<span className="w-full flex flex-col gap-2">
						<label htmlFor="weight" className={normalMessage}>
							{errorBudget ? <span className={errorMessage}>{errorBudget.message}</span> : <span>Monthly Budget</span>}
						</label>
						<input
							{...form.register("monthlyBudget", { valueAsNumber: true })}
							type="number"
							className="w-full px-8 py-4 rounded-md bg-gray-200/75"
						/>
					</span>

					<UserInfoAllergyForm control={form.control} />

					<button
						type="submit"
						className="w-full px-8 py-4 rounded-lg bg-primary text-white hover:bg-opacity-90 transition-hover duration-200">
						Save Changes
					</button>
				</div>
			</SectionContainerStart>
		</form>
	);
}

function UserInfoAllergyForm({ control }: { control: Control<z.infer<typeof userInfoSchema>> }) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [name, setName] = useState("");
	const { fields, append, remove } = useFieldArray({
		control,
		name: "allergies",
	});

	const handleAdd = () => {
		if (!!name.trim()) {
			append({ name: name.trim() });
			setName("");
			inputRef.current?.focus();
		}
	};

	return (
		<div className="flex flex-col gap-y-2">
			<span className="w-full flex flex-col gap-2">
				<label className="text-sm text-zinc-700">Add allergy</label>
				<div className="flex gap-x-2 items-center">
					<input
						placeholder="Allergy"
						className="w-full px-8 py-4 rounded-md bg-gray-200/75"
						value={name}
						onChange={(e) => {
							setName(e.currentTarget.value);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								handleAdd();
							}
						}}
						ref={inputRef}
					/>
					<button
						type="button"
						className="rounded-lg min-w-20 h-10 flex-shrink-0 inline-flex items-center justify-center bg-primary text-white hover:bg-opacity-90 transition-hover duration-200 gap-x-1"
						onClick={handleAdd}>
						<FaPlus /> <span>Add</span>
					</button>
				</div>
			</span>
			<div className="flex flex-wrap gap-1.5 items-center">
				<span className="text-sm text-zinc-700">Allergies:</span>
				{fields.map((field, index) => (
					<span
						className="rounded-lg flex items-center gap-x-1 bg-red-400 px-2 py-1.5 text-xs text-white flex-shrink-0"
						key={field.id}>
						{field.name}
						<span
							className="rounded-full bg-red-300 p-0.5 hover:bg-red-200 transition-[background] cursor-pointer"
							onClick={() => {
								remove(index);
								inputRef.current?.focus();
							}}>
							<MdClose />
						</span>
					</span>
				))}
			</div>
		</div>
	);
}
