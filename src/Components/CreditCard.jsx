import PropTypes from "prop-types";

export default function CreditCard({ balance, email = "", username = "" }) {
  return (
    <div className="mx-auto flex aspect-[5/3] w-72 flex-col justify-between rounded-xl bg-accent bg-gradient-to-br from-accent/80 to-complimentaryDark px-6 py-4 text-white">
      <div className="flex flex-[2] items-center justify-between">
        <span className="uppercase">Your Balance</span>
        <div className="relative flex h-full flex-auto">
          <span className="absolute right-0 top-0 block aspect-square h-full rounded-full bg-white/30"></span>
          <span className="absolute right-6 top-0 block aspect-square h-full rounded-full bg-white/30"></span>
        </div>
      </div>
      <h6 className="flex flex-[3] items-center text-3xl font-bold">
        {Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(balance)}
      </h6>
      <div className="flex flex-[3] flex-col justify-end">
        <span className="text-sm">{email ? "Email" : "Username"}</span>
        <span className="font-bold">{email || username}</span>
      </div>
    </div>
  );
}

CreditCard.propTypes = {
  balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  email: PropTypes.string,
  username: PropTypes.string,
};
