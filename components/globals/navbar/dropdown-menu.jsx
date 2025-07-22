import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function CustomDropdownMenu({ menu, position = "center" }) {
  const pathname = usePathname();
  // Calculate dropdown alignment
  const alignmentClass =
    position === "first"
      ? "left-0"
      : position === "last"
        ? "right-0"
        : "left-1/2 -translate-x-1/2";

  return (
    <div className="group relative">
      {/* Main Menu Item */}
      <Link
        href={`/category/${menu.slug}`}
        className={cn(
          "my-2 flex items-center gap-1 border-b border-transparent px-1 font-mono text-sm uppercase text-primary transition-colors group-hover:border-primary",
          {
            "border-primary": pathname === `/category/${menu.slug}`,
          },
        )}
        aria-label={menu.name}
      >
        {menu.name}
        {menu.sub_categories.length > 0 && (
          <ChevronDown
            size={14}
            className="transition-transform duration-300 group-hover:rotate-180"
          />
        )}
      </Link>

      {/* Dropdown Menu */}
      {menu.sub_categories.length > 0 && (
        <ul
          className={`absolute ${alignmentClass} z-50 hidden w-60 transform rounded-lg border border-gray-300 bg-white text-sm shadow-md transition-all duration-300 group-hover:block group-hover:translate-y-0 group-hover:opacity-100`}
        >
          {menu.sub_categories.map((sub) => (
            <Link
              key={sub.id}
              href={`/category/${menu.slug}${sub.slug}`}
              className={cn(
                "block px-4 py-3 font-mono text-sm text-secondary-foreground transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-secondary hover:text-secondary-foreground",
                {
                  "bg-secondary text-secondary-foreground":
                    pathname === `/category/${menu.slug}${sub.slug}`,
                },
              )}
              aria-label={sub.name}
            >
              {sub.name}
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
