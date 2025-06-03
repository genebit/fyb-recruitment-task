import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, router } from "@inertiajs/react";
import User from "@/interfaces/User";

interface AuthenticatedLayoutProps {
  user: User;
  header?: ReactNode;
}

export default function Authenticated({
  user,
  header,
  children,
}: PropsWithChildren<AuthenticatedLayoutProps>) {
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    await router.post(route("api.auth.logout"));
    localStorage.removeItem("auth_token");

    router.visit(route("auth.login"));
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <nav>
        <div className="flex items-center justify-between px-4 py-2 bg-white shadow">
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
