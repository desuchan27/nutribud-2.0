import db from "@/lib/db";
import { validateRequest } from "@/auth";
import Image from "next/image";
import Link from "next/link";

// ----------------------------------------------------------------------

export default async function SideRecipe() {
	const session = await validateRequest();
	const id = session.user?.id as string;

	const latestRecipesFromFollowedUsers = await db.recipe.findMany({
		where: {
			user: {
				followers: {
					some: { followerId: id }, // Filter recipes by users followed by the current user
				},
			},
		},
		orderBy: {
			createdAt: "desc", // Order recipes by the latest
		},
		take: 5, // Limit to top 5
		include: {
			user: {
				select: {
					id: true,
					firstName: true,
					lastName: true,
					username: true,
					profileImage: true, // To display user details with recipes
				},
			},
			recipeImage: true, // Include recipe images if needed
		},
	});

	return (
		<div className="flex flex-col gap-y-4 px-4 py-6">
			<h3 className="font-semibold text-gray-600">Latest posted recipe from followed users:</h3>
			<div className="flex flex-col gap-y-8 divide-y-2">
				{latestRecipesFromFollowedUsers.length > 0 ? (
					latestRecipesFromFollowedUsers.map((recipe) => {
						return (
							<div key={recipe.id} className="flex flex-col gap-y-1 rounded-none pt-2">
								<Link href={`/${recipe.user.username}`} className="flex items-center gap-x-2 group">
									<div className="size-9 rounded-full">
										{recipe.user.profileImage ? (
											<Image
												src={recipe.user.profileImage}
												alt={recipe.user.username}
												className="object-cover w-full h-full rounded-full"
												width={36}
												height={36}
											/>
										) : (
											<div className="w-full h-full bg-zinc-200 rounded-full">
												<div className="w-full h-full flex justify-center items-center">
													<p className="text-zinc-600 text-lg font-semibold">
														{recipe.user.username?.charAt(0).toUpperCase()}
													</p>
												</div>
											</div>
										)}
									</div>
									<div>
										<h4 className="font-semibold text-md group-hover:underline leading-none">
											{recipe.user.firstName} {recipe.user.lastName}
										</h4>
										<p className="text-gray-400 text-sm">@{recipe.user.username}</p>
									</div>
								</Link>
								<Link href={`/recipe/${recipe.id}`} className="hover:underline">
									<h6 className="font-semibold text-lg text-gray-700">{recipe.title}</h6>
									<div className="relative w-full aspect-square sm:aspect-video">
										<Image src={recipe.recipeImage[0].img} alt={recipe.title} fill className="rounded-lg object-cover" />
									</div>
								</Link>
							</div>
						);
					})
				) : (
					<p className="text-center text-lg font-semibold text-gray-400">No followed user or no new recipe posted yet.</p>
				)}
			</div>
		</div>
	);
}
