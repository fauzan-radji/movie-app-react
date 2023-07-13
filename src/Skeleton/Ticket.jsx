import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function Ticket({ className }) {
  return (
    <div
      className={twMerge(
        `relative flex aspect-[2/1] w-72 animate-pulse overflow-hidden rounded-2xl bg-complimentaryDark/30`,
        className
      )}
    >
      <div className="flex basis-2/3 flex-col gap-1">
        <div className="flex h-1/3 w-full items-center justify-start border-r-2 border-dashed border-neutral bg-complimentaryDark/30"></div>
        <div className="flex h-2/3 w-full flex-col gap-2 border-r-2 border-dashed border-neutral px-4 pt-1">
          <div className="flex flex-col gap-1">
            <div className="h-4 w-4/5 rounded bg-complimentaryDark/30"></div>
            <div className="h-3 w-1/4 rounded bg-complimentaryDark/30"></div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-4 w-1/2 rounded bg-complimentaryDark/30"></div>
            <div className="h-3 w-1/4 rounded bg-complimentaryDark/30"></div>
          </div>
        </div>
      </div>
      <div className="flex basis-1/3 flex-col gap-1">
        <div className="flex h-1/3 w-full items-center justify-center border-l-2 border-dashed border-neutral bg-complimentaryDark/30"></div>
        <div className="bt-2 flex h-2/3 w-full items-center justify-center border-l-2 border-dashed border-neutral">
          <div className="h-1/2 w-1/2 rounded-md bg-complimentaryDark/30"></div>
        </div>
      </div>

      <div className="absolute bottom-0 right-1/3 h-4 w-4 translate-x-1/2 translate-y-1/2 rounded-full bg-neutral"></div>
      <div className="absolute right-1/3 top-0 h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded-full bg-neutral"></div>
    </div>
  );
}

Ticket.propTypes = {
  className: PropTypes.string,
};
