export default function MovieCard() {
  return (
    <div className="relative isolate flex aspect-[2/3] w-full flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-t before:from-black before:to-transparent">
      <img
        src="http://placekitten.com/256"
        alt="Into the kittenverse"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />

      <div className="translate absolute -left-8 top-4 flex h-8 w-32 -rotate-45 items-center justify-center bg-primary/70 py-1 text-xs font-bold text-background">
        50K IDR
      </div>

      <h2 className="relative w-max text-xl font-bold text-background">
        Into the Kittenverse
      </h2>
    </div>
  );
}
