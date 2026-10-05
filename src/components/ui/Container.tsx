export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1200px] px-5 md:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
