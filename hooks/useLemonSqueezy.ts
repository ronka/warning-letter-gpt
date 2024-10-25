import { useState, useEffect } from "react";

export function useLemonSqueezy() {
  const [isCheckoutReady, setIsCheckoutReady] = useState(false);

  useEffect(() => {
    // @ts-ignore lemon squeezy is defined in the global scope
    if (typeof window.createLemonSqueezy === "function") {
      // @ts-ignore lemon squeezy is defined in the global scope
      window.createLemonSqueezy();
    }

    function checkLemonSqueezy() {
      // @ts-ignore lemon squeezy is defined in the global scope
      if (window.LemonSqueezy) {
        setIsCheckoutReady(true);
      } else {
        setTimeout(checkLemonSqueezy, 100);
      }
    }

    checkLemonSqueezy();
  }, []);

  return isCheckoutReady;
}
