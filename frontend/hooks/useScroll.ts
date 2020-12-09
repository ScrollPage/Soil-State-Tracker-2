import { useState } from "react";
import { useEffect } from "react";

export function useScroll() {
  const [scroll, setScroll] = useState<number>(0);

  useEffect(() => {
    function handleScroll() {
      setScroll(window.pageYOffset);
    }
    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scroll;
}
