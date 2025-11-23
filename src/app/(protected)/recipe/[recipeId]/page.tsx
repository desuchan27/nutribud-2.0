import { PageContainer } from "@/components/containers/PageContainer";
import RecipeDetail from "@/components/RecipeDetail";
import db from "@/lib/db";

interface RecipeProps {
	params: {
		recipeId: string;
	};
}

export default async function Recipe({ params }: RecipeProps) {
	const { recipeId } = params;

	const recipe = await db.recipe.findUnique({
		where: {
			id: recipeId,
		},
		include: {
			ingredients: true,
			recipeImage: true, // Include the images relation
			user: true, // Include the user relation
		},
	});

	if (!recipe) {
		return (
			<PageContainer>
				<h1 className="text-2xl align-center">Recipe not found</h1>
			</PageContainer>
		);
	}

	return (
		<div className="w-full">
			<RecipeDetail recipe={recipe} />
		</div>
	);
}
