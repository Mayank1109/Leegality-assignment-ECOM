const Cart = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.width || "1em"}
    height={props?.height || "1em"}
    viewBox="0 0 24 24"
  >
    <path
      fill={props?.fill || "currentColor"}
      d="M5.588 21.413Q5 20.825 5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22t-1.412-.587m10 0Q15 20.825 15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22t-1.412-.587M5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H1V2h3.25z"
    />
  </svg>
);

const MenuIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.width || "1em"}
    height={props?.height || "1em"}
    viewBox="0 0 16 16"
  >
    <path
      fill={props?.fill || "none"}
      stroke={props?.stroke || "currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"
    />
  </svg>
);

const SearchIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.width || "1em"}
    height={props?.height || "1em"}
    viewBox="0 0 24 24"
  >
    <path
      fill={props?.fill || "currentColor"}
      d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
    />
  </svg>
);

const ProfileIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.width || "32"}
    height={props?.height || "32"}
    viewBox="0 0 36 36"
  >
    <path
      fill={props?.fill || "currentColor"}
      d="M30.61 24.52a17.16 17.16 0 0 0-25.22 0a1.5 1.5 0 0 0-.39 1v6A1.5 1.5 0 0 0 6.5 33h23a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-.39-.98"
      class="clr-i-solid clr-i-solid-path-1"
    />
    <circle
      cx="18"
      cy="10"
      r="7"
      fill={props?.fill || "currentColor"}
      class="clr-i-solid clr-i-solid-path-2"
    />
  </svg>
);

const WishlistIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.width || "32"}
    height={props?.height || "32"}
    viewBox="0 0 24 24"
  >
    <path
      fill={props?.fill || "currentColor"}
      d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7zm0-2.7q2.4-2.15 3.95-3.687t2.45-2.675t1.25-2.026T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2.175.662T12.95 7h-1.9q-.375-1.025-1.375-1.687T7.5 4.65q-1.5 0-2.5 1t-1 2.5q0 .875.35 1.763t1.25 2.025t2.45 2.675T12 18.3m0-6.825"
    />
  </svg>
);

export { Cart, MenuIcon, SearchIcon, ProfileIcon, WishlistIcon };
