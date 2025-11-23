"use client";
import { useState } from "react";
import { UserBioForm, UserProfileForm } from "@/components/forms/UserForm";
import Image from "next/image";
import { User } from "lucia";
import { Prisma, Recipe } from "@prisma/client";
import { UserRecipeForm } from "@/components/forms/RecipeForm";
import { cn } from "@/lib/utils";
import { userFollow, userUnfollow } from "@/actions/user.actions";
// import { SectionContainerStart } from "@/components/containers/SectionContainer";

interface ProfileBioProps {
	userData: Prisma.UserGetPayload<{
		include: {
			followers: true;
			following: true;
			userInfo: {
				include: {
					allergies: true;
				};
			};
		};
	}>;
	recipeData: Recipe[];
	currentUser: User;
}

export default function ProfileBio({ userData, recipeData, currentUser }: ProfileBioProps) {
	const [loading, setLoading] = useState(false);
	const [isFollowed, setIsFollowed] = useState(() => userData.followers.some((f) => f.followerId === currentUser.id));

	const username = userData.username as string;
	const bio = userData.bio as string;
	const image = userData.profileImage as string;
	const firstName = userData.firstName as string;
	const lastName = userData.lastName as string;
	const userRecipeLength = recipeData.length;

	const [userBio, setUserBio] = useState(bio);
	const [userImage, setUserImage] = useState(image);

	const userUsername = username as string;
	const isCurrentUser = currentUser.id === userData.id;

	const handleBioUpdate = (newBio: string) => {
		setUserBio(newBio);
	};

	const handleProfileUpdate = (newProfile: string) => {
		setUserImage(newProfile);
	};

	const handleFollowUnfollowUser = async (id: string, follow: boolean = true) => {
		setLoading(true);
		if (follow) {
			await userFollow(id, currentUser.id, `/${userData.username}`);
		} else {
			await userUnfollow(id, currentUser.id, `/${userData.username}`);
		}
		setIsFollowed(follow);
		setLoading(false);
	};

	return (
		<>
			{/* tablet and desktop view */}
			{/* <SectionContainerStart> */}
			<div className="hidden md:flex flex-col md:flex-row gap-10 px-4 py-8 w-full max-w-5xl mx-auto">
				<div className="w-full md:w-1/6 flex flex-col gap-4">
					<div className="aspect-square relative">
						{userImage ? (
							<Image src={userImage as string} alt={userUsername} className="object-cover w-full h-full rounded-full" fill />
						) : (
							<div className="w-full h-full bg-zinc-200 rounded-full">
								<div className="w-full h-full flex justify-center items-center">
									<p className="text-zinc-600 text-7xl font-semibold">{username?.charAt(0).toUpperCase()}</p>
								</div>
							</div>
						)}
					</div>
					{isCurrentUser && <UserProfileForm image={userImage} onProfileUpdate={handleProfileUpdate} />}
				</div>
				<div className="w-full md:w-5/6 flex flex-col justify-between text-zinc-700 gap-10">
					<div className="w-full h-fit flex flex-col gap-4">
						<div className="flex flex-col gap-1">
							<div className="flex items-center justify-between">
								<h1 className="text-2xl font-semibold">@{username}</h1>
								{!isCurrentUser && (
									<button
										className={cn(
											"inline-flex group-hover:text-white text-sm font-semibold flex-shrink-0 text-gray-600 border rounded-md px-2 py-2",
											loading && "pointer-events-none opacity-50",
										)}
										type="button"
										disabled={loading}
										onClick={() => handleFollowUnfollowUser(userData.id, !isFollowed)}>
										{isFollowed ? "(-) Unfollow" : "(+) Follow"}
									</button>
								)}
							</div>
							<h2 className="!text-zinc-600">
								{firstName} {lastName}
							</h2>
						</div>
						<div className="flex flex-row gap-4">
							<p className="text-lg">
								{userData.followers.length} <span className="text-sm">followers</span>
							</p>
							<p className="text-lg">
								{userData.following.length} <span className="text-sm">following</span>
							</p>
							<p className="text-lg">
								{userRecipeLength} <span className="text-sm">Recipies</span>
							</p>
							<p className="text-lg">
								{userData.userInfo?.monthyBudget ?? 0} <span className="text-sm">Monthly Budget</span>
							</p>
						</div>
						<p className="whitespace-pre-wrap">{userBio}</p>
						<div>
							<h6 className="w-full mb-2 font-semibold text-gray-500">Allergies:</h6>
							{!!userData.userInfo?.allergies.length ? (
								userData.userInfo.allergies.map((allergy) => (
									<span className="mr-2 rounded-lg bg-red-400 px-2 py-1 text-xs text-white flex-shrink-0" key={allergy.id}>
										{allergy.name}
									</span>
								))
							) : (
								<span className="text-sm font-semibold">No allergies.</span>
							)}
						</div>
					</div>
					{isCurrentUser && (
						<div className="flex flex-row justify-end gap-4">
							<UserBioForm bio={userBio} onBioUpdate={handleBioUpdate} />
							<UserRecipeForm />
						</div>
					)}
				</div>
			</div>
			{/* </SectionContainerStart> */}

			<div className="md:hidden flex flex-col md:flex-row gap-5 px-4 py-4 max-w-5xl mx-auto text-sm sm:text-base">
				<div className="flex flex-row gap-5 h-full items-center justify-start">
					<div className="flex flex-col gap-4 w-fit">
						<div className="aspect-square relative h-32 w-32">
							{image ? (
								<Image src={userImage as string} alt={userUsername} className="object-cover w-full h-full rounded-full" fill />
							) : (
								<div className="w-24 h-24 sm:h-32 sm:w-32 aspect-square bg-zinc-200 rounded-full flex items-center justify-center">
									<p className="text-zinc-600 text-4xl font-semibold">{username?.charAt(0).toUpperCase()}</p>
								</div>
							)}
						</div>
					</div>
					<div className="w-fit flex flex-col gap-1 items-start">
						<h1 className="text-2xl font-semibold">{username}</h1>
						<h2 className="!text-zinc-600">
							{firstName} {lastName}
						</h2>
					</div>
				</div>
				<div className="flex flex-col gap-5 sm:px-8">
					<p className="whitespace-pre-wrap">{userBio}</p>
					{currentUser && (
						<div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-5">
							<div className="flex flex-row gap-5 justify-end">
								<UserProfileForm image={userImage} onProfileUpdate={handleProfileUpdate} />
								<UserBioForm bio={userBio} onBioUpdate={handleBioUpdate} />
							</div>
							<UserRecipeForm />
						</div>
					)}
				</div>
			</div>
		</>
	);
}
