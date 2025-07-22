"use client";

import DesktopNavbar from "./desktop-navbar";
import MobileNavbar from "./mobile-navbar";
import FloatingCart from "./floating-cart";
import { useGetMenusQuery } from "@/redux/features/menu/menuApi";

export default function Navbar() {
  const { data: menus } = useGetMenusQuery();

  return (
    <>
      <div className="sticky top-0 z-50 bg-white">
        <div className="hidden lg:block">
          <DesktopNavbar menus={menus?.data} />
        </div>
        <div className="block lg:hidden">
          <MobileNavbar menus={menus?.data} />
        </div>
      </div>
      <FloatingCart />
    </>
  );
}
