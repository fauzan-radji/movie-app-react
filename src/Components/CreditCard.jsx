import PropTypes from "prop-types";

export default function CreditCard({ balance, email }) {
  return (
    <div className="mx-auto mt-4 flex aspect-[3/2] w-72 flex-col justify-between rounded-3xl bg-accent bg-gradient-to-br from-primary/80 to-accent px-6 py-4 text-white">
      <div className="flex flex-[2] items-center justify-between">
        <span className="uppercase">Your Balance</span>
        <div className="relative flex h-full flex-auto">
          <span className="absolute right-0 top-0 block aspect-square h-full rounded-full bg-white/30"></span>
          <span className="absolute right-6 top-0 block aspect-square h-full rounded-full bg-white/30"></span>
        </div>
      </div>
      <h6 className="flex flex-[3] items-center text-3xl font-bold">
        {balance}
      </h6>
      <div className="flex flex-[3] flex-col justify-end">
        <span className="text-sm">Email</span>
        <span className="font-bold">{email}</span>
      </div>
    </div>
  );
}

CreditCard.propTypes = {
  balance: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
