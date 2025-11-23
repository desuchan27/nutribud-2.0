import db from "@/lib/db";
import { SectionContainerStart } from "@/components/containers/SectionContainer";
import { validateRequest } from "@/auth";
import RecipeFilter from "@/components/RecipeFilter";
import RecipeList from "@/components/RecipeList";
import { Prisma } from "@prisma/client";
import RecipePagination from "@/components/RecipePagination";
import SideProfile from "@/components/partials/SideProfile";
import SideRecipe from "@/components/partials/SideRecipe";

const NUTRIENTS = [
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

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
	const session = await validateRequest();
	const username = session.user?.username as string;
	const currentUserId = session.user?.id ?? "";

	const autoFilter = searchParams["auto-filter"] === "1";

	// pagination
	const page = parseInt(searchParams.page || "1", 10); // Default to page 1 if not provided
	const limit = 3; // Items per page
	const offset = (page - 1) * limit;

	let mappedRecipes = [];
	let totalPages = 0;
	let isFiltered = false;

	if (!autoFilter) {
		const { recipes, totalPages: resTotalPages, isFiltered: resIsFiltered } = await filterRecipe(currentUserId, searchParams, limit, offset);

		mappedRecipes = recipes.map((recipe) => ({
			...recipe,
			user: {
				username: recipe.user.username,
				image: recipe.user.profileImage || "", // Use profileImage as image
			},
		}));
		totalPages = resTotalPages;
		isFiltered = resIsFiltered;
	} else {
		const { recipes, totalPages: resTotalPages } = await autoFilterRecipe(currentUserId, limit, offset);

		mappedRecipes = recipes.map((recipe) => ({
			...recipe,
			user: {
				username: recipe.user.username,
				image: recipe.user.profileImage || "", // Use profileImage as image
			},
		}));
		totalPages = resTotalPages;
		isFiltered = true;
	}

	const uniqueIngredients = await db.ingredients.findMany({
		distinct: ["name"], // Field to make distinct
		select: {
			name: true, // Only select the name field
		},
	});

	return (
		<div>
			<SectionContainerStart>
				<div className="flex flex-col gap-1">
					<h1 className="text-xl text-left">
						Welcome to Nutribud! <span className="text-primary font-bold">{username}</span>
					</h1>
					<p className="text-left text-sm">Here are some of the latest healthy recipes from our community</p>
				</div>
			</SectionContainerStart>
			<div className="bg-gray-100 w-full">
				<div className="flex gap-x-4 container mx-auto">
					<div className="w-full hidden lg:block bg-white mt-4">
						<SideProfile />
					</div>
					<div className="lg:min-w-[56rem] w-full">
						<RecipeFilter uniqueIngredients={uniqueIngredients} isFiltered={isFiltered} />
						<RecipeList recipes={mappedRecipes} isFiltered={isFiltered} />
						<RecipePagination page={page} totalPages={totalPages} />
					</div>
					<div className="w-full hidden lg:block bg-white mt-4">
						<SideRecipe />
					</div>
				</div>
			</div>
		</div>
	);
}

