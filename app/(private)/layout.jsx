"use client";

import Footer from "@/components/globals/footer";
import Navbar from "@/components/globals/navbar";
import AuthGuard from "@/components/hoc/auth-guard";

export default function PrivateLayout({ children }) {
  return (
    <AuthGuard>
      <Navbar />
      {children}
      <Footer />
    </AuthGuard>
  );
}
