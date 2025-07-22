"use client";

import Footer from "@/components/globals/footer";
import Navbar from "@/components/globals/navbar";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
