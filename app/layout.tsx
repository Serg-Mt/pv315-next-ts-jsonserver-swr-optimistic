import Link from 'next/link';
import "./globals.css";
import { Toaster } from 'react-hot-toast'

const links = [
  { href: '/', label: 'home' },
  { href: '/todo-serv', label: 'optimistic UI' },
  { href: '/state-mngr', label: 'state managers' }
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <ul className="flex gap-1 flex-wrap justify-evenly">
              {links.map(({ href, label }) =>
                <li key={href} className="hover:bg-gray-200 shadow-xl rounded-full p-1">
                  <Link href={href}>{label}</Link>
                </li>)}
            </ul>
          </nav>
        </header>
        <main className="prose m-2">
          {children}
        </main>
        <footer></footer>
        <Toaster />
      </body>
    </html>
  );
}
