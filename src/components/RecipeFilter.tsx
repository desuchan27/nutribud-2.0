"use client";
import { useForm, type UseFormSetValue } from "react-hook-form";
import FormProvider from "./hook-form/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CiSearch } from "react-icons/ci";
import { LuChevronsUpDown } from "react-icons/lu";
import { useRouter, useSearchParams } from "next/navigation";
import CommandMultiSelect from "./command-multi-select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Checkbox } from "./ui/checkbox";

// ----------------------------------------------------------------------

const filterSchema = z.object({
	title: z.string().optional(),
	budget: z.number().nullable(),
	lowToHigh: z.boolean(),
	ingredients: z.array(z.string()),
	Calories: z.string(),
	Protein: z.string(),
	Carbs: z.string(),
	Fat: z.string(),
	Fiber: z.string(),
	Sugar: z.string(),
	Sodium: z.string(),
	Potassium: z.string(),
	VitaminC: z.string(),
	VitaminA: z.string(),
	Calcium: z.string(),
	Iron: z.string(),
	allergens: z.boolean(),
});

type TFilterSchema = z.infer<typeof filterSchema>;

const nutrients = [
	"Calories",
	"Protein",
	"Calcium",
	"Carbs",
	"Fat",
	"Fiber",
	"Iron",
	"Potassium",
	"Sodium",
	"Sugar",
	"VitaminA",
	"VitaminC",
] as const;

export default function RecipeFilter({ uniqueIngredients, isFiltered }: { uniqueIngredients: { name: string }[]; isFiltered: boolean }) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const ingredientParams = searchParams.get("ingredients");

	const methods = useForm<TFilterSchema>({
		resolver: zodResolver(filterSchema),
		defaultValues: {
			title: searchParams.get("title") ?? "",
			budget: null,
			lowToHigh: true,
			ingredients: ingredientParams ? ingredientParams.split(",") : [],
			Calories: searchParams.get("Calories") ?? "",
			Protein: searchParams.get("Protein") ?? "",
			Carbs: searchParams.get("Carbs") ?? "",
			Fat: searchParams.get("Fat") ?? "",
			Fiber: searchParams.get("Fiber") ?? "",
			Sugar: searchParams.get("Sugar") ?? "",
			Sodium: searchParams.get("Sodium") ?? "",
			Potassium: searchParams.get("Potassium") ?? "",
			VitaminC: searchParams.get("VitaminC") ?? "",
			VitaminA: searchParams.get("VitaminA") ?? "",
			Calcium: searchParams.get("Calcium") ?? "",
			Iron: searchParams.get("Iron") ?? "",
			allergens: searchParams.get("allergens") === "1",
		},
	});
	const { register, watch, setValue, reset } = methods;
	const { lowToHigh, ingredients, allergens, ...values } = watch();

	const handleSelectIngredients = (value: string, selected: boolean = false) => {
		if (!selected) {
			setValue("ingredients", [...ingredients, value]);
		} else {
			const newIngredients = ingredients.filter((ingredient) => ingredient !== value);
			setValue("ingredients", newIngredients);
		}
	};

	const onSubmit = (data: TFilterSchema) => {
		const { title, budget, lowToHigh, allergens } = data;
		const params = new URLSearchParams(searchParams);
		params.delete("title");
		params.delete("budget");
		params.delete("ingredients");
		params.delete("high-to-low");
		params.delete("allergens");
		params.delete("page");

		nutrients.map((nutrient) => {
			params.delete(nutrient);
			if (!!values[nutrient]) {
				params.set(nutrient, values[nutrient]);
			}
		});

		if (!!title) {
			params.set("title", title);
		}
		if (!!budget) {
			params.set("budget", budget.toString());
			if (!lowToHigh) {
				params.set("high-to-low", "1");
			}
		}
		if (!!ingredients.length) {
			params.set("ingredients", ingredients.join(","));
		}
		if (allergens) {
			params.set("allergens", "1");
		}
		if (params.size > 0) {
			router.push("/home" + "?" + params.toString(), { scroll: false });
		}
	};

	const handleAutoFilter = () => {
		reset({
			title: "",
			budget: null,
			ingredients: [],
			lowToHigh: false,
			Calories: "",
			Protein: "",
			Carbs: "",
			Fat: "",
			Fiber: "",
			Sugar: "",
			Sodium: "",
			Potassium: "",
			VitaminC: "",
			VitaminA: "",
			Calcium: "",
			Iron: "",
		});
		const params = new URLSearchParams(searchParams);
		params.delete("title");
		params.delete("budget");
		params.delete("ingredients");
		params.delete("high-to-low");
		params.delete("allergens");
		params.delete("page");
		params.set("auto-filter", "1");
		router.push("/home" + "?" + params.toString(), { scroll: false });
	};

	const clearFilter = () => {
		reset({
			title: "",
			budget: null,
			ingredients: [],
			lowToHigh: false,
			Calories: "",
			Protein: "",
			Carbs: "",
			Fat: "",
			Fiber: "",
			Sugar: "",
			Sodium: "",
			Potassium: "",
			VitaminC: "",
			VitaminA: "",
			Calcium: "",
			Iron: "",
		});
		router.push("/home", { scroll: false });
	};

	return (
		<div className="bg-gray-100 pt-4">
			<div className="px-5 py-5 bg-white rounded-bl-[2rem] rounded-tr-[2rem] shadow-md max-w-4xl mx-auto">
				<FormProvider {...methods} onSubmit={onSubmit} className="flex items-center gap-x-4 gap-y-2">
					<div className="flex flex-col w-full gap-2">
						<div className="flex max-sm:flex-wrap max-sm:justify-between w-full gap-y-2 lg:gap-x-2.5">
							<div className="relative w-full">
								<CiSearch className="absolute top-3 left-2 size-5 text-gray-500" />
								<input
									{...register("title")}
									type="search"
									className="w-full pl-8 pr-2 py-2 border rounded-md"
									placeholder="Search..."
								/>
							</div>
							<input
								onChange={(e) => {
									setValue("budget", Number(e.currentTarget.value));
								}}
								type="number"
								className="p-2 border max-sm:w-7/12 rounded-md flex-shrink-0"
								placeholder="Budget"
							/>
							<button
								className="inline-flex border text-gray-600 py-2 flex-shrink-0 px-1.5 items-center text-sm gap-x-1"
								onClick={() => {
									setValue("lowToHigh", !lowToHigh);
								}}
								type="button">
								<span>{lowToHigh ? "High To Low" : "Low To High"}</span>
								<LuChevronsUpDown />
							</button>
						</div>
						<div className="space-x-2">
							<CommandMultiSelect
								label="Ingredients"
								values={ingredients}
								onSelect={handleSelectIngredients}
								options={uniqueIngredients.map((i) => ({ label: i.name, value: i.name }))}
							/>
						</div>
						<div>
							<NutrientFilter setValue={setValue} values={values} />
						</div>
						<div className="flex items-center space-x-2">
							<Checkbox
								id="alergens"
								checked={allergens}
								onCheckedChange={(checked) => {
									setValue("allergens", !!checked);
								}}
							/>
							<label
								htmlFor="alergens"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
								Avoid My Allergens
							</label>
						</div>
						<div className="w-full flex flex-col gap-2 border-t pt-2 rounded-none">
							<button
								className="w-full text-center gap-1.5 text-sm text-white p-2 rounded-md bg-primary hover:bg-primary/75"
								type="submit">
								Search
							</button>
							<button
								className="w-full text-center gap-1.5 text-sm text-white p-2 rounded-md bg-slate-600 hover:bg-slate-600/75"
								type="button"
								onClick={handleAutoFilter}>
								Automatic Filter
							</button>
							{isFiltered && (
								<button
									className="w-full text-center gap-1.5 text-sm text-white p-2 rounded-md bg-red-400 hover:bg-red-400/75"
									type="button"
									onClick={clearFilter}>
									Clear Filter
								</button>
							)}
						</div>
					</div>
				</FormProvider>
			</div>
		</div>
	);
}

