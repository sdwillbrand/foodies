import classNames from "classnames";

export const LoadingSkeleton = ({ className }) => {
  return (
    <div
      className={classNames(
        "animate-pulse w-56 h-10 bg-slate-100 rounded-lg",
        className
      )}
    />
  );
};
