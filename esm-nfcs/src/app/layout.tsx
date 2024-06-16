import "@/styles/globals.css";
import "@/styles/nav.css";
import { Metadata } from "next";
import { getSession } from "./session";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Edge Connect",
  description: "Make new connections at Edge Esmeralda"
};

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang="en">
      <body>
        <header className="container mx-auto max-w-lg p-4">
          <h1 className="font-bold text-2xl">Edge Connect</h1>
          {session.commitment && 
            <div className="my-4 flex items-center gap-2">
              <strong>{session.nameFromZupass}</strong> <form method="POST" action="/api/logout"><button className="border rounded border-gray-400 px-4 py-2 font-medium text-md">Log out</button></form>
            </div>}
            <nav className="navbar">
              <ul className="navbar-list">
                {session.commitment && 
                    <li className="navbar-item">
                    <a href="/me" className="navbar-link">Profile</a>
                  </li>
                }
                <li className="navbar-item">
                  <a href="https://edges.radicalxchange.org/" className="navbar-link">L∈dger</a>
                </li>
                <li className="navbar-item">
                  <a href="https://www.edgeesmeralda.com/" className="navbar-link">About</a>
                </li>
              </ul>
            </nav>
        </header>
        <main className="container mx-auto max-w-lg p-4">
        {children}
        </main>
      </body>
    </html>
  );
}
