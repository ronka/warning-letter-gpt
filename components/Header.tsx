"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

interface NavLinkProps {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const NavLink = ({ href, onClick, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`hover:underline ${isActive ? "font-bold underline" : ""}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const NavItems = ({ onClick }: { onClick?: () => void }) => {
  return (
    <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 gap-4 items-center p-4 md:p-0">
      <li>
        <NavLink href="/letter" onClick={onClick}>
          צור מכתב
        </NavLink>
      </li>
      <li>
        <NavLink href="/letters" onClick={onClick}>
          המכתבים שיצרת
        </NavLink>
      </li>
      <li>
        <NavLink href="/help" onClick={onClick}>
          עזרה
        </NavLink>
      </li>
      <SignedIn>
        <li>
          <NavLink href="/credits" onClick={onClick}>
            דאשבורד
          </NavLink>
        </li>
      </SignedIn>
      <SignedOut>
        <li>
          <NavLink href="/sign-in" onClick={onClick}>
            <Button variant="secondary" className="text-primary">
              התחברות ↗
            </Button>
          </NavLink>
        </li>
      </SignedOut>
    </ul>
  );
};

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
