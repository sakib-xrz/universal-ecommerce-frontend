"use client";

import { useAuthToken } from "@/redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingImage from "@/public/images/loading.svg";
import { toast } from "sonner";

export default function AuthGuard({ children, allowedRoles = ["CUSTOMER"] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const token = useAuthToken();

  useEffect(() => {
    if (!token) {
      toast.error("You must be logged in to view this page");
      const pathnameWithQuery =
        window.location.pathname + window.location.search;
      router.replace(`/login?next=${pathnameWithQuery}`);
      setLoading(false);
      return;
    }

    let decodedData;

    try {
      decodedData = jwtDecode(token);
    } catch (error) {
      toast.error("Session expired, Please log in again.");
      router.replace("/login");
      setLoading(false);
      return;
    }

    const userRole = decodedData?.role;

    if (allowedRoles.length && !allowedRoles.includes(userRole)) {
      toast.error("You don't have permission to view this page.");
      router.replace("/login");
      setLoading(false);
      return;
    }

    setIsAuthorized(true);
    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, pathname]);

  if (loading)
    return (
      <div className="flex h-svh animate-pulse items-center justify-center">
        <Image src={LoadingImage} alt="Loading" />
      </div>
    );
  if (!isAuthorized) return null;

  return children;
}
