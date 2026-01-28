import "./globals.css";
import Header from "@/components/globals/header/Header";

export const metadata = {
  title: "Betinget Kærlighed",
  description: "Læs vilkår og betingelser for min kærlighedstjeneste.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body
      >
        <header>
          <Header/>
        </header>
        <main className="py-40">
        {children}
        </main>
      </body>
    </html>
  );
}
