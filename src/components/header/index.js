"use client";

import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";

function Header({ user,profileInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    {
      label: "Home",
      path: "/",
      show: true,
    },
    {
      label: "Login",
      path: "sign-in",
      show: !user,
    },
    {
      label: "Register",
      path: "sign-up",
      show: !user,
    },
    {
      label: "Activity",
      path: "/activity",
      show: profileInfo?.role === 'candidate',
    },
    {
      label: "Jobs",
      path: "/jobs",
      show: user,
    },
    {
      label: "Membership",
      path: "/membership",
      show: user,
    },
    {
      label: "Account",
      path: "/account",
      show: user,
    },
  ];

  return (
    <div className="w-full border-b shadow-sm fixed bg-white top-0 z-10">
      <header className="flex h-16 w-full shrink-0 items-center p-6 lg:px-8">
        <Sheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button className="lg:hidden" onClick={() => setIsOpen(true)}>
              <AlignJustify className="h-6 w-6" />
              <span className="sr-only">Toggle Navigation Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="#" className="mr-6 hidden lg:flex">
              <h3 className="text-2xl text-blue-500 font-bold">JobElevate</h3>
            </Link>
            <div className="grid gap-2 py-6">
              {menuItems?.map((menuItem) =>
                menuItem.show ? (
                  <Link
                    className="flex w-full items-center py-2 text-lg font-semibold"
                    href={menuItem.path}
                  >
                    {menuItem.label}
                  </Link>
                ) : null
              )}
              <UserButton afterSignOutUrl="/" />
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="hidden lg:flex mr-6">
          JOBELEVATE
        </Link>
        <nav className="ml-auto hidden lg:flex gap-6">
          {menuItems?.map((menuItem) =>
            menuItem.show ? (
              <Link
                className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium"
                href={menuItem.path}
                onClick={()=>sessionStorage.removeItem('filterParams')}
              >
                {menuItem.label}
              </Link>
            ) : null
          )}
          <UserButton afterSignOutUrl="/" />
        </nav>
      </header>
    </div>
  );
}

export default Header;
