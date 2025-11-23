"use client";

import Image from "next/image";

import * as z from "zod";

import { LogoutButton } from "../buttons/LogoutButton";
import { PageContainer } from "../containers/PageContainer";
import { SectionContainerCenter, SectionContainerStart } from "../containers/SectionContainer";
import { userInfoSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { submitUserInfo } from "@/actions/onboarding.actions";
import { startTransition, useRef, useState } from "react";
import { Control, useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

interface OnboardingFormProps {
	id: string;
	firstName: string | undefined;
	lastName: string | undefined;
	birthday: Date | undefined;
	height: number | undefined;
	weight: number | undefined;
	monthyBudget: number;
	allergies: {
		id: string;
		name: string;
		userInfoId: string;
	}[];
}

export default function OnboardingForm({ id, firstName, lastName, birthday, height, weight, monthyBudget, allergies }: OnboardingFormProps) {
	const form = useForm<z.infer<typeof userInfoSchema>>({
		resolver: zodResolver(userInfoSchema),
		defaultValues: {
			birthDate: birthday, // Convert Date to string (yyyy-mm-dd),
			height: height,
			weight: weight,
			monthlyBudget: monthyBudget,
			allergies,
		},
	});

	const errorBirthDate = form.formState.errors.birthDate;
	const errorHeight = form.formState.errors.height;
	const errorWeight = form.formState.errors.weight;
	const errorBudget = form.formState.errors.monthlyBudget;

	const errorMessage = "text-sm text-red-500 font-semibold text-right";
	const normalMessage = "text-sm text-zinc-700";

	const router = useRouter();

	const onSubmit = (values: z.infer<typeof userInfoSchema>) => {
		startTransition(() => {
			submitUserInfo(id, values).then((data) => {
				if (data?.error) {
					form.reset();
					console.log(data.error);
				} else {
					toast.success("Success!");
					router.push("/home");
				}
			});
		});
	};

	return (
		<PageContainer>
			<SectionContainerCenter>
				<Image src="/icons/nutribud-icon.svg" alt="NutriBud Logo" width={200} height={88} />
				<h1 className="text-2xl text-center">
					Welcome to nutribud!{" "}
					<span className="text-primary font-bold">
						{firstName} {lastName}
					</span>
				</h1>
				<p>Your health journey starts now. Make it a priority.</p>
			</SectionContainerCenter>

			<SectionContainerStart>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xl flex flex-col gap-4 mx-auto">
					<span className="flex flex-col gap-2">
						<label htmlFor="name" className={normalMessage}>
							{errorBirthDate ? <span className={errorMessage}>{errorBirthDate.message}</span> : <span>Enter your birthdate</span>}
						</label>
						<input
							className="w-full px-8 py-4 rounded-md bg-gray-200/75"
							type="date"
							placeholder="kg"
							{...form.register("birthDate")}
						/>
					</span>
					<span className="flex flex-col gap-2">
						<label htmlFor="height" className={normalMessage}>
							{errorHeight ? <span className={errorMessage}>{errorHeight.message}</span> : <span>Height</span>}
						</label>
						<input
							className="w-full px-8 py-4 rounded-md bg-gray-200/75"
							type="number"
							placeholder="cm"
							{...form.register("height")}
						/>
					</span>
					<span className="flex flex-col gap-2">
						<label htmlFor="weight" className={normalMessage}>
							{errorWeight ? <span className={errorMessage}>{errorWeight.message}</span> : <span>Weight:</span>}
						</label>
						<input
							className="w-full px-8 py-4 rounded-md bg-gray-200/75"
							type="number"
							placeholder="kg"
							{...form.register("weight")}
						/>
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
							placeholder="Monthly Budget"
						/>
					</span>

					<UserInfoAllergyForm control={form.control} />

					<button
						type="submit"
						className="w-full px-8 py-4 rounded-lg bg-primary text-white hover:bg-opacity-90 transition-hover duration-200">
						submit
					</button>
				</form>
				<p className="text-center">
					You can fill it up next time{" "}
					<LogoutButton>
						<span className="font-semibold hover:text-red-500">Logout</span>
					</LogoutButton>
				</p>
			</SectionContainerStart>
		</PageContainer>
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
