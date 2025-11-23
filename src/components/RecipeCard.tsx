"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CommentSection, ReactionSection } from "./CommentSection";
import { Prisma } from "@prisma/client";

interface RecipeCardProps {
	recipe: Prisma.RecipeGetPayload<{
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
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const moreThanOneImage = recipe.recipeImage.length > 1;

	const handleNextImage = () => {
		setCurrentImageIndex((prevIndex) => (prevIndex === recipe.recipeImage.length - 1 ? 0 : prevIndex + 1));
	};

	const handlePrevImage = () => {
		setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? recipe.recipeImage.length - 1 : prevIndex - 1));
	};

	return (
		<div
			className="flex flex-col gap-5 px-5 py-5 bg-white rounded-bl-[2rem] rounded-tr-[2rem] shadow-lg outline-none hover:outline hover:outline-secondary transition-all ease-linear duration-200"
			key={recipe.id}>
			<Link className="flex flex-row items-center gap-4 w-fit group" href={`/${recipe.user.username}`}>
				{recipe.user.image ? (
					<Image
						src={recipe.user.image}
						alt={recipe.user.username}
						width={32}
						height={32}
						className="rounded-full object-cover aspect-square"
					/>
				) : (
					<div className="h-9 w-9 relative aspect-square rounded-full flex items-center justify-center overflow-hidden bg-zinc-200 group-hover:bg-zinc-600">
						<p className="text-zinc-600 text-sm font-semibold group-hover:text-white">
							{recipe.user.username?.charAt(0).toUpperCase()}
						</p>
					</div>
				)}
				<p className="text-sm font-semibold group-hover:underline">{recipe.user.username}</p>
			</Link>
			<div className="flex items-center justify-between">
				<Link className="w-fit hover:underline hover:text-primary transition-all ease-linear duration-200" href={`recipe/${recipe?.id}`}>
					<h1 className="text-base md:text-xl font-semibold">{recipe.title}</h1>
				</Link>
				<span className="rounded-lg bg-primary px-2 py-1 text-xs text-white flex-shrink-0">
					Estimated Total Budget: {recipe.totalSrp}
				</span>
			</div>

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
						<div key={index} className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-gray-400"}`}></div>
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
			<div className="flex flex-col gap-5 text-sm md:text-base">
				<div className="flex flex-col gap-2">
					<h2 className="text-base font-semibold">Ingredients:</h2>
					{recipe.ingredients.map((ingredient) => (
						<p key={ingredient.id} className="whitespace-pre-wrap">
							{ingredient.name}: {ingredient.srp.toFixed(2)} SRP
						</p>
					))}
					<h2 className="text-base font-semibold">Total SRP: {recipe.totalSrp}</h2>
				</div>
				<div className="flex flex-col gap-2">
					<h2 className="text-base font-semibold">Procedures:</h2>
					<p className="whitespace-pre-wrap">{recipe.procedure}</p>
				</div>
			</div>
			<CommentSection />
		</div>
	);
}
