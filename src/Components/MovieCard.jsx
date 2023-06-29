import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function MovieCard(props) {
  return (
    <Link
      to={`/movie/${props.id}`}
      className="relative isolate flex aspect-[2/3] w-full flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4 transition-opacity before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-t before:from-black before:to-transparent hover:opacity-80"
    >
      <img
        src={props.poster_url}
        alt="Into the kittenverse"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />

      <div className="translate absolute -left-8 top-4 flex h-8 w-32 -rotate-45 items-center justify-center bg-accent/80 py-1 text-xs font-bold text-background">
        50K IDR
      </div>

      <h2 className="text-md line-clamp-2 font-bold leading-5 text-background">
        {props.title}
      </h2>
      <p className="mt-1 w-max rounded-md bg-primary/20 px-2 py-1 text-xs text-background">
        {props.release_date}
      </p>
    </Link>
  );
}

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  poster_url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
};
