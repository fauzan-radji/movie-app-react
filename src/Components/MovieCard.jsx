import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function MovieCard(props) {
  return (
    <Link
      to={`/movie/${props.id}`}
      className="relative isolate flex aspect-[2/3] w-full flex-col justify-end overflow-hidden rounded-xl bg-complimentary p-4 transition-opacity before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-t before:from-black/50 before:to-transparent hover:opacity-80"
    >
      <img
        src={props.poster}
        alt={props.title}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />

      <div className="translate text-background absolute -left-8 top-4 flex h-8 w-32 -rotate-45 items-center justify-center bg-complimentary/80 py-1 text-xs font-bold">
        {Math.round(props.price / 1000)}K IDR
      </div>

      <h2 className="text-md line-clamp-3 font-bold leading-5 text-white">
        {props.title} ({props.releaseDate.match(/\d{4}/)[0]})
      </h2>
    </Link>
  );
}

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
