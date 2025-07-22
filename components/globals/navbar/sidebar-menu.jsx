"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useUser } from "@/redux/features/auth/authSlice";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SidebarMenu({ open, setOpen, menus }) {
  const pathname = usePathname();
  const [expandedCategory, setExpandedCategory] = useState(null);

  const user = useUser();

  const handleCategoryClick = (categoryId) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  return (
    <Sheet open={open} onOpenChange={() => setOpen(false)} modal>
      <SheetContent side="left" className="h-full overflow-y-auto px-4">
        <div className="mt-10">
          {menus?.map((menu) => (
            <div key={menu.id} className="border-b border-gray-200">
              {/* Parent Menu */}
              <div
                className={cn(
                  "flex cursor-pointer items-center justify-between py-4",
                  {
                    "pb-2":
                      expandedCategory === menu.id &&
                      menu.sub_categories.length,
                  },
                )}
                onClick={() => handleCategoryClick(menu.id)}
              >
                <Link
                  href={`/category/${menu.slug}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-sm font-medium uppercase text-muted-foreground transition-colors",
                    {
                      "text-secondary-foreground":
                        pathname === `/category/${menu.slug}`,
                    },
                  )}
                  aria-label={menu.name}
                >
                  {menu.name}
                </Link>

                {menu.sub_categories.length ? (
                  expandedCategory === menu.id ? (
                    <Minus
                      size={14}
                      className="text-muted-foreground transition-transform duration-300"
                    />
                  ) : (
                    <Plus
                      size={14}
                      className="text-muted-foreground transition-transform duration-300"
                    />
                  )
                ) : null}
              </div>

              {/* Subcategories */}
              {menu.sub_categories.length > 0 &&
                expandedCategory === menu.id && (
                  <ul className="ml-4">
                    {menu.sub_categories.map((sub) => (
                      <li key={sub.id}>
                        <Link
                          aria-label={sub.name}
                          onClick={() => setOpen(false)}
                          href={`/category/${menu.slug}${sub.slug}`}
                          className={cn(
                            "block py-3 text-sm font-medium text-muted-foreground transition-colors",
                            {
                              "text-secondary-foreground":
                                pathname ===
                                `/category/${menu.slug}${sub.slug}`,
                            },
                          )}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          ))}
        </div>

        {user ? (
          <>
            <Link
              aria-label="Login"
              href={"/profile"}
              onClick={() => setOpen(false)}
              className="block border-b border-gray-200 py-4 text-sm font-medium uppercase text-muted-foreground transition-colors"
            >
              Profile
            </Link>
            <Link
              aria-label="Login"
              href={"/my-orders"}
              onClick={() => setOpen(false)}
              className="block border-b border-gray-200 py-4 text-sm font-medium uppercase text-muted-foreground transition-colors"
            >
              My Orders
            </Link>
            <Link
              aria-label="Login"
              href={"/logout"}
              onClick={() => setOpen(false)}
              className="block py-4 text-sm font-medium uppercase text-muted-foreground transition-colors"
            >
              Logout
            </Link>
          </>
        ) : (
          <Link
            aria-label="Login"
            href={"/login"}
            onClick={() => setOpen(false)}
            className="block py-4 text-sm font-medium uppercase text-muted-foreground transition-colors"
          >
            Login
          </Link>
        )}
      </SheetContent>
    </Sheet>
  );
}
