"use client";

import { SearchInput } from "@/components/ui/search";

import logo from "@/public/images/logo.svg";
import { Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SidebarMenu from "./sidebar-menu";
import MobileBottomNav from "./mobile-bottom-nav";
import MobileGlobalSearchbar from "./mobile-global-searchbar";
import { useSettings } from "@/components/shared/global-provider";

export default function MobileNavbar({ menus }) {
  const settings = useSettings();
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  return (
    <>
      <nav>
        <div className="flex w-full justify-between shadow-md">
          <div
            className="flex cursor-pointer items-center border-r p-3"
            onClick={() => setOpen(true)}
          >
            <Menu size={24} />
          </div>

          <div className="flex justify-center">
            <Link href={"/"} className="w-fit" aria-label="Let'z Gear Logo">
              <Image
                src={settings?.logo || logo}
                alt={settings?.title || "Logo"}
                width={200}
                height={40}
                className="w-auto cursor-pointer max-xs:h-5 xs:h-8 sm:h-10"
                quality={100}
                loading="eager"
              />
            </Link>
          </div>

          <MobileGlobalSearchbar
            showSearch={showSearch}
            setShowSearch={setShowSearch}
          />
        </div>
      </nav>

      <SidebarMenu open={open} setOpen={setOpen} menus={menus} />

      <div className="sm:hidden">
        <MobileBottomNav
          categoryOpen={open}
          setCategoryOpen={setOpen}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
        />
      </div>
    </>
  );
}
