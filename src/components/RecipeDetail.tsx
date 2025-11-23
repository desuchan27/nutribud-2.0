"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageContainer } from "./containers/PageContainer";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CommentSection, ReactionSection } from "./CommentSection";
import { Prisma } from "@prisma/client";

interface RecipeDetailProps {
	recipe: Prisma.RecipeGetPayload<{
		include: {
			ingredients: true;
			recipeImage: true;
			user: true;
		};
	}>;
}

export default function RecipeDetail({ recipe }: RecipeDetailProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const moreThanOneImage = recipe.recipeImage.length > 1;

	const handleNextImage = () => {
		setCurrentImageIndex((prevIndex) => (prevIndex === recipe.recipeImage.length - 1 ? 0 : prevIndex + 1));
	};

	const handlePrevImage = () => {
		setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? recipe.recipeImage.length - 1 : prevIndex - 1));
	};

	return (
		<PageContainer>
			<div className="flex flex-col gap-5 px-5 py-5 w-full max-w-7xl mx-auto">
				<div className="flex flex-col gap-4">
					<h1 className="text-lg md:text-2xl font-semibold">{recipe.title}</h1>
					<Link href={`/${recipe.user.username}`} className="flex flex-row items-center gap-4 w-fit group">
						<Image
							src={recipe.user.profileImage || "/default-profile.png"}
							alt={recipe.user.username}
							width={32}
							height={32}
							className="rounded-full object-cover"
						/>
						<p className="text-sm font-semibold group-hover:underline">{recipe.user.username}</p>
					</Link>
				</div>
				<div className="w-full flex flex-col md:flex-row gap-10">
					<div className="flex flex-col gap-5 w-full md:w-3/4">
						<div className="relative w-full aspect-square sm:aspect-video">
							<Image src={recipe.recipeImage[currentImageIndex].img} alt={recipe.title} fill className="rounded-lg object-cover" />
							{moreThanOneImage && (
								<>
									<button
										onClick={handlePrevImage}
										className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 flex items-center justify-center rounded-full">
										<FaChevronLeft />
									</button>
									<button
										onClick={handleNextImage}
										className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 flex items-center justify-center rounded-full">
										<FaChevronRight />
									</button>
								</>
							)}
							<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
								{recipe.recipeImage.map((_, index) => (
									<div
										key={index}
										className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-gray-400"}`}></div>
								))}
							</div>
						</div>
						<ReactionSection
							nutrients={[
								{ name: "Calories", value: recipe.Calories },
								{ name: "Protein", value: recipe.Protein },
								{ name: "Calcium", value: recipe.Calcium },
								{ name: "Carbs", value: recipe.Carbs },
								{ name: "Fat", value: recipe.Fat },
								{ name: "Fiber", value: recipe.Fiber },
								{ name: "Iron", value: recipe.Iron },
								{ name: "Potassium", value: recipe.Potassium },
								{ name: "Sodium", value: recipe.Sodium },
								{ name: "Sugar", value: recipe.Sugar },
								{ name: "VitaminA", value: recipe.VitaminA },
								{ name: "VitaminC", value: recipe.VitaminC },
							]}
						/>
						<div className="hidden md:flex w-full md:w-fit flex-col gap-2">
							<h2 className="text-base md:text-lg font-semibold">Procedures</h2>
							<p className="whitespace-pre-wrap">{recipe.procedure}</p>
						</div>
						<CommentSection />
					</div>
					<div className="flex flex-col md:flex-row gap-10 h-full w-full md:w-1/4 text-sm md:text-base">
						<div className="hidden md:flex flex-col gap-2 w-fit">
							<h2 className="text-base md:text-lg font-semibold">Ingredients</h2>
							{recipe.ingredients.map((ingredient) => (
								<p className="whitespace-pre-wrap" key={ingredient.id}>
									{ingredient.name} - SRP: {ingredient.srp}
								</p>
							))}
						</div>
						<div className="md:hidden flex w-full md:w-fit flex-col gap-2">
							<h2 className="text-base md:text-lg font-semibold">Procedures</h2>
							<p className="whitespace-pre-wrap">{recipe.procedure}</p>
						</div>
					</div>
				</div>
			</div>
		</PageContainer>
	);
}
