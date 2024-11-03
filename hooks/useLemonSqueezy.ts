import { useState, useEffect, useRef } from "react";

export function useLemonSqueezy() {
  const [isCheckoutReady, setIsCheckoutReady] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    function checkLemonSqueezy() {
      // @ts-ignore lemon squeezy is defined in the global scope
      const createLemonSqueezy = window.createLemonSqueezy;

      if (typeof createLemonSqueezy === "function") {
        createLemonSqueezy();
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

  useEffect(() => {
    if (!isCheckoutReady) return;

    // @ts-ignore lemon squeezy is defined in the global scope
    const lemonSqueezy = window.LemonSqueezy;

    if (lemonSqueezy) {
      lemonSqueezy.Setup({
        eventHandler: ({ event }: any) => {
          if (event === "Checkout.Success") {
            window.location.reload();
          }
        },
      });
    }
  }, [isCheckoutReady]);

  return isCheckoutReady;
}
