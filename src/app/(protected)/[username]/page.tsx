import db from "@/lib/db";
import ProfileBio from "./components/ProfileBio";
import RecipeList from "@/components/RecipeList";
import { notFound } from "next/navigation";
import { validateRequest } from "@/auth";

interface ProfileProps {
	params: {
		username: string;
	};
}

export default async function Profile({ params }: ProfileProps) {
	const { username } = params;

	const session = await validateRequest();
	if (!session.user) {
		notFound();
	}
	const currentUser = session.user;

	const user = await db.user.findUnique({
		where: {
			username: username,
		},
		include: {
			followers: true,
			following: true,
			userInfo: {
				include: {
					allergies: true,
				},
			},
		},
	});

	const recipes = await db.recipe.findMany({
		orderBy: {
			createdAt: "desc", // Sort by latest post
		},
		where: {
			userId: user?.id,
		},
		include: {
			ingredients: true,
			recipeImage: true,
			user: true,
		},
	});

	const mappedRecipes = recipes.map((recipe) => ({
		...recipe,
		user: {
			username: recipe.user.username,
			image: recipe.user.profileImage || "", // Use profileImage as image
		},
	}));

	if (!user) {
		notFound();
	}

	return (
		<div className="w-full">
			<ProfileBio userData={user} recipeData={mappedRecipes} currentUser={currentUser} />
			<div className="border-b-2" />
			<RecipeList recipes={mappedRecipes} isFiltered={false} />
		</div>
	);
}
