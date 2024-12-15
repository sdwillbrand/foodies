import { useCallback, useEffect } from "react";

export function useClickOutside(ref, cb) {
  const handleCb = useCallback(() => cb(), [cb]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref?.current && !ref.current.contains(event.target)) {
        handleCb();
      }
    }

    // Attach the event listener
    document.addEventListener("click", handleClickOutside, { capture: true });

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside, {
        capture: true,
      });
    };
  }, [handleCb, ref]); // ref dependency isn't strictly necessary but is included for clarity
}
