// app/category/[slug]/layout.tsx
type Props = {
  children: React.ReactNode;
};

export default function CategoryLayout({ children }: Props) {
  return (
    <section className="bg-white dark:bg-slate-900 min-h-screen">
      {children}
    </section>
  );
}
