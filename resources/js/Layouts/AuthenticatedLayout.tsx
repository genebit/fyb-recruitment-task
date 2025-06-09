import { ReactNode } from "react";
import { router } from "@inertiajs/react";
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
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/sonner";
import PulseLoader from "@/components/ui/pulse-loader";
import { Card, CardContent } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { toast } from "sonner";

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

    toast("User has been logged out, redirecting to login page.");

    setTimeout(() => {
      router.visit(route("auth.login"));
    }, 1000);
  };

  const AppSidebar = () => {
    return (
      <Sidebar className="bg-white dark:bg-slate-950 dark:*:text-white">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <header className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 180 164"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.46446 70.5355L63.4645 8.53553C66.6143 5.38571 72 7.61654 72 12.0711V86.9787C72 88.2753 71.4964 89.5211 70.5953 90.4534L8.59534 154.606C5.47105 157.839 0 155.627 0 151.132V74.0711C0 72.745 0.526783 71.4732 1.46446 70.5355Z"
                      fill="#718BFF"
                    />
                    <path
                      d="M109.464 70.5355L171.464 8.53553C174.614 5.38571 180 7.61654 180 12.0711V86.9787C180 88.2753 179.496 89.5211 178.595 90.4534L116.595 154.606C113.471 157.839 108 155.627 108 151.132V74.0711C108 72.745 108.527 71.4732 109.464 70.5355Z"
                      fill="#060C27"
                    />
                    <path
                      d="M105.929 72H12.4527C8.015 72 5.77663 66.6491 8.89253 63.4893L70.0314 1.48928C70.971 0.53643 72.2534 0 73.5916 0H167.929C172.383 0 174.614 5.3857 171.464 8.53552L109.464 70.5355C108.527 71.4732 107.255 72 105.929 72Z"
                      fill="#00146B"
                    />
                  </svg>
                </span>
                <div>
                  <h6 className="text-sm font-extrabold">
                    Product <br /> Management
                  </h6>
                </div>
              </header>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
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
                        : "Guest"}
                    </span>
                    <div>
                      <h4 className="font-bold">{user?.name ?? "Guest"}</h4>
                      <small className="opacity-75">Administrator</small>
                    </div>
                  </div>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button
                      className="justify-start mt-3 dark:text-white"
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

  const Breadcrumb = () => {
    // NOTE: temporary for this demo.
    return (
      <nav aria-label="breadcrumb" data-slot="breadcrumb">
        <ol
          data-slot="breadcrumb-list"
          className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5"
        >
          <li
            data-slot="breadcrumb-item"
            className="items-center gap-1.5 hidden md:block"
          >
            <a
              data-slot="breadcrumb-link"
              className="transition-colors hover:text-foreground"
              href="#"
            >
              Management
            </a>
          </li>
          <li
            data-slot="breadcrumb-separator"
            role="presentation"
            aria-hidden="true"
            className="[&amp;>svg]:size-3.5 hidden md:block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </li>
          <li
            data-slot="breadcrumb-item"
            className="inline-flex items-center gap-1.5"
          >
            <span
              data-slot="breadcrumb-page"
              role="link"
              aria-disabled="true"
              aria-current="page"
              className="font-normal text-foreground"
            >
              My Products
            </span>
          </li>
        </ol>
      </nav>
    );
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full gap-3 p-5 bg-white dark:bg-slate-950 dark:*:text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <span className="scale-75">|</span>
            <Breadcrumb />
          </div>
          <ModeToggle />
        </div>
        <hr />
        <article className="p-5">
          <header className="mb-10">
            <Card className="relative shadow-2xl bg-slate-950 shadow-slate-200 dark:shadow-black overflow-clip">
              <CardContent className="py-10 text-white">
                <h1 className="text-2xl font-black">
                  Welcome back, {user?.name}!
                </h1>
                <p className="mt-3 text-base text-muted-foreground">
                  Let's start by listing products for your buyers!
                </p>
                <span className="absolute right-16 scale-[10]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 180 164"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.46446 70.5355L63.4645 8.53553C66.6143 5.38571 72 7.61654 72 12.0711V86.9787C72 88.2753 71.4964 89.5211 70.5953 90.4534L8.59534 154.606C5.47105 157.839 0 155.627 0 151.132V74.0711C0 72.745 0.526783 71.4732 1.46446 70.5355Z"
                      fill="#718BFF"
                    />
                    <path
                      d="M109.464 70.5355L171.464 8.53553C174.614 5.38571 180 7.61654 180 12.0711V86.9787C180 88.2753 179.496 89.5211 178.595 90.4534L116.595 154.606C113.471 157.839 108 155.627 108 151.132V74.0711C108 72.745 108.527 71.4732 109.464 70.5355Z"
                      fill="#060C27"
                    />
                    <path
                      d="M105.929 72H12.4527C8.015 72 5.77663 66.6491 8.89253 63.4893L70.0314 1.48928C70.971 0.53643 72.2534 0 73.5916 0H167.929C172.383 0 174.614 5.3857 171.464 8.53552L109.464 70.5355C108.527 71.4732 107.255 72 105.929 72Z"
                      fill="#00146B"
                    />
                  </svg>
                </span>
              </CardContent>
            </Card>
          </header>
          {children}
        </article>
        <Toaster position="bottom-left" />
      </main>
    </SidebarProvider>
  );
}
