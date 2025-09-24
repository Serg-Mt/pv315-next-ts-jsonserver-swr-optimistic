import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header></header>
        <main className="prose m-2">
          {children}
        </main>
        <footer></footer>
      </body>
    </html>
  );
}
