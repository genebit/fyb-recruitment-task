import { useState, PropsWithChildren, ReactNode, useEffect } from "react";
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
import useAuth from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/sonner";
import PulseLoader from "@/components/ui/pulse-loader";

type AuthenticatedProps = {
  children: ReactNode;
};

export default function Authenticated({ children }: AuthenticatedProps) {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <PulseLoader />;
  }

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    logout();
    router.visit(route("auth.login"));
  };

  const AppSidebar = () => {
    return (
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Account Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <div className="flex gap-2">
                    <span className="flex items-center justify-center text-white uppercase rounded-full w-9 h-9 bg-primary">
                      {user?.name
                        ? user?.name.charAt(0) +
                          user?.name.charAt(user?.name.length - 1)
                        : ""}
                    </span>
                    <div>
                      <h4 className="font-bold">{user?.name}</h4>
                      <small className="opacity-75">Administrator</small>
                    </div>
                  </div>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button
                      className="justify-start mt-3"
                      size={"sm"}
                      variant={"outline"}
                      role="button"
                      onClick={handleLogout}
                    >
                      <LogOut />
                      <span className="font-normal">Log out</span>
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
        <Toaster />
      </main>
    </SidebarProvider>
  );
}
