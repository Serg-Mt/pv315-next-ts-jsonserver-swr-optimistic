import "./globals.css";
import { Toaster } from 'react-hot-toast'


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
        <Toaster />
      </body>
    </html>
  );
}
