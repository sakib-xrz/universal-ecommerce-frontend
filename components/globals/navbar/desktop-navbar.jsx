"use client";

import Container from "@/components/shared/container";
import { BookHeart, Phone, UserRound } from "lucide-react";
import logo from "@/public/images/logo.svg";
import Image from "next/image";
import CustomDropdownMenu from "./dropdown-menu";
import Link from "next/link";
import { useWishlistCount } from "@/redux/features/wishlist/wishlistSlice";
import WishlistDrawer from "@/components/shared/wishlist/wishlist-drawer";
import { useState } from "react";
import GlobalSearchbar from "./global-searchbar";
import { useUser } from "@/redux/features/auth/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettings } from "@/components/shared/global-provider";

export default function DesktopNavbar({ menus }) {
  const settings = useSettings();
  const wishlistCount = useWishlistCount();
  const [openWishlistDrawer, setOpenWishlistDrawer] = useState(false);
  const user = useUser();

  return (
    <>
      <nav>
        <div>
          <Container className="grid items-center justify-center border-b border-gray-200 lg:grid-cols-3 lg:py-4">
            <GlobalSearchbar />

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

            <div className="flex justify-end gap-4">
              <a
                href={`tel:${settings?.phone}`}
                className="cursor-pointer"
                aria-label="Call Us"
              >
                <Phone className="text-gray-600" />
              </a>
              <div
                className="relative cursor-pointer"
                onClick={() => setOpenWishlistDrawer(true)}
              >
                <BookHeart className="text-gray-600" />

                {wishlistCount > 0 && (
                  <span className="absolute right-[-8px] top-[-8px] flex size-5 items-center justify-center rounded-full bg-primary text-xs font-medium leading-none text-white">
                    {wishlistCount}
                  </span>
                )}
              </div>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <UserRound className="cursor-pointer text-gray-600" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="min-w-48 max-w-64 bg-white"
                    align="end"
                  >
                    <DropdownMenuLabel className="flex flex-col">
                      <span>Signed in as</span>
                      <span className="line-clamp-1 text-xs font-normal text-foreground">
                        {user?.email}
                      </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <Link href="/profile">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                      </Link>
                      <Link href="/my-orders">
                        <DropdownMenuItem>My Orders</DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <Link href="/logout">
                      <DropdownMenuItem className="focus:bg-destructive focus:text-white">
                        Logout
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login" className="cursor-pointer">
                  <UserRound className="text-gray-600" />
                </Link>
              )}
            </div>
          </Container>
        </div>

        <Container className="flex justify-center gap-6 lg:py-2">
          {menus?.map((menu, index) => {
            const position =
              index === 0
                ? "first"
                : index === menus.length - 1
                  ? "last"
                  : "center";

            return (
              <CustomDropdownMenu
                menu={menu}
                key={menu.id}
                position={position}
              />
            );
          })}
        </Container>
      </nav>

      <WishlistDrawer
        open={openWishlistDrawer}
        setOpen={setOpenWishlistDrawer}
      />
    </>
  );
}
