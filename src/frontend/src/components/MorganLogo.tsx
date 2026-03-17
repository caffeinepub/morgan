interface MorganLogoProps {
  size?: number;
  className?: string;
}

export function MorganLogo({ size = 32, className = "" }: MorganLogoProps) {
  return (
    <img
      src="/assets/uploads/images-1.png"
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
      alt="Morgan Logo"
    />
  );
}
