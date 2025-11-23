import RecipeCard from "@/components/RecipeCard";
import { Prisma } from "@prisma/client";

type TRecipe = Prisma.RecipeGetPayload<{
	include: {
		ingredients: true;
		recipeImage: true;
	};
}> & {
	user: {
		username: string;
		image: string;
	};
};
interface RecipeListProps {
	recipes: TRecipe[];
	isFiltered: boolean;
}

export default function RecipeList({ recipes, isFiltered }: RecipeListProps) {
	return (
		<div className="bg-gray-100">
			<div className="min-h-dvh max-w-4xl flex flex-col mx-auto p-4 gap-6">
				{recipes.length > 0 ? (
					recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
				) : (
					<div className="px-5 py-5 bg-white rounded-bl-[2rem] rounded-tr-[2rem] shadow-lg">
						<p className="text-center text-lg font-semibold text-gray-500">
							{isFiltered ? "0 Result Found" : "No recipe posted yet!"}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
