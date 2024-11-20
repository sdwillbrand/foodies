import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

export const Dropdown = ({ children, header }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      // Check if click is outside the ref element
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    // Attach the event listener
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-center" ref={ref}>
      <div onClick={() => setOpen((prev) => !prev)}>{header}</div>
      <div
        className={classNames(
          "transition-transform duration-300 fixed mt-10 z-50",
          open
            ? "translate-y-2 opacity-100"
            : "translate-y-0 opacity-0 invisible"
        )}
      >
        {children}
      </div>
    </div>
  );
};
