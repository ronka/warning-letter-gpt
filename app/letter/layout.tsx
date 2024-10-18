export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex-grow">
      <div className="container mx-auto py-10">{children}</div>
    </main>
  );
}
