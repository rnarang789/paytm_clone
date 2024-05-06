import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import AppbarClient from "./components/AppbarClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paytm Wallet",
  description: "A Simple Wallet App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <div className=" bg-[#ebe6e6] min-h-screen min-w-screen">
            <AppbarClient />
            {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}
