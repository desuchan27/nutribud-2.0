import { useCallback, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useModal } from "../UseModal";
import { type Control, type FieldError, type FieldErrorsImpl, type Merge, useFieldArray, useForm, type UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRecipeSchema } from "@/schema";
import { submitUserRecipe } from "@/actions/user.actions";
import { z } from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import HookFormInput from "../hook-form/input";
import FormProvider from "../hook-form/form";
import HookFormTextarea from "../hook-form/textarea";
import { cn } from "@/lib/utils";
import Upload from "../Upload";

type TRecipeSchema = z.infer<typeof userRecipeSchema>;

const nutrients = [
	"Calories",
	"Protein",
	"Carbs",
	"Fat",
	"Fiber",
	"Sugar",
	"Sodium",
	"Potassium",
	"VitaminC",
	"VitaminA",
	"Calcium",
	"Iron",
] as const;

export function UserRecipeForm() {
	const [loading, setLoading] = useState(false);
	const { modal, handleOpenModal, handleCloseModal } = useModal();
	const [images, setImages] = useState<(File & { preview: string })[]>([]);
	const router = useRouter();

	const form = useForm<TRecipeSchema>({
		resolver: zodResolver(userRecipeSchema),
		defaultValues: {
			title: "",
			ingredients: [
				{
					name: "",
					srp: 0,
				},
				{
					name: "",
					srp: 0,
				},
			],
			procedure: "",
			image: [],
			Calories: 0.0,
			Protein: 0.0,
			Carbs: 0.0,
			Fat: 0.0,
			Fiber: 0.0,
			Sugar: 0.0,
			Sodium: 0.0,
			Potassium: 0.0,
			VitaminC: 0.0,
			VitaminA: 0.0,
			Calcium: 0.0,
			Iron: 0.0,
		},
	});

	const onSubmit = async (values: TRecipeSchema) => {
		setLoading(true);
		if (images.length === 0) {
			form.setError("image", { message: "Please add an image" });
			return;
		}
		const formData = new FormData();
		images.forEach((img) => {
			formData.append("files", img);
		});
		const res = (await (
			await fetch("/api/upload", {
				method: "POST",
				body: formData,
			})
		).json()) as { images: { img: string }[] };

		try {
			const totalSrp = values.ingredients.reduce((acc, curr) => acc + curr.srp, 0);
			await submitUserRecipe({ ...values, totalSrp, image: res.images });
			toast.success("Recipe posted successfully!");
			handleCloseModal();

			router.refresh();
		} catch (error) {
			console.error("Error submitting recipe:", error);
			toast.error("An unknown error occurred");
		}
		setLoading(false);
	};

	const handleDrop = useCallback(
		async (acceptedFiles: File[]) => {
			const files = acceptedFiles.map((f) =>
				Object.assign(f, {
					preview: URL.createObjectURL(f),
				}),
			);
			setImages(files);
			form.clearErrors("image");
		},
		[setImages, form],
	);

	const ingredients = form.watch("ingredients");
	const totalSrp = ingredients.reduce((acc, curr) => acc + curr.srp, 0);
	return (
		<>
			<button
				className="flex flex-row items-center justify-center gap-2 px-2 py-2 md:px-4 md:py-2 rounded-lg bg-primary text-white text-sm md:text-base"
				onClick={handleOpenModal}>
				<FaPlus /> Upload Recipe
			</button>

			{modal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/50 px-4 md:px-0 z-50 text-zinc-700">
					<FormProvider
						{...form}
						onSubmit={onSubmit}
						className="w-full h-3/4 md:w-1/2 md:max-h-1/2 md:h-fit flex flex-col justify-between bg-gray-100 p-4 gap-5 rounded-tr-xl rounded-bl-[3rem] overflow-auto  max-h-[95svh]">
						<h2 className="font-semibold text-lg text-zinc-600 mb-2">Share Your Recipe</h2>

						<div className="px-4">
							<Upload onDrop={handleDrop} files={images} multiple error={!!form.formState.errors.image?.message} />
							{!!form.formState.errors.image?.message && (
								<p className="text-xs pl-1.5 text-red-600 text-center mt-1">{form.formState.errors.image.message}</p>
							)}
						</div>

						<HookFormInput<TRecipeSchema>
							name="title"
							label="Recipe Title"
							placeholder="No Meat Vegetarian Burger (100% Guaranteed)"
						/>

						<span className="flex flex-col gap-2">
							<RecipeIngredientsForm
								control={form.control}
								register={form.register}
								errors={form.formState.errors.ingredients}
								totalSrp={totalSrp}
							/>
						</span>

						<div className="grid md:grid-cols-4 grid-cols-1 gap-y-2 md:gap-x-4">
							{nutrients.map((nutrient) => (
								<span
									key={nutrient}
									className={cn(
										"flex flex-col gap-2",
										!!form.formState.errors[nutrient]?.message && "[&>label]:text-red-600 [&>input]:border-red-600",
									)}>
									<label className="text-sm text-zinc-700" htmlFor={nutrient}>
										{nutrient}:
									</label>
									<input
										type="number"
										id={nutrient}
										className={"w-full px-2 py-0.5 border rounded-md"}
										{...form.register(nutrient, { valueAsNumber: true })}
									/>
									{!!form.formState.errors[nutrient]?.message && (
										<p className="text-xs pl-1.5 text-red-600">{form.formState.errors[nutrient].message}</p>
									)}
								</span>
							))}
						</div>

						<HookFormTextarea<TRecipeSchema> name="procedure" label="Procedures" rows={4} placeholder="List your procedures..." />

						<div className="flex justify-end mt-4">
							<button
								onClick={handleCloseModal}
								className="px-4 py-2 bg-gray-300 text-zinc-700 disabled:opacity-50 hover:bg-gray-300/75 transition-bg duration-200 rounded-md mr-2"
								disabled={loading}>
								Cancel
							</button>
							<button
								type="submit"
								className="px-4 py-2 bg-primary disabled:opacity-50 text-white rounded-md hover:bg-primary/75 transition-bg duration-200"
								disabled={loading}>
								Publish Recipe
							</button>
						</div>
					</FormProvider>
				</div>
			)}
		</>
	);
}

