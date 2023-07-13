import Icons from "../Components/Icons";

export default function MovieCard() {
  return (
    <div className="relative flex aspect-[2/3] w-full animate-pulse flex-col justify-end overflow-hidden rounded-xl bg-complimentaryDark/30 p-4">
      <Icons.Image className="absolute inset-0 m-auto h-12 w-12 text-complimentaryDark/30"></Icons.Image>
      <div className="h-6 w-2/3 rounded-md bg-complimentaryDark/30"></div>
      <div className="my-2 h-4 w-1/3 rounded bg-complimentaryDark/30 px-2 py-1"></div>
    </div>
  );
}
