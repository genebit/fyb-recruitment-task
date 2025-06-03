import { useEffect } from "react";
import { router } from "@inertiajs/react";
import useAuth from "@/hooks/useAuth";

interface GuestRouteProps {
  children: React.ReactNode;
}

export default function GuestRoute({ children }: GuestRouteProps) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      // If user is logged in, redirect to dashboard (or any protected page)
      router.visit(route("product"));
    }
  }, [loading, user]);

  if (loading) return <div>Loading...</div>;

  // Render children only if no user (guest)
  return !user ? <>{children}</> : null;
}
