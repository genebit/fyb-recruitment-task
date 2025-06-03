import { useEffect } from "react";
import { router } from "@inertiajs/react";
import useAuth from "@/hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

export default function PrivateRoute({ children }: Props) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      // No user found, redirect to login
      router.visit(route("auth.login"));
    }
  }, [loading, user]);

  if (loading) return <div>Loading...</div>;

  return user ? <>{children}</> : null;
}
