import classNames from "classnames";
import { useState, useRef } from "react";
import { FiX } from "react-icons/fi";
import { useClickOutside } from "../../hooks/useClickOutside.js";

export const Modal = ({ label, content }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useClickOutside(ref, () => setOpen(false));

  return (
    <div>
      <div
        onClick={() => {
          setOpen(true);
        }}
      >
        {label}
      </div>
      <div
        className={classNames(
          "w-full h-full flex items-center justify-center fixed left-0 top-0 bg-black/20 z-10",
          open ? "opacity-100" : "opacity-0 invisible"
        )}
      >
        <div className="bg-white rounded-md relative p-5" ref={ref}>
          <FiX
            className="absolute right-1 top-1 hover:scale-110 transition-transform cursor-pointer"
            onClick={() => setOpen(false)}
          />
          {content({ setOpen })}
        </div>
      </div>
    </div>
  );
};
