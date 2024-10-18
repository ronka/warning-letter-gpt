import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";

import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          התראהGPT
        </Link>
        <nav>
          <ul className="flex space-x-4 gap-4">
            <li>
              <Link href="/" className="hover:underline">
                בית
              </Link>
            </li>
            <li>
              <Link href="/letter" className="hover:underline">
                מכתבים
              </Link>
            </li>
            <li>
              <SignedOut>
                <Link href="/sign-in" className="hover:underline">
                  התחברות
                </Link>
              </SignedOut>
              <SignedIn>
                <SignOutButton>
                  <button className="hover:underline">התנתקות</button>
                </SignOutButton>
              </SignedIn>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export { Header };
