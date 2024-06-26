"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <RecoilRoot>
      <SessionProvider>{children}</SessionProvider>
    </RecoilRoot>
  );
};
