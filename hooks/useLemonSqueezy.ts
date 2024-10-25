import { useState, useEffect } from "react";

export function useLemonSqueezy() {
  const [isCheckoutReady, setIsCheckoutReady] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    function checkLemonSqueezy() {
      // @ts-ignore lemon squeezy is defined in the global scope
      if (typeof window.createLemonSqueezy === "function") {
        // @ts-ignore lemon squeezy is defined in the global scope
        window.createLemonSqueezy();
        setIsCheckoutReady(true);
      } else {
        timeoutId = setTimeout(checkLemonSqueezy, 100);
      }
    }

    checkLemonSqueezy();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return isCheckoutReady;
}
