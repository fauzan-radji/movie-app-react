export default function TransactionCard() {
  return (
    <div className="flex animate-pulse flex-col gap-1 rounded-md bg-complimentaryDark/30 px-4 py-2">
      <span className="h-5 w-2/3 rounded bg-complimentaryDark/30"></span>
      <span className="h-4 w-1/4 rounded bg-complimentaryDark/30"></span>
      <span className="h-3 w-28 rounded bg-complimentaryDark/30"></span>
    </div>
  );
}
