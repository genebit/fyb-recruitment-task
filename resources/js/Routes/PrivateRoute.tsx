import { useEffect, useRef } from "react";
import { router } from "@inertiajs/react";
import useAuth from "@/hooks/useAuth";
import PulseLoader from "@/components/ui/pulse-loader";

type PrivateRouteProps = {
  children: React.ReactNode;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading, logout } = useAuth();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!loading && !user && !hasRedirected.current) {
      hasRedirected.current = true;
      logout();
      router.visit(route("auth.login"));
    }

    if (user) {
      hasRedirected.current = false;
    }
  }, [loading, user]);

  // Show loading while authenticating or redirecting
  if (loading || (!user && !hasRedirected.current)) {
    return <PulseLoader />;
  }

  // Only render children if user is authenticated
  return user ? <>{children}</> : null;
}
