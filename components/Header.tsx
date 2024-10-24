"use client";

import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Credits } from "./header/credits";
import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";

const NavItems = ({ onClick }: { onClick?: () => void }) => (
  <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 gap-4 items-center p-4 md:p-0">
    <li>
      <Link href="/" className="hover:underline" onClick={onClick}>
        בית
      </Link>
    </li>
    <li>
      <Link href="/letter" className="hover:underline" onClick={onClick}>
        צור מכתב
      </Link>
    </li>
    <li>
      <Link href="/letters" className="hover:underline" onClick={onClick}>
        המכתבים שיצרת
      </Link>
    </li>
    <SignedIn>
      <Credits />
    </SignedIn>
    <li>
      <SignedOut>
        <Link href="/sign-in" className="hover:underline" onClick={onClick}>
          התחברות
        </Link>
      </SignedOut>
      <SignedIn>
        <SignOutButton>
          <button className="hover:underline" onClick={onClick}>
            התנתקות
          </button>
        </SignOutButton>
      </SignedIn>
    </li>
  </ul>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          התראהGPT
        </Link>
        <nav className="hidden md:flex">
          <NavItems />
        </nav>
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="text-2xl font-bold">☰</button>
            </SheetTrigger>
            <SheetContent>
              <DialogTitle asChild>
                <VisuallyHidden>Navigation Menu</VisuallyHidden>
              </DialogTitle>
              <NavItems onClick={() => setIsOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export { Header };
