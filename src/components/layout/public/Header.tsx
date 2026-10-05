"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import { adminRoutes, doctorRoutes, patientRoutes } from "@/routes";
import { UserRole } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const Header = () => {
  const routes = [
    { name: "Home", url: "/" },
    { name: "Doctors", url: "/doctors" },
    { name: "About us", url: "/about-us" },
  ];

  const dashboardRoute: Record<UserRole, string> = {
    SUPER_ADMIN: "/admin",
    ADMIN: "admin",
    DOCTOR: "doctor",
    PATIENT: "/patient",
  };

  const { data, isLoading } = useGetMe();
  console.log(data);
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();

  const role: UserRole = !!data?.data && data?.data.role;

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: (res) => {
        // console.log(res);
        toast.add({
          title: "Tata",
          description: "Logout successfully",
          type: "success",
        });
        queryClient.removeQueries({ queryKey: ["user"] });
      },
      onError: (err) => {
        // console.log(err);
        toast.add({
          title: "Logout error",
          description: err.message || "Someting went wrong.Please try again",
          type: "error",
        });
      },
    });
  };
  return (
    <header className="w-full h-16 border border-b flex justify-center items-center gap-5">
      <div className="flex justify-between w-full m-5">
        <div>Ph HealthCare</div>

        <div className="flex gap-4">
          {routes.map((route) => (
            <Link href={route.url} key={route.url}>
              {route.name}
            </Link>
          ))}
          {role && <Link href={dashboardRoute[role]}>Dashboard</Link>}
        </div>
        <div>
          {!isLoading && !data && (
            <Button
              variant="outline"
              render={<Link href="/login">Login</Link>}
              nativeButton={false}
            >
              Login
            </Button>
          )}
          {!isLoading && data && (
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          )}
          {/* {!data && !isLoading && (
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition duration-200 cursor-pointer text-center inline-block"
            >
              Login
            </Link>
          )}
          {data && !isLoading && (
            <Link onClick={handleLogout}
              href="/login"
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md transition duration-200 cursor-pointer text-center inline-block"
            >
              LogOut
            </Link>
          )} */}
        </div>
      </div>
    </header>
  );
};

export default Header;