function NutrientFilter({
	values,
	setValue,
}: {
	values: Omit<TFilterSchema, "lowToHigh" | "ingredients" | "allergens">;
	setValue: UseFormSetValue<TFilterSchema>;
}) {
	const handleChange = (value: string, name: (typeof nutrients)[number]) => {
		if (!Number(value)) return;
		setValue(name, value);
	};
	return (
		<Popover>
			<PopoverTrigger asChild className="flex w-full flex-col items-start rounded-md border px-4 py-2 sm:flex-row sm:items-center">
				<p className="flex flex-wrap gap-y-1.5 text-sm font-medium leading-none cursor-text">
					{nutrients.map((val) => {
						const nutrientVal = values[val];
						if (!nutrientVal) return null;
						return (
							<span key={val} className="mr-2 rounded-lg bg-primary px-2 py-1 text-xs text-white flex-shrink-0">
								{val}: {nutrientVal}
							</span>
						);
					})}
					<span className="text-sm flex-shrink-0 text-gray-600">Nutrients</span>
				</p>
			</PopoverTrigger>
			<PopoverContent className="w-[var(--radix-popper-anchor-width)]" align="center">
				<div className="grid md:grid-cols-3 gap-y-2 gap-x-3">
					{nutrients.map((nutrient) => (
						<span key={nutrient} className="flex gap-2">
							<label className="text-sm text-zinc-700 min-w-16">{nutrient}:</label>
							<input
								type="number"
								placeholder="Max"
								value={values[nutrient]}
								onChange={(e) => handleChange(e.currentTarget.value, nutrient)}
								className={"w-full text-xs py-1 px-1.5 border rounded-md"}
							/>
						</span>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
}
