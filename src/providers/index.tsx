"use client";
import { ReactNode } from "react";
import QueryProvider from "./query.provider";
import GoogleAuthProvider from "./google-auth-provider";
import { Tooltip } from "@/components/ui/tooltip";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GoogleAuthProvider>
      <QueryProvider>
        <Tooltip>
        {children}
        </Tooltip>
        </QueryProvider>
    </GoogleAuthProvider>
  );
}
