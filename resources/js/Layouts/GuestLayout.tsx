import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="relative flex flex-col items-center justify-center w-full p-5 m-0 bg-neutral-50 dark:bg-slate-950">
      <nav className="z-10 w-full">
        <Card className="p-2.5 shadow-lg shadow-slate-200 dark:shadow-black flex justify-between items-center px-5">
          <header className="flex items-start gap-3">
            <span className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
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
              <h5 className="text-lg font-semibold">Product Management</h5>
              <small className="text-muted-foreground">
                Inventory system for your products
              </small>
            </div>
          </header>
          <ModeToggle />
        </Card>
      </nav>
      <div className="flex flex-col items-center min-h-screen sm:justify-center">
        {children}
      </div>
      <Toaster position="bottom-left" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black z-0"></div>
    </div>
  );
}
