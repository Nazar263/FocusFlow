import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "md" | "lg";

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-[12px] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none";
  const sizes = {
    md: "h-12 px-6 text-[15px]",
    lg: "h-[52px] px-7 text-[16px]",
  };
  const variants: Record<Variant, string> = {
    primary:
      "bg-[#C3EE78] text-[#18211C] hover:bg-[#B8E46A] active:scale-[0.98] shadow-sm hover:shadow-md focus-visible:outline-[#18251E] group",
    secondary:
      "bg-white text-[#18211C] border border-[#DDE3D7] hover:border-[#18251E]/20 hover:bg-[#F7F8F2] active:scale-[0.98]",
    ghost: "bg-transparent text-[#18211C] hover:bg-black/[0.04]",
    dark: "bg-[#18251E] text-[#F4F7F1] hover:bg-[#304332] active:scale-[0.98]",
  };
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
