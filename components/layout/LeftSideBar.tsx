"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen lefet-0 top-0 sticky p-10 flex flex-col gap-16 bg-[#DAF9D9] shadow-xl max-lg:hidden">
      <Image
        src="/collections/smallplants_logo.png"
        width={150}
        height={70}
        alt="logo"
      />

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
              pathname === link.url ? "text-green-700" : ""
            }`}
          >
            {link.icon}
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 text-body-medium items-center">
        <UserButton />
        <p>Edit Profile</p>
      </div>
    </div>
  );
};

export default LeftSideBar;
