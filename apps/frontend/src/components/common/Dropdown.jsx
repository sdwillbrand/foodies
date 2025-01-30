import { useRef, useState } from "react";
import classNames from "classnames";
import { useClickOutside } from "../../hooks/useClickOutside.js";

export const Dropdown = ({ children, header }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useClickOutside(ref, () => setOpen(false));

  return (
    <div className="flex justify-center" ref={ref}>
      <div onClick={() => setOpen((prev) => !prev)}>{header}</div>
      <div
        className={classNames(
          "transition-all duration-300 fixed mt-10 z-50",
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
