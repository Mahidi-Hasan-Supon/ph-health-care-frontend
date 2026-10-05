import AuthGuard from "@/components/auth/auth-guard";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <AuthGuard>{children}</AuthGuard>
    </div>
  );
};

export default DashboardLayout;
