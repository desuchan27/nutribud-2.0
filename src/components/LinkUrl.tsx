"use client";

import { usePathname } from 'next/navigation';

export default function LinkUrl() {
  const pathName = usePathname();
  const formattedPathName = pathName.startsWith('/') ? pathName.slice(1) : pathName;

  return (
      <p className='uppercase font-semibold'>{formattedPathName}</p>
  );
}