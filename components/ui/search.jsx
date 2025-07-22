import * as React from "react";

import { cn } from "@/lib/utils";
import { Search as SearchIcon } from "lucide-react";

const SearchInput = React.forwardRef(
  ({ className, extraClassName, type, showIcon = true, ...props }, ref) => {
    return (
      <div className={cn("relative w-60", extraClassName)}>
        <input
          type={type}
          className={cn(
            "flex h-9 w-60 rounded-none border-0 border-b border-input border-b-transparent bg-transparent px-0 py-1 pr-5 text-base shadow-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:font-mono placeholder:text-muted-foreground focus-visible:border-b focus-visible:border-gray-300 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
          )}
          ref={ref}
          {...props}
        />
        {showIcon && (
          <SearchIcon
            size={16}
            className="trasform absolute right-0 top-1/2 -translate-y-1/2 text-gray-500"
          />
        )}
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
