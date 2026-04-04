import type { SVGProps } from "react";

type IkonProps = SVGProps<SVGSVGElement>;

/** Bie – selve insektet. */
export function IconBie({ className, ...props }: IkonProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M10.5 4.5L9.5 3M13.5 4.5L14.5 3" />
      <circle cx="12" cy="6" r="2" />
      <path d="M9 11c-2.2 0-4 1.6-4 3.6s1.8 3.6 4 3.6" />
      <path d="M15 11c2.2 0 4 1.6 4 3.6s-1.8 3.6-4 3.6" />
      <ellipse cx="12" cy="12.5" rx="3.25" ry="5" />
      <line x1="9.5" y1="11" x2="14.5" y2="11" />
      <line x1="9.5" y1="13.5" x2="14.5" y2="13.5" />
      <line x1="10" y1="16" x2="14" y2="16" />
    </svg>
  );
}

/** Høne – fuglen, ikke huset. */
export function IconHone({ className, ...props }: IkonProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M9.5 5.5L10.5 3.5L12 5L13.5 3.5L14.5 5.5" />
      <path d="M12 7c2.75 0 5 2 5 4.5v3.5c0 2-2 3.5-4.5 3.5h-1C9 18.5 7 17 7 15v-3.5C7 9 9.25 7 12 7z" />
      <path d="M12 10v2.5l2 1.5H10l2-1.5V10" />
      <path d="M9.5 18.5v2M14.5 18.5v2" />
      <path d="M6.5 13.5c-1.5.5-2.5 1.8-2.5 3.2 0 .8.3 1.5.8 2" />
    </svg>
  );
}

/** Sau – dyret, ikke innhegning. */
export function IconSau({ className, ...props }: IkonProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M5.25 12.5c0-1.2.35-2.3 1-3.2" />
      <circle cx="5" cy="12" r="2.75" />
      <path d="M3.5 10.5L2.75 9.25M4.75 9.5L4.25 8.25" />
      <path d="M7.5 10.5c1.5-2 4-3.2 6.75-3.2 4.6 0 8.35 3.15 8.75 7.2" />
      <path d="M16.25 14.5c.85 0 1.55.55 1.75 1.35.35 1.4.55 2.9.55 4.4v.25c0 .9-.65 1.65-1.5 1.75H15" />
      <path d="M8.5 17.75v2.25M11 17.75v2.5M13.5 17.75v2.5M16 17.5v2.75" />
      <path d="M7 16.5c.85 1.35 2.3 2.25 4 2.25h6.25" />
    </svg>
  );
}
