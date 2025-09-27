import type { SVGProps } from 'react';

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 50"
    width={140}
    height={40}
    {...props}
  >
    <g fill="hsl(var(--primary))">
      <path d="M23.5,5.5c-9.9,0-18,8.1-18,18s8.1,18,18,18s18-8.1,18-18S33.4,5.5,23.5,5.5z M23.5,37.5c-7.7,0-14-6.3-14-14s6.3-14,14-14s14,6.3,14,14S31.2,37.5,23.5,37.5z" />
      <path d="M26.9,23.5h-5.9v-5.9h-3v5.9h-5.9v3h5.9v5.9h3v-5.9h5.9V23.5z" />
    </g>
    <text
      x="50"
      y="32"
      fontFamily="'PT Sans', sans-serif"
      fontSize="24"
      fontWeight="bold"
      fill="hsl(var(--foreground))"
    >
      CitizEngage
    </text>
  </svg>
);
export default Logo;
