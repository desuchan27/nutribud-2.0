"use client";
import { useCallback, useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { userFollow, userUnfollow } from "@/actions/user.actions";
import Link from "next/link";

// ----------------------------------------------------------------------

interface SearchbarProps {
	users: {
		followed: boolean;
		id: string;
		username: string;
		profileImage: string | null;
	}[];
	currentUserId: string;
}

export default function Searchbar({ users, currentUserId }: SearchbarProps) {
	const [userList, setUserList] = useState(users);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen(true);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, [open]);

	const handleOpen = useCallback(() => {
		setOpen(true);
	}, [setOpen]);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const handleFollowUnfollowUser = async (id: string, follow: boolean = true) => {
		setLoading(true);
		if (follow) {
			await userFollow(id, currentUserId);
		} else {
			await userUnfollow(id, currentUserId);
		}
		setUserList((prevState) => {
			return prevState.map((u) => {
				if (u.id === id) {
					return {
						...u,
						followed: follow,
					};
				}
				return u;
			});
		});
		setLoading(false);
	};

	return (
		<>
			<div
				onClick={handleOpen}
				className="flex items-center lg:justify-around gap-4 rounded-md border border-input lg:px-3 lg:py-2 py-1 px-2 max-md:w-full text-sm text-muted-foreground ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 hover:bg-muted">
				<span className="flex items-center justify-start gap-1">
					<CiSearch className="h-4 w-4" />
					Search Users...
				</span>
				<kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 md:inline-flex">
					<span className="text-xs">⌘</span>K
				</kbd>
			</div>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="search user..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Users">
						{userList.map((user) => (
							<CommandItem key={user.id} className="flex flex-row items-center gap-2 w-full group" value={user.username}>
								<Link href={`/${user.username}`} className="flex flex-row items-center gap-2 w-full" onClick={handleClose}>
									{user.profileImage ? (
										<Image
											src={user.profileImage}
											alt={user.username}
											width={32}
											height={32}
											className="rounded-full object-cover aspect-square"
										/>
									) : (
										<div className="h-9 w-9 relative aspect-square rounded-full flex items-center justify-center overflow-hidden bg-zinc-200 group-hover:bg-zinc-600">
											<p className="text-zinc-600 text-sm font-semibold group-hover:text-white">
												{user.username?.charAt(0).toUpperCase()}
											</p>
										</div>
									)}
									<p className="text-sm font-semibold group-hover:underline group-hover:text-white">{user.username}</p>
								</Link>
								<button
									className={cn(
										"inline-flex group-hover:text-white text-sm font-semibold flex-shrink-0 text-gray-600 border rounded-md px-2 py-2",
										loading && "pointer-events-none opacity-50",
									)}
									type="button"
									disabled={loading}
									onClick={() => handleFollowUnfollowUser(user.id, !user.followed)}>
									{user.followed ? "(-) Unfollow" : "(+) Follow"}
								</button>
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
}
