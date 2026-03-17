interface MorganLogoProps {
  size?: number;
  className?: string;
}

export function MorganLogo({ size = 32, className = "" }: MorganLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Morgan shield logo"
    >
      <title>Morgan shield logo</title>
      <path
        d="M16 2L4 7V17C4 23.627 9.373 29 16 29C22.627 29 28 23.627 28 17V7L16 2Z"
        fill="oklch(0.52 0.20 262)"
        stroke="oklch(0.56 0.20 262)"
        strokeWidth="1"
      />
      <path
        d="M10 21V11L16 17L22 11V21"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
