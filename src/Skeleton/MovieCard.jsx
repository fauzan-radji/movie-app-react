import Icons from "../Components/Icons";

export default function MovieCard() {
  return (
    <div className="relative flex aspect-[2/3] w-full animate-pulse flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4">
      <Icons.Image className="absolute inset-0 m-auto h-12 w-12 text-accent/20"></Icons.Image>
      <div className="h-6 w-2/3 rounded-md bg-accent/20"></div>
      <div className="my-2 h-4 w-1/3 rounded bg-accent/20 px-2 py-1"></div>
    </div>
  );
}