const ingredientPlaceholders = ["Olive", "Onion", "Carrot", "Celery", "Salt"];

type IngredientErrors =
	| Merge<
			FieldError,
			(
				| Merge<
						FieldError,
						FieldErrorsImpl<{
							name: string;
							srp: 0;
						}>
				  >
				| undefined
			)[]
	  >
	| undefined;

function RecipeIngredientsForm({
	control,
	register,
	errors,
	totalSrp,
}: {
	control: Control<TRecipeSchema>;
	register: UseFormRegister<TRecipeSchema>;
	errors: IngredientErrors;
	totalSrp: number;
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: "ingredients",
	});

	return (
		<div className="flex flex-col gap-2">
			{fields.map((field, index) => (
				<div key={field.id} className="grid md:grid-cols-2 grid-cols-1 items-start gap-2">
					<div className={cn(!!errors && !!errors?.[index]?.name?.message && "text-red-600 [&>input]:border-red-600")}>
						<label className="text-sm text-zinc-700">Ingredient</label>
						<input
							className="w-full p-2 border rounded-md"
							placeholder={ingredientPlaceholders[Math.floor(Math.random() * 5)]}
							{...register(`ingredients.${index}.name`)}
						/>
						{!!errors && !!errors?.[index]?.name?.message && (
							<p className="text-xs pl-1.5 text-red-600">{errors[index].name.message}</p>
						)}
					</div>
					<div className={cn(!!errors && !!errors?.[index]?.srp?.message && "[&>label]:text-red-600 [&_input]:border-red-600")}>
						<label className="text-sm text-zinc-700">SRP</label>
						<div className="w-full flex items-center gap-x-2">
							<div className="w-full">
								<input
									className="w-full p-2 border rounded-md"
									type="number"
									{...register(`ingredients.${index}.srp`, { valueAsNumber: true })}
								/>
							</div>
							<button
								className="text-xs text-white bg-red-400 p-1.5 rounded-md"
								type="button"
								onClick={() => {
									remove(index);
								}}>
								Remove
							</button>
						</div>
						{!!errors && !!errors?.[index]?.srp?.message && (
							<p className="text-xs pl-1.5 text-red-600">{errors[index].srp.message}</p>
						)}
					</div>
				</div>
			))}
			{!!totalSrp && (
				<p className="text-sm text-right text-zinc-700 font-semibold">
					total SRP: {totalSrp.toLocaleString("en-US", { maximumFractionDigits: 2 })}
				</p>
			)}
			<div className="mt-0.5 pt-1.5 border-t flex justify-end">
				<button
					className="inline-flex items-center gap-1.5 text-sm text-white p-2 rounded-md bg-primary hover:bg-primary/75"
					type="button"
					onClick={() => {
						append({
							name: "",
							srp: 0,
						});
					}}>
					<FaPlus /> Add More
				</button>
			</div>
		</div>
	);
}
