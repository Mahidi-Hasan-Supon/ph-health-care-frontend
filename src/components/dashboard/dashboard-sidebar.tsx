"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/asserts/svg/logo";
import { UserRole } from "@/types";
import { adminRoutes, doctorRoutes, patientRoutes } from "@/routes";
import { SidebarItems } from "@/types/sidebar.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

// This is sample data.
// const data = {
//   navMain: [
//     {
//       title: "Management",
//       url: "#",
//       items: [
//         {
//           title: "overview",
//           url: "/admin",
//         },
//         {
//           title: "Doctor approval",
//           url: "/admin/doctor-approve",
//         },
//       ],
//     },
//     {
//       title: "App routing",
//       url: "#",
//       items: [
//         {
//           title: "Routing",
//           url: "#",
//         },
//         {
//           title: "Data Fetching",
//           url: "#",
//           isActive: true,
//         },
//         {
//           title: "Rendering",
//           url: "#",
//         },
//         {
//           title: "Caching",
//           url: "#",
//         },
//       ],
//     },
//   ],
// };

const sidebarRoutes: Partial<Record<UserRole, SidebarItems>> = {
  SUPER_ADMIN: adminRoutes,
  ADMIN: adminRoutes,
  DOCTOR: doctorRoutes,
  PATIENT: patientRoutes,
};

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathName = usePathname();
  const routes: SidebarItems = sidebarRoutes[role] || [];
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/">
          <div className="flex items-center gap-2">
            <Logo />
            <span>PH Healthcare</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={pathName === item.url}
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
