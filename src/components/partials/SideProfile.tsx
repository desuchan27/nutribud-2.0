import db from "@/lib/db";
import { validateRequest } from "@/auth";
import Image from "next/image";
import Link from "next/link";

// ----------------------------------------------------------------------

export default async function SideProfile() {
	const session = await validateRequest();
	const id = session.user?.id as string;

	const user = await db.user.findFirst({
		where: {
			id,
		},
		include: {
			followers: {
				select: {
					id: true,
				},
			},
			following: {
				select: {
					id: true,
				},
			},
			recipe: {
				select: {
					id: true,
				},
			},
			userInfo: {
				select: {
					monthyBudget: true,
					allergies: true,
				},
			},
		},
	});

	if (!user) return null;

	return (
		<div className="px-4 pt-6 flex flex-col gap-4 relative">
			<div className="w-full max-w-48 mx-auto">
				<Link href={user.username} className="flex flex-col gap-4 group">
					<div className="aspect-square relative">
						{!!user?.profileImage ? (
							<Image src={user.profileImage} alt={user.username} className="object-cover w-full h-full rounded-full" fill />
						) : (
							<div className="w-full h-full bg-zinc-200 rounded-full">
								<div className="w-full h-full flex justify-center items-center">
									<p className="text-zinc-600 text-7xl font-semibold">{user.username?.charAt(0).toUpperCase()}</p>
								</div>
							</div>
						)}
					</div>
					<div>
						<h4 className="font-semibold text-center text-xl group-hover:underline">
							{user.firstName} {user.lastName}
						</h4>
						<p className="text-gray-400 text-sm text-center">@{user.username}</p>
					</div>
				</Link>
			</div>
			<div className="flex flex-col gap-y-2 mx-auto">
				<p className="text-lg">
					<span className="text-sm text-gray-500 font-semibold">Monthly Budget:</span>{" "}
					<span className="text-sm">{user.userInfo?.monthyBudget ?? 0}</span>
				</p>
				<p className="text-lg">
					<span className="text-sm text-gray-500 font-semibold">followers:</span>{" "}
					<span className="text-sm">{user.followers.length}</span>
				</p>
				<p className="text-lg">
					<span className="text-sm text-gray-500 font-semibold">following:</span>{" "}
					<span className="text-sm">{user.following.length}</span>
				</p>
				<p className="text-lg">
					<span className="text-sm text-gray-500 font-semibold">Recipies:</span> <span className="text-sm">{user.recipe.length}</span>
				</p>
			</div>
			<div className="flex flex-wrap justify-center mt-2">
				{user.userInfo?.allergies && <h6 className="w-full text-center mb-2 font-semibold text-gray-500">Allergies:</h6>}
				{user.userInfo?.allergies.map((allergy) => (
					<span className="mr-2 rounded-lg bg-red-400 px-2 py-1 text-xs text-white flex-shrink-0" key={allergy.id}>
						{allergy.name}
					</span>
				))}
			</div>
		</div>
	);
}
