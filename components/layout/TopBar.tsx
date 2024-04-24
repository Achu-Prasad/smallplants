"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";


const TopBar = () => {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-[#DAF9D9] shadow-xl lg:hidden">
      <Image
        src="/collections/smallplants_logo.png"
        width={150}
        height={70}
        alt="logo"
      />

      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
              pathname === link.url ? "text-green-700" : ""
            }`}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className=" relative flex gap-4 items-center">
        <Menu
          className="cursor-pointer md:hidden"
          onClick={() => setDropDownMenu(!dropDownMenu)}
        />
        {dropDownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg">
            {navLinks.map((link) => (
              <Link
                href={link.url}
                key={link.label}
                className="flex gap-4 text-body-medium"
              >
                {link.icon}
                <p>{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
