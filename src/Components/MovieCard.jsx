export default function MovieCard(props) {
  return (
    <div className="relative isolate flex aspect-[2/3] w-full flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-t before:from-black before:to-transparent">
      <img
        src={props.poster_url}
        alt="Into the kittenverse"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />

      <div className="translate absolute -left-8 top-4 flex h-8 w-32 -rotate-45 items-center justify-center bg-primary/70 py-1 text-xs font-bold text-background">
        50K IDR
      </div>

      <h2 className="relative text-xl font-bold text-background">
        {props.title}
      </h2>
      <p className="relative my-2 w-max rounded-md bg-primary/20 px-2 py-1 text-xs text-background">
        Released: {props.release_date}
      </p>
    </div>
  );
}
