import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center min-h-screen pt-6 bg-neutral-50 sm:justify-center sm:pt-0">
      {children}
    </div>
  );
}
