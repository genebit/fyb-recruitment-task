import { useState, PropsWithChildren, ReactNode } from "react";
import { Link, router } from "@inertiajs/react";
import User from "@/interfaces/User";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Calendar, Home, Inbox, LogOut, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthenticatedLayoutProps {
  user: User;
}

export default function Authenticated({
  user,
  children,
}: PropsWithChildren<AuthenticatedLayoutProps>) {
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    await router.post(route("api.auth.logout"));
    localStorage.removeItem("auth_token");

    router.visit(route("auth.login"));
  };

  const AppSidebar = () => {
    const items = [
      {
        title: "Account",
        url: route("profile"),
        icon: Inbox,
      },
    ];

    return (
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Account Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button
                      className="justify-start"
                      size={"sm"}
                      variant={"outline"}
                      role="button"
                      onClick={handleLogout}
                    >
                      <LogOut />
                      <span>Log Out</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    );
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full gap-3 p-5">
        <SidebarTrigger />
        <hr />
        <article className="p-5">{children}</article>
      </main>
    </SidebarProvider>
  );
}
