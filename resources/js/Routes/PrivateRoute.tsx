import { useEffect } from "react";
import { router } from "@inertiajs/react";
import useAuth from "@/hooks/useAuth";
import { Circle } from "lucide-react";
import PulseLoader from "@/components/ui/pulse-loader";

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

  if (loading) return <PulseLoader />;

  return user ? <>{children}</> : null;
}
