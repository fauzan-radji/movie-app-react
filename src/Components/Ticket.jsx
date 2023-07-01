import PropTypes from "prop-types";

export default function Ticket({ movie, seat, name }) {
  return (
    <div className="relative flex aspect-[2/1] w-72 overflow-hidden rounded-2xl bg-secondary">
      <div className="flex basis-2/3 flex-col gap-1 bg-inherit">
        <div className="flex h-1/3 w-full items-center justify-start border-r-2 border-dashed border-background bg-primary/70 px-4">
          <span className="line-clamp-1 text-sm font-bold text-background">
            {import.meta.env.VITE_APP_NAME}
          </span>
        </div>
        <div className="flex h-2/3 w-full flex-col gap-1 border-r-2 border-dashed border-background bg-inherit px-4">
          <div className="flex flex-col">
            <span className="line-clamp-1 text-sm font-bold text-text/70">
              {movie}
            </span>
            <span className="text-xs text-text/50">Movie</span>
          </div>
          <div className="flex flex-col">
            <span className="line-clamp-1 text-sm font-bold text-text/70">
              {name}
            </span>
            <span className="text-xs text-text/50">Name</span>
          </div>
        </div>
      </div>
      <div className="flex basis-1/3 flex-col gap-1 bg-inherit">
        <div className="flex h-1/3 w-full items-center justify-center border-l-2 border-dashed border-background bg-primary/70 px-4">
          <span className="text-sm font-bold text-background">Seat</span>
        </div>
        <div className="bt-2 flex h-2/3 w-full items-center justify-center border-l-2 border-dashed border-background bg-inherit pb-4">
          <span className="text-4xl font-bold text-text/70">{seat}</span>
        </div>
      </div>

      <div className="absolute bottom-0 right-1/3 h-4 w-4 translate-x-1/2 translate-y-1/2 rounded-full bg-background"></div>
      <div className="absolute right-1/3 top-0 h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded-full bg-background"></div>
    </div>
  );
}

Ticket.propTypes = {
  movie: PropTypes.string.isRequired,
  seat: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
