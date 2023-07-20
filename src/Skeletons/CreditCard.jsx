export default function CreditCard() {
  return (
    <div className="mx-auto flex aspect-[5/3] w-72 animate-pulse flex-col justify-between rounded-xl bg-complimentaryDark/30 px-6 py-4">
      <div className="flex h-10 items-center justify-between">
        <span className="h-6 w-7/12 rounded bg-complimentaryDark/30"></span>
        <div className="relative flex h-full flex-auto">
          <span className="absolute right-0 top-0 block aspect-square h-full rounded-full bg-complimentaryDark/30"></span>
          <span className="absolute right-6 top-0 block aspect-square h-full rounded-full bg-complimentaryDark/30"></span>
        </div>
      </div>
      <span className="flex h-8 w-full items-center rounded-md bg-complimentaryDark/30 text-3xl font-bold"></span>
      <div className="flex flex-col justify-end gap-1">
        <span className="h-5 w-1/5 rounded bg-complimentaryDark/30"></span>
        <span className="h-5 w-5/6 rounded bg-complimentaryDark/30"></span>
      </div>
    </div>
  );
}
