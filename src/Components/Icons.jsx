import PropTypes from "prop-types";

export function Home({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
    </svg>
  );
}

export function UserCircle({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ArrowDown({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M12 3.75a.75.75 0 01.75.75v13.19l5.47-5.47a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 111.06-1.06l5.47 5.47V4.5a.75.75 0 01.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function Search({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ChevronLeft({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  );
}

export function PriceTag({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      strokeWidth={1.5}
      fill="currentColor"
      stroke="currentColor"
      strokeLinecap="round"
      strokeMiterlimit="10"
      className={className}
    >
      <circle cx="39" cy="11" r="3" />
      <path d="M47,5.5  C47,4.119,45.881,3,44.5,3c-0.156,0-14.876,0.002-14.876,0.002c-1.33,0-2.603-0.07-3.341,0.668L3.554,26.398  c-0.739,0.738-0.739,1.936,0,2.674l17.374,17.374c0.738,0.738,1.936,0.738,2.674,0L46.33,23.717c0.738-0.737,0.668-1.98,0.668-3.34  C46.998,20.377,47,5.656,47,5.5z" />
    </svg>
  );
}

export function Login({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M 7.5 20.25 C 6.672 20.25 6 19.578 6 18.75 L 6 5.25 C 6 4.422 6.672 3.75 7.5 3.75 L 13.5 3.75 C 14.328 3.75 15 4.422 15 5.25 L 15 9 C 15 9.577 15.625 9.938 16.125 9.65 C 16.357 9.516 16.5 9.268 16.5 9 L 16.5 5.25 C 16.5 3.593 15.157 2.25 13.5 2.25 L 7.5 2.25 C 5.843 2.25 4.5 3.593 4.5 5.25 L 4.5 18.75 C 4.5 20.407 5.843 21.75 7.5 21.75 L 13.5 21.75 C 15.157 21.75 16.5 20.407 16.5 18.75 L 16.5 15 C 16.5 14.423 15.875 14.062 15.375 14.35 C 15.143 14.484 15 14.732 15 15 L 15 18.75 C 15 19.578 14.328 20.25 13.5 20.25 L 7.5 20.25 Z M 12.53 15.53 C 12.822 15.237 12.822 14.763 12.53 14.47 L 10.81 12.75 L 21.75 12.75 C 22.327 12.75 22.688 12.125 22.4 11.625 C 22.266 11.393 22.018 11.25 21.75 11.25 L 10.81 11.25 L 12.53 9.53 C 12.952 9.136 12.79 8.433 12.238 8.264 C 11.964 8.18 11.666 8.26 11.47 8.47 L 8.47 11.47 C 8.178 11.763 8.178 12.237 8.47 12.53 L 11.47 15.53 C 11.763 15.822 12.237 15.822 12.53 15.53 Z"
        clipRule="evenodd"
        transform="matrix(-1, 0, 0, -1, 27.001202, 24)"
      ></path>
    </svg>
  );
}

export function Logout({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function User({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
}

export function Lock({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}

export function Image({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 640 512"
    >
      <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
    </svg>
  );
}

export function Ticket({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-.375.65 2.249 2.249 0 000 3.898.75.75 0 01.375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 17.625v-3.026a.75.75 0 01.374-.65 2.249 2.249 0 000-3.898.75.75 0 01-.374-.65V6.375zm15-1.125a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm-.75 3a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zM6 12a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H6.75A.75.75 0 016 12zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function Calendar({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
      />
    </svg>
  );
}

export function Envelope({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
}

export function Info({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function Check({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ExclamationTri({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ExclamationCircle({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function XCircle({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function XMark({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function TopUp({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M 7.5 3.75 C 6.672 3.75 6 4.422 6 5.25 L 6 18.75 C 6 19.578 6.672 20.25 7.5 20.25 L 13.5 20.25 C 14.328 20.25 15 19.578 15 18.75 L 15 15 C 15 14.423 15.625 14.062 16.125 14.35 C 16.357 14.484 16.5 14.732 16.5 15 L 16.5 18.75 C 16.5 20.407 15.157 21.75 13.5 21.75 L 7.5 21.75 C 5.843 21.75 4.5 20.407 4.5 18.75 L 4.5 5.25 C 4.5 3.593 5.843 2.25 7.5 2.25 L 13.5 2.25 C 15.157 2.25 16.5 3.593 16.5 5.25 L 16.5 9 C 16.5 9.577 15.875 9.938 15.375 9.65 C 15.143 9.516 15 9.268 15 9 L 15 5.25 C 15 4.422 14.328 3.75 13.5 3.75 L 7.5 3.75 Z M 12.53 8.47 C 12.822 8.763 12.822 9.237 12.53 9.53 L 10.81 11.25 L 21.75 11.25 C 22.327 11.25 22.688 11.875 22.4 12.375 C 22.266 12.607 22.018 12.75 21.75 12.75 L 10.81 12.75 L 12.53 14.47 C 12.952 14.864 12.79 15.567 12.238 15.736 C 11.964 15.82 11.666 15.74 11.47 15.53 L 8.47 12.53 C 8.178 12.237 8.178 11.763 8.47 11.47 L 11.47 8.47 C 11.763 8.178 12.237 8.178 12.53 8.47 L 12.53 8.47 Z"
        clipRule="evenodd"
        transform="matrix(0, 1, -1, 0, 25.500601, -1.500601)"
      ></path>
    </svg>
  );
}

export function Withdraw({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M 7.5 3.75 C 6.672 3.75 6 4.422 6 5.25 L 6 18.75 C 6 19.578 6.672 20.25 7.5 20.25 L 13.5 20.25 C 14.328 20.25 15 19.578 15 18.75 L 15 15 C 15 14.423 15.625 14.062 16.125 14.35 C 16.357 14.484 16.5 14.732 16.5 15 L 16.5 18.75 C 16.5 20.407 15.157 21.75 13.5 21.75 L 7.5 21.75 C 5.843 21.75 4.5 20.407 4.5 18.75 L 4.5 5.25 C 4.5 3.593 5.843 2.25 7.5 2.25 L 13.5 2.25 C 15.157 2.25 16.5 3.593 16.5 5.25 L 16.5 9 C 16.5 9.577 15.875 9.938 15.375 9.65 C 15.143 9.516 15 9.268 15 9 L 15 5.25 C 15 4.422 14.328 3.75 13.5 3.75 L 7.5 3.75 Z M 18.22 8.47 C 18.513 8.178 18.987 8.178 19.28 8.47 L 22.28 11.47 C 22.572 11.763 22.572 12.237 22.28 12.53 L 19.28 15.53 C 18.886 15.952 18.183 15.79 18.014 15.238 C 17.93 14.964 18.01 14.666 18.22 14.47 L 19.94 12.75 L 9 12.75 C 8.423 12.75 8.062 12.125 8.35 11.625 C 8.484 11.393 8.732 11.25 9 11.25 L 19.94 11.25 L 18.22 9.53 C 17.928 9.237 17.928 8.763 18.22 8.47 L 18.22 8.47 Z"
        clipRule="evenodd"
        transform="matrix(0, 1, -1, 0, 25.499501, -1.499501)"
      ></path>
    </svg>
  );
}

export function CreditCard({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
      <path
        fillRule="evenodd"
        d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
        clipRule="evenodd"
      />
    </svg>
  );
}

Home.propTypes = { className: PropTypes.string };
UserCircle.propTypes = { className: PropTypes.string };
ArrowDown.propTypes = { className: PropTypes.string };
Search.propTypes = { className: PropTypes.string };
ChevronLeft.propTypes = { className: PropTypes.string };
PriceTag.propTypes = { className: PropTypes.string };
Login.propTypes = { className: PropTypes.string };
Logout.propTypes = { className: PropTypes.string };
User.propTypes = { className: PropTypes.string };
Lock.propTypes = { className: PropTypes.string };
Image.propTypes = { className: PropTypes.string };
Ticket.propTypes = { className: PropTypes.string };
Calendar.propTypes = { className: PropTypes.string };
Envelope.propTypes = { className: PropTypes.string };
Info.propTypes = { className: PropTypes.string };
Check.propTypes = { className: PropTypes.string };
ExclamationTri.propTypes = { className: PropTypes.string };
ExclamationCircle.propTypes = { className: PropTypes.string };
XCircle.propTypes = { className: PropTypes.string };
XMark.propTypes = { className: PropTypes.string };
TopUp.propTypes = { className: PropTypes.string };
Withdraw.propTypes = { className: PropTypes.string };
CreditCard.propTypes = { className: PropTypes.string };

export default {
  Home,
  UserCircle,
  ArrowDown,
  Search,
  ChevronLeft,
  PriceTag,
  Login,
  Logout,
  User,
  Lock,
  Image,
  Ticket,
  Calendar,
  Envelope,
  Info,
  Check,
  ExclamationTri,
  ExclamationCircle,
  XCircle,
  XMark,
  TopUp,
  Withdraw,
  CreditCard,
};
