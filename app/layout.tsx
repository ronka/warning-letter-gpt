import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Body } from "@/components/Body";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { heIL } from "@clerk/localizations";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "התראהGPT",
  description: "בו לייצר מכתב התראה מהיר וקל לכל שם ומטרה שתרצה",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={heIL}>
      <html lang="en" dir="rtl">
        <link rel="icon" href="https://fav.farm/📨" />
        <body className={inter.className}>
          <Body>
            <Header />
            {children}
            <Footer />
          </Body>
        </body>
      </html>
    </ClerkProvider>
  );
}
