import { useMediaQuery } from "react-responsive";

export default function useDesktop(minWidth = 1280) {
  return useMediaQuery({ minWidth });
}
