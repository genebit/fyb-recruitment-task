import useAuth from "@/hooks/useAuth";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrivateRoute from "@/Routes/PrivateRoute";

export default function Product() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <PrivateRoute>
      <AuthenticatedLayout user={user!}>
        <div>
          <h1>Product Page</h1>
          <p>
            This page is protected and can only be accessed by authenticated
            users.
          </p>
        </div>
      </AuthenticatedLayout>
    </PrivateRoute>
  );
}
