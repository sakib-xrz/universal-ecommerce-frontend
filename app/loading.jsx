import Image from "next/image";
import loading from "@/public/images/loading.svg";

export default function Loading() {
  return (
    <div className="flex h-svh animate-pulse items-center justify-center">
      <Image src={loading} alt="Loading" />
    </div>
  );
}
