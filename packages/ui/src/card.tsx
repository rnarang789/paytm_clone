export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border border-slate-300 rounded-lg p-4 shadow-md bg-white">
      <h1 className="text-xl border-b border-slate-300 pb-2">{title}</h1>
      <div className="pt-2">{children}</div>
    </div>
  );
}
