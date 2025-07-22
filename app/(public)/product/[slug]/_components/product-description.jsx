"use client";

import "react-quill/dist/quill.snow.css";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ProductDescription({
  fullDescription,
  deliveryPolicy,
}) {
  const [view, setView] = useState("description");

  return (
    <>
      <div className="mb-2 mt-8 flex items-center gap-6">
        <div onClick={() => setView("description")} className="cursor-pointer">
          <h2 className="text-left font-semibold uppercase text-primary sm:text-center sm:text-xl">
            DESCRIPTION
          </h2>
          <div
            className={cn(
              "mt-1 h-0.5 flex-1 bg-transparent",
              view === "description" && "bg-gray-200",
            )}
          >
            <div
              className={cn(
                "h-0.5 w-14 bg-transparent",
                view === "description" && "bg-primary",
              )}
            ></div>
          </div>
        </div>

        <div onClick={() => setView("delivery")} className="cursor-pointer">
          <h2 className="text-left font-semibold uppercase text-primary sm:text-center sm:text-xl">
            DELIVERY POLICY
          </h2>
          <div
            className={cn(
              "mt-1 h-0.5 flex-1 bg-transparent",
              view === "delivery" && "bg-gray-200",
            )}
          >
            <div
              className={cn(
                "h-0.5 w-14 bg-transparent",
                view === "delivery" && "bg-primary",
              )}
            ></div>
          </div>
        </div>
      </div>

      <div>
        {view === "description" ? (
          fullDescription ? (
            <div
              className="prose ql-editor !px-0"
              dangerouslySetInnerHTML={{ __html: fullDescription }}
            />
          ) : (
            <div className="prose ql-editor !px-0">
              {" "}
              No description available{" "}
            </div>
          )
        ) : deliveryPolicy ? (
          <div
            className="prose ql-editor !px-0"
            dangerouslySetInnerHTML={{ __html: deliveryPolicy }}
          />
        ) : (
          <div className="prose ql-editor !px-0">
            {" "}
            No delivery policy available{" "}
          </div>
        )}
      </div>
    </>
  );
}
