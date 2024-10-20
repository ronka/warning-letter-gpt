import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Credits } from "./header/credits";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          התראהGPT
        </Link>
        <nav>
          <ul className="flex space-x-4 gap-4 items-center">
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
            <SignedIn>
              <Credits />
            </SignedIn>
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
