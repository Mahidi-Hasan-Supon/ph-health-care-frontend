"use client";
import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";
import { UserRole } from "@/types";
import AccessDenied from "./access-denied";

interface IProps {
    children:ReactNode 
    roles:UserRole[]
}


const RoleGuard = ({ children , roles}:IProps) => {
  const router = useRouter();
  const { isPending, isError, data } = useGetMe();
  //   console.log(data);
  const user = data?.data;

  const isAuthorization = !!user && roles.includes(user.role)

  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isError || !user) {
      return router.replace("/login");
    }
  }, [router, user, isError, isPending]);
  if (isError || !user) {
    return <AuthLoading lebel="Redirecting...." />;
  }
  if (isPending) {
    return <AuthLoading />;
  }
  if(isAuthorization){
    return <>{children}</>
  }

  return <AccessDenied/>
};

export default RoleGuard;
