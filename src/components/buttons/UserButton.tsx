"use client";

import Image from "next/image";
import { UserProps } from "@/types";
import Link from "next/link";

export default function UserButton({
  userName,
  email,
  profileImage,
}: UserProps) {
  return (
    <Link
      href={`/${userName}`}
      className=" group flex flex-row gap-4 items-center justify-center md:px-4 md:py-2 rounded-lg md:hover:bg-gray-200/75 transition-hover duration-200"
    >
      <div className="hidden sm:flex flex-col text-right">
        <p className="text-zinc-800 font-semibold">{userName}</p>
        <p className="text-xs text-zinc-600">{email}</p>
      </div>
      <div className="h-9 w-9 relative aspect-square rounded-full flex items-center justify-center overflow-hidden bg-zinc-200 group-hover:bg-zinc-600">
        {profileImage ? (
          <Image src={profileImage} alt={userName as string} fill className="object-cover" />
        ) : (
          <p className="text-zinc-600 text-sm font-semibold group-hover:text-white">
            {userName?.charAt(0).toUpperCase()}
          </p>
        )}
      </div>
    </Link>
  );
}