async function filterRecipe(currentUserId: string, searchParams: { [key: string]: string | undefined }, limit: number, offset: number) {
	const title = searchParams["title"];
	const budget = searchParams["budget"] ?? null;
	const highToLow = searchParams["high-to-low"] ?? false;
	const ingredients = searchParams["ingredients"]?.split(",");
	const allergens = searchParams["allergens"] === "1";

	const nutrients = NUTRIENTS.map((nutrient) => {
		const paramValue = searchParams[nutrient];
		if (!paramValue) return null;
		return {
			name: nutrient,
			value: paramValue,
		};
	}).filter((nut) => !!nut);

	const isFiltered = !!title || !!budget || !!ingredients || nutrients.length > 0 || !!allergens;

	const where: Prisma.RecipeWhereInput = {};
	if (title) {
		where.title = {
			contains: title,
			mode: "insensitive",
		};
	}

	if (budget && Number(budget)) {
		if (!highToLow) {
			where.totalSrp = { lte: Number(budget) };
		} else {
			where.totalSrp = { gte: Number(budget) };
		}
	}

	if (ingredients) {
		where.ingredients = {
			some: {
				// name: { in: ingredients },
				OR: ingredients.map((ing) => ({
					name: {
						contains: ing,
						mode: "insensitive",
					},
				})),
			},
		};
	}

	if (nutrients.length > 0) {
		nutrients.forEach(({ name, value }) => {
			if (!!Number(value)) {
				where[name] = {
					lte: Number(value),
				};
			}
		});
	}

	if (allergens) {
		const userInfo = await db.userInfo.findUnique({
			where: { userId: currentUserId },
			include: {
				allergies: true,
			},
		});

		// Extract allergies and budget
		const allergies = userInfo?.allergies.map((allergy) => allergy.name) ?? [];
		where.ingredients = {
			// none: {
			// 	name: { in: allergies }, // Exclude recipes with allergic ingredients
			// },
			none: {
				OR: allergies.map((allergy) => ({
					name: {
						contains: allergy, // exclude word that contains the word e.g "Cheese" and "Mozzarella Cheese"
						mode: "insensitive", // ensures the comparison is case-insensitive
					},
				})), // Exclude recipes with allergic ingredients
			},
		};
	}

	const recipes = await db.recipe.findMany({
		skip: offset,
		take: limit,
		orderBy: {
			createdAt: "desc",
		},
		where,
		include: {
			ingredients: true,
			recipeImage: true,
			user: true,
		},
	});

	// pagination
	const totalRecipes = await db.recipe.count({
		where,
	});
	const totalPages = Math.ceil(totalRecipes / limit);
	return { recipes, totalPages, isFiltered };
}

async function autoFilterRecipe(currentUserId: string, limit: number, offset: number) {
	// Fetch the user's budget and allergies
	const userInfo = await db.userInfo.findUnique({
		where: { userId: currentUserId },
		include: {
			allergies: true,
		},
	});

	// Extract allergies and budget
	const allergies = userInfo?.allergies.map((allergy) => allergy.name) ?? [];
	const monthlyBudget = userInfo?.monthyBudget ?? 0;

	// Filter recipes
	const personalizedHealthyRecipes = await db.recipe.findMany({
		skip: offset,
		take: limit,
		where: {
			AND: [
				{ Calories: { lt: 500 } },
				{ Protein: { gte: 10 } },
				{ Fat: { lt: 15 } },
				{ Sugar: { lt: 10 } },
				{ Fiber: { gte: 3 } },
				{ totalSrp: { lte: monthlyBudget } }, // Ensure recipe cost fits the budget
				{
					ingredients: {
						none: {
							OR: allergies.map((allergy) => ({
								name: {
									contains: allergy, // exclude word that contains the word e.g "Cheese" and "Mozzarella Cheese"
									mode: "insensitive", // ensures the comparison is case-insensitive
								},
							})),
						}, // Exclude recipes with allergic ingredients
					},
				},
			],
		},
		orderBy: {
			createdAt: "desc",
		},
		include: {
			user: {
				select: {
					id: true,
					username: true,
					profileImage: true,
				},
			},
			ingredients: true,
			recipeImage: true,
		},
	});

	// Pagination
	const totalRecipes = await db.recipe.count({
		where: {
			AND: [
				{ Calories: { lt: 500 } },
				{ Protein: { gte: 10 } },
				{ Fat: { lt: 15 } },
				{ Sugar: { lt: 10 } },
				{ Fiber: { gte: 3 } },
				{ totalSrp: { lte: monthlyBudget } },
				{
					ingredients: {
						none: {
							name: { in: allergies },
						},
					},
				},
			],
		},
	});
	const totalPages = Math.ceil(totalRecipes / limit);
	return { recipes: personalizedHealthyRecipes, totalPages };
}
